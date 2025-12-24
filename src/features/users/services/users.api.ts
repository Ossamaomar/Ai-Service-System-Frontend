import { api } from "@/lib/server";

export async function getAllCustomersService(phone: string = "") {
  const res = (await api.get(`/customers?phone=${phone}`)).data;
  return res;
}

export async function getAllTechnicians(role: string) {
  const res = (await api.get(`/users?role=${role}`)).data;
  return res;
}
