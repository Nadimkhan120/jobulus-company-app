import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import {
  AddPaymentCard,
  MyPayments,
  PaymentMethods,
  Payments,
} from '@/screens';
import Applicants from '@/screens/applicants';
import CandidateProfile from '@/screens/candidate-profile';
import { Job } from '@/screens/job';
import JobDetail from '@/screens/job-detail';

import { TabNavigator } from './tab-navigator';

export type AppStackParamList = {
  TabNavigator: undefined;
  Details: { id: number };
  Job: undefined;
  Payments: undefined;
  Applicants: undefined;
  jobDetail: undefined;
  CandidateProfile: undefined;
  PaymentMethods: undefined;
  MyPayments: undefined;
  AddPaymentCard: undefined;
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
        <Stack.Screen name="Job" component={Job} />
        <Stack.Screen name="jobDetail" component={JobDetail} />
        <Stack.Screen name="Applicants" component={Applicants} />
        <Stack.Screen name="CandidateProfile" component={CandidateProfile} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
        <Stack.Screen name="AddPaymentCard" component={AddPaymentCard} />
        <Stack.Screen name="MyPayments" component={MyPayments} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
