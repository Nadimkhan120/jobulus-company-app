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
  fullName: z.string({
    required_error: 'Full name is required',
  }),
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

export type RegisterFormType = z.infer<typeof schema>;

export const Register = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { handleSubmit, control } = useForm<RegisterFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormType) => {
    console.log('data', data);

    navigate('VerifyCode');
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />
        <Image source={icons.logo} contentFit="contain" style={styles.logo} />
        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Registration 👍
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Let’s Register. Apply to jobs!
          </Text>
        </View>

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter full name"
            label="Full Name"
            control={control}
            name="fullName"
          />
          <View height={scale(8)} />
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
        <Button label="Register" onPress={handleSubmit(onSubmit)} />

        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <PressableScale
            onPress={() => {
              navigate('RegisterOptions');
            }}
          >
            <Text>Register</Text>
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
