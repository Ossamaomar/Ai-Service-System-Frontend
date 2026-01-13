import { api } from "@/lib/server";
import type { CreateRepairInput } from "../schemas/repairsSchema";

export async function getAllRepairsService(
  page: string = "",
  search: string = "",
) {
  const res = await api.get(
    `/repairs?${page && `page=${page}`}&name=${search}`
  );
  return res;
}

export async function createRepairService(data: CreateRepairInput) {
  const res = await api.post(`/repairs`, data);
  return res;
}

export async function editRepairService(id: string, data: CreateRepairInput) {
  const res = await api.patch(`/repairs/${id}`, data);
  return res;
}

export async function deleteRepairService() {
  const res = await api.delete(`/repairs`);
  return res;
}
