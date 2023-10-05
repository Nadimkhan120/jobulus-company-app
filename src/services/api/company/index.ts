import type { AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = void;

type EditCompanyVariables = {
  name: string;
  email: string;
  contact_number: string;
  no_of_employees: number;
  start_time: string;
  end_time: string;
  average_wage: number;
  languages: number[];
  categories: number[];
  short_description?: string;
  company_id: number;
  locations: {
    address_1: string;
    address_2: string;
    city_id: string;
    country_id: string;
    phone: string;
    email: string;
    website: string;
    web_location: string;
    longitude: string;
    latitude: string;
    google_location: string;
  };
};

type Company = {
  average_wage: string | null;
  contact_number: string;
  created_at: string;
  created_by: string | null;
  email: string;
  id: number;
  is_approved: string;
  member_since: string;
  name: string;
  no_of_employees: string | null;
  salary_range: string | null;
  short_description: string;
  slug: string;
  user_id: string;
  user_name: string;
  website: string | null;
  working_time: string | null;
  pic: string;
  cover: string;
  role_name: string;
};

type Response = {
  response: {
    data: Company[];
  };

  message: string;
  status: number;
};

export const useCompanies = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'company/user',
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({ url: primaryKey }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useEditCompany = createMutation<
  Response,
  EditCompanyVariables,
  AxiosError
>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'company/update-profile',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
