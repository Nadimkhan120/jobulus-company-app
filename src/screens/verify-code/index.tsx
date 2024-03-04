import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import { icons } from "@/assets/icons";
import { ScreenHeader } from "@/components/screen-header";
import { useResendCode, useVerifyEmail } from "@/services/api/auth/verify-email";
import { useApp } from "@/store/app";
import { setUserToken } from "@/store/auth";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import { setUserWithProfile } from "@/store/user";

const schema = z.object({
  code: z
    .string({
      required_error: "Verification code is required",
    })
    .min(6, "Verification code must be at least 6 characters"),
});

export type VerifyCodeFormType = z.infer<typeof schema>;

export const VerifyCode = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const route = useRoute<any>();

  const companyType = useApp((state) => state.companyType);

  const { mutate: verifyEmailApi, isLoading } = useVerifyEmail();

  const { mutate: resendApi } = useResendCode();


  const { handleSubmit, control, reset } = useForm<VerifyCodeFormType>({
    resolver: zodResolver(schema),
  });

  // Timer state and effect
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const resendCode = () => {
    // Reset timer and resend code logic
    setTimer(30);
    // Add logic to resend verification code here

    resendApi(
      {
        email: route?.params?.email,
      },
      {
        onSuccess: (data) => {
          console.log('RES',data);
          
          if (data?.response?.status === 200) {
            showSuccessMessage(data?.response?.message)
          } else {
            showErrorMessage(data.response.message);
          }
        },
        onError: (error) => {
          // An error happened!
          console.log(`rolling back optimistic update with id ${error}`);
        },
      }
    );
  };

  const onSubmit = (data: VerifyCodeFormType) => {
    verifyEmailApi(
      {
        email: route?.params?.email,
        verification_code: data?.code,
        password: route?.params?.password,
      },
      {
        onSuccess: (data) => {
          console.log("data", JSON.stringify(data, null, 2));
          if (data?.response?.status === 200) {
            setUserToken(data?.response?.data?.token);
            setUserWithProfile(data?.response?.data);
            if (companyType === "company") {
              navigate("CompanyInformation");
            } else {
              navigate("AgencyInformation");
            }
          } else {
            showErrorMessage(data.response.message);
          }
        },
        onError: (error) => {
          // An error happened!
          console.log(`rolling back optimistic update with id ${error}`);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />

      <View flex={1} paddingHorizontal={"large"}>
        <View height={scale(72)} />

        <View alignItems={"center"} justifyContent={"center"}>
          <Image source={icons.logo} contentFit="contain" style={styles.logo} />
          <View height={scale(16)} />
          <View paddingTop={"large"} alignItems={"center"} justifyContent={"center"}>
            <Text variant={"semiBold24"} textAlign={"center"} color={"black"}>
              Verify Code
            </Text>
            <Text
              variant={"regular14"}
              paddingTop={"small"}
              textAlign={"center"}
              color={"grey100"}
            >
              Enter your verification code from your email that we’ve sent at:{" "}
              <Text color={"primary"}>{route?.params?.email}</Text>
            </Text>
          </View>
        </View>

        <View height={scale(32)} />

        <View paddingTop={"large"}>
          <ControlledInput
            placeholder="Enter code"
            label="Verification Code"
            control={control}
            name="code"
          />
          <View height={scale(8)} />
        </View>
        <View height={scale(14)} />
        <Button label="Verify" onPress={handleSubmit(onSubmit)} loading={isLoading} />
          
          
          {/* Resend button and timer display */}
          {timer === 0 ? (
            // <Button label="Resend" onPress={resendCode} />
            <TouchableOpacity
            style={{ width:'100%',alignItems:'flex-end'}}
            onPress={resendCode}>
              <Text style={styles.timerText}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{ width:'100%',alignItems:'flex-end'}}>
              <Text style={styles.timerText}>Resend in {timer} seconds</Text>
            </View>
          )}
        
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  timerText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
