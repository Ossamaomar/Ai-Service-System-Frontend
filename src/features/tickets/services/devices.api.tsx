import { api } from "@/lib/server";
import type { CreateDeviceInput } from "../schemas/deviceSchema";

export async function getAllDevicesService(page: string = "1", customerPhone: string = "") {
  const res = await api.get(`/devices?page=${page}&customerPhone=${customerPhone}`);
  return res;
}
export async function createDeviceService(data: CreateDeviceInput) {
  const res = await api.post(`/devices`, data);
  return res;
}
export async function updateDeviceService(id: string, data: CreateDeviceInput) {
  const res = await api.patch(`/devices/${id}`, data);
  return res;
}
