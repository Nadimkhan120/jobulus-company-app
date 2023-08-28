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
import { ScreenHeader } from '@/components/screen-header';
import { useApp } from '@/store/app';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';

const schema = z.object({
  code: z
    .string({
      required_error: 'Verification code is required',
    })
    .min(6, 'Verification code must be at least 6 characters'),
});

export type VerifyCodeFormType = z.infer<typeof schema>;

export const VerifyCode = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const companyType = useApp((state) => state.companyType);

  const { handleSubmit, control } = useForm<VerifyCodeFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: VerifyCodeFormType) => {
    console.log('data', data);

    if (companyType === 'company') {
      navigate('CompanyInformation');
    } else {
      navigate('AgencyInformation');
    }
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />

        <View alignItems={'center'} justifyContent={'center'}>
          <Image source={icons.logo} contentFit="contain" style={styles.logo} />
          <View height={scale(16)} />
          <View
            paddingTop={'large'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text variant={'semiBold24'} textAlign={'center'} color={'black'}>
              Verify Code
            </Text>
            <Text
              variant={'regular14'}
              paddingTop={'small'}
              textAlign={'center'}
              color={'grey100'}
            >
              Enter your verification code from your email that we’ve sent at:{' '}
              <Text color={'primary'}>rifat.ux@gmail.com</Text>
            </Text>
          </View>
        </View>

        <View height={scale(32)} />

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter code"
            label="Verification Code"
            control={control}
            name="code"
          />
          <View height={scale(8)} />
        </View>
        <View height={scale(24)} />
        <Button label="Verify" onPress={handleSubmit(onSubmit)} />
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
