import { api } from "@/lib/server";
import type { CreateTicketInput } from "../schemas/ticketSchemas";

export async function getAllTicketService(
  deviceCode: string = "",
  page: number = 1,
  status: string = "all",
  sort: string = "desc",
) {
  const res = await api.get(
    `/tickets?deviceCode=${deviceCode ? deviceCode : ""}&page=${page}${status === "all" ? "" : `&status=${status}`}&sort=${sort === "desc" ? "-createdAt" : "createdAt"}`
  );
  return res;
}

export async function createTicketService(data: CreateTicketInput) {
  const res = (await api.post(`/tickets`, data)).data;
  return res;
}

export async function getCustomerDevicesService(id: string) {
  const res = (await api.get(`/devices?customerId=${id}`)).data;
  return res;
}
