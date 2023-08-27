import { useTheme } from '@shopify/restyle';
import React from 'react';

//import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import SettingsItem from '@/components/settings-item';
import type { Theme } from '@/theme';
import { Screen, View } from '@/ui';

// const labels = ['Registration', 'Information', 'Invite', 'Fourth'];

export const Payments = () => {
  const { colors } = useTheme<Theme>();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={'Payments'} showBorder={true} />
      <View flex={1}>
        <View paddingHorizontal={'large'} gap={'medium'} paddingTop={'large'}>
          <SettingsItem
            icon="credit-card"
            title="Payment Methods"
            onPress={() => null}
          />
          <SettingsItem
            icon="list"
            title="Your Payments"
            onPress={() => null}
          />
        </View>

        {/* <View paddingHorizontal={'large'}>
          <StepIndicator stepCount={4} currentPosition={0} labels={labels} />
        </View> */}
      </View>
    </Screen>
  );
};
