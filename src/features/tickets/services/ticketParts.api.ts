import { api } from "@/lib/server";
import type { CreateTicketPartInput } from "../schemas/ticketPartSchemas";

export async function getAllTicketPartsService() {
  const res = await api.get("/ticketParts");
  return res;
}

export async function addTicketPartService(data: CreateTicketPartInput) {
  const res = await api.post("/ticketParts", data);
  return res;
}

export async function editTicketPartService(
  id: string,
  data: CreateTicketPartInput
) {
  const res = await api.patch(`/ticketParts/${id}`, data);
  return res;
}

export async function deleteTicketPartService(id: string) {
  const res = await api.delete(`/ticketParts/${id}`);
  return res;
}
