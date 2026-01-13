import { api } from "@/lib/server";
import type { CreatePartInput } from "../schemas/partsSchema";

export async function getAllPartsService(
  page?: string,
  search: string = "",
  branch?: string
) {
  const res = await api.get(
    `/parts?${page && `page=${page}`}${branch && `&branch=${branch}`}&name=${search}`
  );
  return res;
}

export async function createPartService(data: CreatePartInput) {
  const res = await api.post(`/parts`, data);
  return res;
}

export async function editPartService(id: string, data: CreatePartInput) {
  const res = await api.patch(`/parts/${id}`, data);
  return res;
}

export async function deletePartService() {
  const res = await api.delete(`/parts`);
  return res;
}
