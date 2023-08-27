import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

//import { StepIndicator } from "@/components/step-indicator";
import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import SettingsItem from '@/components/settings-item';
import type { Theme } from '@/theme';
import { Screen, View } from '@/ui';

const data = [
  { day: 'M', earnings: 50 },
  { day: 'TU', earnings: 100 },
  { day: 'W', earnings: 200 },
  { day: 'TH', earnings: 300 },
  { day: 'F', earnings: 150 },
  { day: 'SA', earnings: 100 },
  { day: 'SU', earnings: 250 },
];

const labels = ['Registration', 'Information', 'Invite', 'Fourth'];

export const Payments = () => {
  const { colors } = useTheme<Theme>();

  const { width } = useWindowDimensions();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={'Payments'} showBorder={true} />
      <View flex={1}>
        <View paddingHorizontal={'large'} gap={'medium'} paddingTop={'large'}>
          <SettingsItem icon="facebook" title="Hello" onPress={() => null} />
          <SettingsItem icon="facebook" title="Hello" onPress={() => null} />
        </View>

        <View height={100} />

        <View paddingHorizontal={'large'}>
          <StepIndicator stepCount={4} currentPosition={0} labels={labels} />
        </View>
      </View>

      <View alignItems={'center'}>
        <VictoryChart
          width={width}
          domainPadding={{ x: 20 }}
          theme={VictoryTheme.material}
        >
          <VictoryBar
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            barWidth={20}
            data={data}
            x="day"
            y="earnings"
            alignment="start"
            style={{ data: { fill: colors.primary } }}
          />
        </VictoryChart>
      </View>
    </Screen>
  );
};
