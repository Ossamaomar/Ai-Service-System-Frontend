import { api } from "@/lib/server";
import type { CreateTicketRepairInput } from "../schemas/ticketRepairSchema";

export async function getAllTicketRepairsService() {
  const res = await api.get("/ticketRepairs");
  return res;
}

export async function addTicketRepairService(data: CreateTicketRepairInput) {
  const res = await api.post("/ticketRepairs", data);
  return res;
}

export async function editTicketRepairService(
  id: string,
  data: CreateTicketRepairInput
) {
  const res = await api.patch(`/ticketRepairs/${id}`, data);
  return res;
}

export async function deleteTicketRepairService(id: string) {
  const res = await api.delete(`/ticketRepairs/${id}`);
  return res;
}
