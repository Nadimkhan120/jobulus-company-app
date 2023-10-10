import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { NetWorkService } from "@/services/apinetworkservice";

type Variables = { status: string; id: number };
type TopVariables = { id: number };
type JobVariables = { id: number };

export type Job = {
  industry_name: string | null;
  company_id: string;
  job_title: string;
  job_titles: string;
  company_name: string;
  company_short_description: string;
  company_member_since: string;
  experience_level: string;
  job_level: string | null;
  job_type: "Software Engineer";
  job_category: "App developer";
  job_address_1: "";
  job_address_2: "";
  web_location: "";
  latitude: "0.0000000";
  longitude: "0.0000000";
  city_name: "islamabad";
  country_name: "pakistan";
  image_type: null;
  file_name: string | null;
  file_description: string | null;
  file_location: string | null;
  file_type: string | null;
  id: null;
  experience_id: string;
  job_level_id: string;
  salary_max: string;
  salary_min: string;
  job_type_id: string;
  job_category_id: string;
  deadline_date: string | null;
  job_time_type: string;
  short_description: string;
  long_description: string;
  job_rate: string;
  created_by: string;
  deleted_by: null;
  updated_by: null;
  created_at: string;
  updated_at: string;
  job_status: string;
  job_title_id: string;
  industry_id: string;
  popular_keywords: string;
  position_id: string | null;
  is_top: string;
  rating: string;
  job_post_duration_id: string;
  job_rate_type_id: string;
  company_recruitment_process_id: string;
  is_expired: string;
  deleted_at: string | null;
  applicants: any;
  NoOfApplicants?: number;
};

type Response = {
  response: {
    data: {
      data: Job[];
    };
  };

  message: string;
  status: number;
};

type Response4 = {
  response: {
    data: Job[];
  };

  message: string;
  status: number;
};

type Setting = {
  id: number;
  name: string;
};

type Response2 = Setting[];

type Response3 = {
  response: {
    data: Job;
  };
};

export const useVacancies = createQuery<Response, Variables, AxiosError>({
  primaryKey: "company-jobs",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_id/${variables?.id}/status/${variables?.status}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useTopVacancies = createQuery<Response4, TopVariables, AxiosError>({
  primaryKey: "company-top-jobs",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_id/${variables?.id}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useJobStatuses = createQuery<Response2, Variables, AxiosError>({
  primaryKey: "job-statuses",
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Get({ url: primaryKey }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useJobDetail = createQuery<Response3, JobVariables, AxiosError>({
  primaryKey: "jobs/job_id",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/${variables?.id}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});
