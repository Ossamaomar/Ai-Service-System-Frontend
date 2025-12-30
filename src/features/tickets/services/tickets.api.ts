import { api } from "@/lib/server";
import type { CreateTicketInput, UpdateTicketInput } from "../schemas/ticketSchemas";
import type { Ticket, TicketStatus } from "../types/tickets.types";

export async function getAllTicketService(
  searchValue: string = "",
  searchType: string,
  page: string = "1",
  status?: string,
  sort: string = "desc",
  branch: string = ""
) {
  console.log(`${searchType}=${searchValue ? searchValue : ""}`)
  const res = await api.get(
    `/tickets?${searchType}=${searchValue ? searchValue : ""}&page=${page}&sort=${
      sort === "desc" ? "-createdAt" : "createdAt"
    }${!status ? "" : `&status=${status}`}&branch=${branch}`
  );
  return res;
}

export async function createTicketService(data: CreateTicketInput) {
  const res = (await api.post(`/tickets`, data)).data;
  return res;
}

export async function updateTicketService(id: string, data: UpdateTicketInput) {
  const res = await api.patch(`/tickets/${id}`, data);
  return res;
}

export async function getTicketByIdService(
  id: string
): Promise<{ status: string; data: Ticket; message?: string }> {
  const res = (await api.get(`/tickets/${id}`)).data;
  return res;
}

export async function getCustomerDevicesService(id: string) {
  const res = (await api.get(`/devices?customerId=${id}`)).data;
  return res;
}

export async function changeTicketStatusService(id: string, status: TicketStatus) {
  const res = await api.patch(`/tickets/${id}`, {
    status,
  });
  return res;
}
