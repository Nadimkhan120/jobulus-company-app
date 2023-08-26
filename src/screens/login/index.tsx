import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { login } from '@/store/auth';
import { Button, Screen, Text, TextField, View } from '@/ui';

export const Login = () => {
  return (
    <Screen>
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
          <TextField placeholder="Enter email address" label="Email" />
          <View height={scale(8)} />
          <TextField
            placeholder="Enter password"
            label="Password"
            isSecure={true}
          />
        </View>
        <View height={scale(24)} />
        <Button label="Log in" onPress={login} />
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
