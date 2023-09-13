import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { IconButton } from '@/components';
import { login } from '@/store/auth';
import type { Theme } from '@/theme';
import {
  Button,
  ControlledInput,
  PressableScale,
  Screen,
  Text,
  View,
} from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export const Login = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    console.log('data', data);

    login();
  };

  return (
    <Screen backgroundColor={colors.white}>
      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />
        <Image source={icons.logo} contentFit="contain" style={styles.logo} />
        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Welcome Back 👋
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Let’s log in. Apply to jobs!
          </Text>
        </View>

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter email address"
            label="Email"
            control={control}
            name="email"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter password"
            label="Password"
            isSecure={true}
            control={control}
            name="password"
          />
        </View>
        <View height={scale(24)} />
        <Button label="Log in" onPress={handleSubmit(onSubmit)} />

        <View paddingVertical={'2xl'} alignSelf={'center'}>
          <PressableScale onPress={() => null}>
            <Text>Forgot password?</Text>
          </PressableScale>
        </View>

        <Image
          source={icons.continue}
          style={{ height: scale(24), width: '100%' }}
          contentFit="contain"
        />

        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'medium'}
          marginVertical={'large'}
        >
          <IconButton icon="apple" onPress={() => null} color={'grey500'} />
          <IconButton icon="google" onPress={() => null} color={'grey500'} />
          <IconButton icon="facebook" onPress={() => null} color={'grey500'} />
        </View>

        <View paddingVertical={'2xl'} alignSelf={'center'}>
          <PressableScale onPress={() => navigate('RegisterOptions')}>
            <Text variant={'regular14'} color={'grey200'}>
              Haven’t an account?{' '}
              <Text variant={'semiBold14'} color={'primary'}>
                Register
              </Text>
            </Text>
          </PressableScale>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
});

// import { Button, Screen } from "@/ui";
// import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
// import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
// import { useFocusEffect } from "@react-navigation/native";
// import * as React from "react";
// import { StyleSheet, Text, TextInput } from "react-native";
// import { AvoidSoftInput } from "react-native-avoid-softinput";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { View } from "@/ui";
// import { BottomBackdrop } from "@/components/bottom-modal/components/bottom-backdrop";

// const SNAP_POINTS = ["CONTENT_HEIGHT"];

// const Backdrop: React.FC = () => <View style={styles.backdrop} />;

// export const Login: React.FC = () => {
//   const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

//   function dismissBottomSheet() {
//     bottomSheetModalRef.current?.dismiss();
//   }

//   function presentBottomSheet() {
//     bottomSheetModalRef.current?.present();
//   }

//   const {
//     animatedContentHeight,
//     animatedHandleHeight,
//     animatedSnapPoints,
//     handleContentLayout,
//   } = useBottomSheetDynamicSnapPoints(SNAP_POINTS);

//   const onFocusEffect = React.useCallback(() => {
//     AvoidSoftInput.setShouldMimicIOSBehavior(true);
//     AvoidSoftInput.setEnabled(true);
//     AvoidSoftInput.setEasing("easeOut");
//     AvoidSoftInput.setHideAnimationDelay(600);
//     AvoidSoftInput.setHideAnimationDuration(600);
//     AvoidSoftInput.setShowAnimationDelay(600);
//     AvoidSoftInput.setShowAnimationDuration(600);
//     return () => {
//       AvoidSoftInput.setEasing("linear");
//       AvoidSoftInput.setHideAnimationDelay();
//       AvoidSoftInput.setHideAnimationDuration();
//       AvoidSoftInput.setShowAnimationDelay();
//       AvoidSoftInput.setShowAnimationDuration();
//       AvoidSoftInput.setEnabled(false);
//       AvoidSoftInput.setShouldMimicIOSBehavior(false);
//     };
//   }, []);

//   useFocusEffect(onFocusEffect);

//   return (
//     <Screen edges={["top"]}>
//       <View flex={1}>
//         <Button onPress={presentBottomSheet} label="Open bottom sheet" />
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           backdropComponent={BottomBackdrop}
//           contentHeight={animatedContentHeight}
//           enableDismissOnClose
//           enablePanDownToClose
//           handleHeight={animatedHandleHeight}
//           index={0}
//           snapPoints={animatedSnapPoints}
//         >
//           <BottomSheetView onLayout={handleContentLayout} style={styles.bottomSheet}>
//             <SafeAreaView edges={["left", "right"]} style={styles.bottomSheet}>
//               <Text style={styles.header}>Header</Text>
//               <TextInput placeholderTextColor="#2E8555" style={styles.input} />
//               <TextInput placeholderTextColor="#2E8555" style={styles.input} />
//               <TextInput placeholderTextColor="#2E8555" style={styles.input} />
//               <TextInput placeholderTextColor="#2E8555" style={styles.input} />
//               <TextInput placeholderTextColor="#2E8555" style={styles.input} />
//               <View style={styles.submitButtonContainer}>
//                 <Button onPress={dismissBottomSheet} label="Submit" />
//               </View>
//             </SafeAreaView>
//           </BottomSheetView>
//         </BottomSheetModal>
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   bottomSheet: {
//     alignItems: "center",
//     alignSelf: "stretch",
//     backgroundColor: "white",
//   },
//   header: {
//     color: "black",
//     fontSize: 28,
//     fontWeight: "bold",
//     paddingBottom: 40,
//     paddingTop: 30,
//   },
//   input: {
//     marginHorizontal: 50,
//     alignSelf: "stretch",
//     backgroundColor: "white",
//     borderColor: "black",
//     borderRadius: 10,
//     borderWidth: 1,
//     color: "black",
//     fontSize: 18,
//     height: 60,
//     marginBottom: 30,
//     padding: 10,
//   },
//   submitButtonContainer: {
//     alignSelf: "stretch",
//     marginBottom: 30,
//   },
// });
