import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { CompanyButton } from '@/components/company-button';
import SettingsItem from '@/components/settings-item';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

export const Settings = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <View flex={1}>
        <View height={scale(119)} backgroundColor={'error'}>
          <Text>Cover here</Text>
        </View>

        <View
          alignSelf={'flex-start'}
          marginLeft={'large'}
          style={{
            marginTop: -scale(43),
          }}
        >
          <CompanyButton
            icon="facebook"
            onPress={() => null}
            size={scale(86)}
            imageSize={scale(86)}
          />
        </View>

        <View paddingHorizontal={'large'} paddingVertical={'large'}>
          <Text variant={'semiBold20'} color={'black'}>
            vFairs
          </Text>
          <Text variant={'regular13'} color={'grey200'}>
            Lahore-Islamabad Motorway, Punjab, Pakistan
          </Text>
        </View>

        <View
          height={StyleSheet.hairlineWidth * 2}
          backgroundColor={'grey500'}
        />

        <View paddingHorizontal={'large'} gap={'medium'} paddingTop={'medium'}>
          <SettingsItem
            icon="facebook"
            title="Hello"
            onPress={() => navigation.navigate('Payments')}
          />
          <SettingsItem
            icon="facebook"
            title="Hello"
            onPress={() => navigation.navigate('Payments')}
          />
          <SettingsItem
            icon="facebook"
            title="Hello"
            onPress={() => navigation.navigate('Payments')}
          />
          <SettingsItem
            icon="facebook"
            title="Payments"
            onPress={() => navigation.navigate('Payments')}
          />
        </View>
      </View>
    </Screen>
  );
};

export default Settings;
