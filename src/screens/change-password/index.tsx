import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { scale } from 'react-native-size-matters';

import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View, Text } from '@/ui';
import { useUpdatePassword } from '@/services/api/auth';
import { useUser } from '@/store/user';
import { Alert } from 'react-native';
import { showErrorMessage, showSuccessMessage } from "@/utils";

export const ChangePassword = () => {
  const { colors } = useTheme<Theme>();
  const { handleSubmit, control, watch, setError, formState: { errors }, reset } = useForm();
  const user = useUser((state) => state?.user);
  
  useSoftKeyboardEffect();
  const { mutate: updatePasswordApi, isLoading } = useUpdatePassword();
  

  const onSubmit = (data) => {
    // Check old password and new password are not same
    if (data?.password === data?.newPasswors) {
      showErrorMessage('Please enter a different password, the new password cannot be the same as the old one');
      return;
    }

    // Check if passwords match
    if (data?.newPassword !== data?.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }


    // Passwords match, continue with submission
    console.log('data', data);

    updatePasswordApi(
      {
        email: user?.email,
        oldpassword: data?.password,
        newpassword: data?.newPassword,
        newpassword_confirmation: data?.confirmPassword,
        
        // token: user?.auth_id,
      },
      {
        onSuccess: (responseData) => {
          
          if (responseData?.response?.status === 200) {
            showSuccessMessage("Password has been changed");
            reset()
          } else {
            if(responseData?.response?.message?.newpassword?.length > 0){
              showErrorMessage(responseData?.response?.message?.newpassword[0]);
            }
            else{
              showErrorMessage(responseData?.response?.message);

            }
          }
        },
        onError: (error) => {
          //@ts-ignore
          showErrorMessage(error?.response?.data?.message);
        },
      }
    );
  };


  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} title="Change Password" />
      <View flex={1} paddingHorizontal={'large'}>
        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter password"
            label="Current Password"
            secureTextEntry={true}
            control={control}
            name="password"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter password"
            label="New Password"
            secureTextEntry={true}
            control={control}
            name="newPassword"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter Confirm Password"
            label="Confirm Password"
            secureTextEntry={true}
            control={control}
            name="confirmPassword"
          />
          {/* {errors.confirmPassword && (
            <Text style={{ color: 'red' }}>{errors?.confirmPassword?.message}</Text>
          )} */}
          <View height={scale(8)} />
        </View>
        <View height={scale(24)} />
        <View flex={1} justifyContent={'flex-end'}>
          <Button label="Update" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Screen>
  );
};
