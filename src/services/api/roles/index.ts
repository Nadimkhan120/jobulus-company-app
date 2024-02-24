import type { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";
import { NetWorkService } from "@/services/apinetworkservice";

type Variables = { id: number };

type AddRoleBody = {
  company_id: number;
  name: string;
  permissions: {
    module_id: number;
    is_create: number;
    is_read: number;
    is_update: number;
    is_delete: number;
  }[];
};

type UpdateRoleBody = {
  role_id:number;
  company_id: number;
  name: string;
  permissions: {
    module_id: number;
    is_create: number;
    is_read: number;
    is_update: number;
    is_delete: number;
  }[];
};
type DeleteRoleBody = {
  role_id:number;
}

type Permission = {
  module: string;
  id: number;
  role_id: string;
  module_id: string;
  is_create: string;
  is_read: string;
  is_update: string;
  is_delete: string;
  created_by: null | string;
  deleted_by: null | string;
  updated_by: null | string;
  created_at: null | string;
  updated_at: null | string;
  deleted_at: null | string;
};

export type Role = {
  name: string;
  module: string;
  id: number;
  role_id: string;
  module_id: string;
  permissions: Permission[];
};

type Response = {
  default: Role[];
  company_roles: Role[];
};

type Response2 = {
  status: number;
  message: string;
};

type DeleteResponse = {
  status: number;
  message: string;
};

export const useGetRoles = createQuery<Response, Variables, AxiosError>({
  primaryKey: "company-roles",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_id/${variables?.id}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useAddRole = createMutation<Response2, AddRoleBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "company-roles/add",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useUpdateRole = createMutation<Response2, UpdateRoleBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Put({
      url: "company-roles/edits",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useDeleteRole = createMutation<DeleteResponse, DeleteRoleBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Delete({
      url: `company/role/${variables?.role_id}`,
      body: {},
      // @ts-ignore
    }).then((response) => response?.data),
});