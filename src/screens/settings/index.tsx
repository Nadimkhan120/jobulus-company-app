import { useTheme } from '@shopify/restyle';
import React from 'react';
import {} from 'react-native';
import { scale } from 'react-native-size-matters';

import { CompanyButton } from '@/components/company-button';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

export const Settings = () => {
  const { colors } = useTheme<Theme>();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <View flex={1} backgroundColor={'info'}>
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
      </View>
    </Screen>
  );
};

export default Settings;
