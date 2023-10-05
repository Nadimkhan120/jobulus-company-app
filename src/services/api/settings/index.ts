import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = void;

type Setting = {
  id: string;
  name: string;
};

type Response = Setting[];

type Response2 = {
  response: {
    data: Setting[];
  };

  message: string;
  status: number;
};

export const useExperienceLevels = createQuery<Response, Variables, AxiosError>(
  {
    primaryKey: 'experience-levels',
    queryFn: ({ queryKey: [primaryKey] }) => {
      //@ts-ignore
      return NetWorkService.Get({ url: primaryKey }).then(
        (response) => response.data
      );
    },
  }
);

export const useEducationLevels = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'education-levels',
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Get({ url: primaryKey }).then(
      // @ts-ignore
      (response) => response.data
    );
  },
});

export const useJobTypes = createQuery<Response2, Variables, AxiosError>({
  primaryKey: 'job-types',
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Get({ url: primaryKey }).then(
      (response) => response.data
    );
  },
});

export const useJobCategories = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'job-categories',
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Post({ url: primaryKey }).then((response) => {
      //@ts-ignore
      return response.data;
    });
  },
});
