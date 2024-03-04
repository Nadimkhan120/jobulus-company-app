import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = {
  email: string;
  verification_code: string;
  password: string;
};

type ResendVariables = {
  email: string;
};

type Response = {
  response: {
    message: string;
    status: number;
    data: {
      token: string;
    };
  };
};

export const useVerifyEmail = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'applicant/verify/email/code',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useResendCode = createMutation<Response, ResendVariables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'applicant/resendcode',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
