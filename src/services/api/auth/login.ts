import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = { email: string; password: string };
type FCMVariables = { fcm_token: string;};


type Response = {
  response: {
    message: string;
    status: number;
    data: {
      token: string;
    };
  };
};

type SocialLoginPaylaod = {
  provider: string;
  user_type: '1' | '2';
  token: string;
  email: string;
  full_name: string;
};

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'company/login',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useSocialLogin = createMutation<Response, SocialLoginPaylaod, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'auth/social-login-mobile',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});


export const useFCMToken = createMutation<Response, FCMVariables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'person/fcm',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
