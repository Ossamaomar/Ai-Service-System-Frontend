import { api } from "@/lib/server";
import type { CreateCustomerInput } from "../schemas/customerSchema";
import type { UpdateProfileInput } from "../schemas/accountSchema";

export async function getAllCustomersService(phone: string = "") {
  const res = (await api.get(`/customers?phone=${phone}`)).data;
  return res;
}

export async function getAllCustomersOverviewService(
  page: string = "1",
  phone: string = "",
  sort: string
) {
  const res = await api.get(
    `/customers/customersOverview?phone=${phone}&page=${page}&sort=${sort}`
  );

  return res;
}

export async function createCustomerService(data: CreateCustomerInput) {
  const res = await api.post(`/customers`, data);
  return res;
}

export async function getAllTechniciansService(role: string, branch: string) {
  const res = (await api.get(`/users?role=${role}&branch=${branch}`)).data;
  return res;
}

export async function getAllTechniciansOverviewService(
  sort: string = "",
  page: string = "1",
  name: string = "",
  branch: string = "",
) {
  const res = await api.get(
    `/users/techniciansOverview?name=${name}&sort=${sort}&page=${page}&branch=${branch}`
  );

  return res;
}

export async function updateCurrentUserService(data: UpdateProfileInput) {
  const res = await api.patch(`/users/currentUser`, data);
  return res
}
