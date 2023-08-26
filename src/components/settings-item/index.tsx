import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { PressableScale, Text, View } from '@/ui';

import { CompanyButton } from '../company-button';

const SettingsItem = () => {
  return (
    <PressableScale>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={'large'}
        paddingVertical={'small'}
        borderBottomColor={'grey500'}
        borderBottomWidth={StyleSheet.hairlineWidth * 2}
      >
        <View flex={1} flexDirection={'row'} alignItems={'center'}>
          <CompanyButton
            backgroundColor={'black'}
            icon="finance"
            onPress={() => null}
            size={scale(48)}
            imageSize={scale(48)}
          />
          <View paddingLeft={'small'}>
            <Text variant={'semiBold14'} color={'black'}>
              settings
            </Text>
          </View>
        </View>
        <View>
          <Text>arrow</Text>
        </View>
      </View>
    </PressableScale>
  );
};

export default SettingsItem;
