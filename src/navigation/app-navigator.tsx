import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'moti';
import * as React from 'react';


import { Job } from '@/screens/job';

import { VStack } from '@/ui/atom';

import { TabNavigator } from './tab-navigator';

const Details = () => {
  return (
    <VStack>
      <Text>hello</Text>
    </VStack>
  );
};

export type AppStackParamList = {
  TabNavigator: undefined;
  Details: { id: number };
  Job: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Job" component={Job} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
