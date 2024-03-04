import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import {
  AddPaymentCard,
  AddRole,
  AddUser,
  ChangePassword,
  CompanyDetail,
  EditCompany,
  JdLibrary,
  JdLibraryDetail,
  JobDescription,
  JobPosted,
  LoginAndSecurity,
  MyAccount,
  MyPayments,
  PaymentMethods,
  Payments,
  PersonalInformation,
  Postjob,
  PostJobDetail,
  PostJobPayment,
  PostJobPreview,
  Roles,
  Users,
  UserSettings,
  RecruitmentProcess,
  AddProcess,
  Steps,
  AddStep,
  AddCompany,
  ChooseLocation,
  ChatList,
  Chats,
  Notifications,
} from "@/screens";
import Applicants from "@/screens/applicants";
import CandidateProfile from "@/screens/candidate-profile";
import { Job } from "@/screens/job";
import JobDetail from "@/screens/job-detail";
import { TabNavigator } from "./tab-navigator";
import {
  getDeviceToken,
  requestNotificationPermission,
  useInAppNotification,
} from '@/services/notification';
import { useFCMToken } from "@/services/api/auth/login";

export type AppStackParamList = {
  TabNavigator: undefined;
  Details: { id: number };
  Job: { id: string };
  Payments: undefined;
  Applicants: { id: any };
  jobDetail: { id: null };
  CandidateProfile: { data: any };
  PaymentMethods: undefined;
  MyPayments: undefined;
  AddPaymentCard: undefined;
  Postjob: undefined;
  PostJobDetail: undefined;
  PostJobPreview: undefined;
  PostJobPayment: { data: any };
  JobPosted: undefined;
  JdLibrary: undefined;
  JdLibraryDetail: undefined;
  MyAccount: undefined;
  ChangePassword: undefined;
  PersonalInformation: undefined;
  LoginAndSecurity: undefined;
  CompanyDetail: undefined;
  EditCompany: { data: any };
  UserSettings: undefined;
  Users: undefined;
  AddUser: undefined;
  Roles: undefined;
  AddRole: undefined;
  JobDescription: undefined;
  RecruitmentProcess: undefined;
  AddProcess: undefined;
  Steps: { id: number };
  AddStep: { processId: number; stepsCount: number };
  AddCompany: undefined;
  ChooseLocation: { from: any };
  ChatList: undefined;
  Chats: { person_id: any; chat_id?: any; profile_pic?: string; name?: string };
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

async function onDisplayNotification(remoteNotification) {
  // Request permissions (required for iOS)
  await notifee.requestPermission({
    criticalAlert: true,
  });

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'order',
    name: 'order',
    importance: AndroidImportance.HIGH,
    sound: 'sound',
    vibration: true,
    vibrationPattern: [300, 500],
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteNotification?.data.title,
    body: remoteNotification?.data.body,
    android: {
      channelId,
      vibrationPattern: [300, 500],
      //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: '100',
      },
    },

    ios: {
      critical: true,
      sound: 'default',
    },
  });
}



export const AppNavigator = () => {

  const { mutate: fcmTokenApi, isLoading } = useFCMToken();
   // send fcm token to backend
   const getFcmToken = async () => {
    let permissionEnabled = requestNotificationPermission();
    
    if (permissionEnabled) {
      let token = await getDeviceToken();
      if(token){
        // send fcm token to server
        fcmTokenApi(
          { fcm_token: token },
          {
            onSuccess: (data) => {
              if (data?.response?.status === 200) {
                // setUserData(data?.response?.data);
              } else {
                // showErrorMessage(data.response.message);
              }
            },
            onError: (error) => {
              // An error happened!
              console.log(`error`, error?.response?.data);
            },
          }
        );
      }

      console.log('token', token);
    }
  };

  React.useEffect(() => {
    getFcmToken();
  }, []);

    // in app notifications
    useInAppNotification(async (remoteNotification) => {
      onDisplayNotification(remoteNotification);
    });
  
    // Subscribe to events
    React.useEffect(() => {
      return notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            break;
        }
      });
    }, []);

    
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
        <Stack.Screen name="Postjob" component={Postjob} />
        <Stack.Screen name="PostJobDetail" component={PostJobDetail} />
        <Stack.Screen name="PostJobPayment" component={PostJobPayment} />
        <Stack.Screen name="PostJobPreview" component={PostJobPreview} />
        <Stack.Screen name="JobPosted" component={JobPosted} />
        <Stack.Screen name="JdLibrary" component={JdLibrary} />
        <Stack.Screen name="JdLibraryDetail" component={JdLibraryDetail} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
        <Stack.Screen name="LoginAndSecurity" component={LoginAndSecurity} />
        <Stack.Screen name="CompanyDetail" component={CompanyDetail} />
        <Stack.Screen name="EditCompany" component={EditCompany} />
        <Stack.Screen name="UserSettings" component={UserSettings} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Roles" component={Roles} />
        <Stack.Screen name="AddRole" component={AddRole} />
        <Stack.Screen name="JobDescription" component={JobDescription} />
        <Stack.Screen name="RecruitmentProcess" component={RecruitmentProcess} />
        <Stack.Screen name="AddProcess" component={AddProcess} />
        <Stack.Screen name="Steps" component={Steps} />
        <Stack.Screen name="AddStep" component={AddStep} />
        <Stack.Screen name="AddCompany" component={AddCompany} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
