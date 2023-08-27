import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'moti';
import * as React from 'react';

import { Payments } from '@/screens';
import Applicants from '@/screens/applicants';
import CandidateProfile from '@/screens/candidate-profile';
import { Job } from '@/screens/job';
import JobDetail from '@/screens/job-detail';
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
  Payments: undefined;
  Applicants: undefined;
  jobDetail: undefined;
  CandidateProfile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Job" component={Job} />
        <Stack.Screen name="jobDetail" component={JobDetail} />
        <Stack.Screen name="Applicants" component={Applicants} />
        <Stack.Screen name="CandidateProfile" component={CandidateProfile} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
