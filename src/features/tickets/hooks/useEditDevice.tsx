import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import type { Device } from "../types/tickets.types";
import { getAllCustomersService } from "@/features/users/services/users.api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDeviceSchema,
  type CreateDeviceInput,
} from "../schemas/deviceSchema";
import type { Customer } from "@/features/users/types/users.types";
import { updateDeviceService } from "../services/devices.api";

export default function useEditDevice(device: Device) {
  const form = useForm<CreateDeviceInput>({
    resolver: zodResolver(createDeviceSchema),
    defaultValues: {
      serialNumber: device?.serialNumber || "",
      brand: device.brand,
      color: device.color,
      customerPhone: device.customer?.phone,
      customerId: device.customerId,
      model: device.model,
      type: device.type,
      otherType: device.otherType,
    },
  });

  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const type = useWatch({
    control: form.control,
    name: "type",
  });
  const customerPhone = useWatch({
    control: form.control,
    name: "customerPhone",
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showPhones, setShowPhones] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateDeviceInput) =>
      updateDeviceService(device.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      toast.success("Device edited successfully");
      form.reset();
      setOpen(false);
      setIsLoading(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setIsLoading(false);
    },
  });

  async function onSubmit(data: CreateDeviceInput) {
    setIsLoading(true);
    if (data.serialNumber?.length === 0) {
      data = { ...data, serialNumber: undefined };
    }
    mutation.mutate(data);
  }

  function selectCustomer(customerData: Customer) {
    const customer = customers.find(
      (customer) => customer.phone === customerData.phone
    );
    form.setValue("customerPhone", customerData.phone);
    setSelectedCustomer(customer);
    form.setValue("customerId", customer?.id ?? "", { shouldValidate: true });
  }

  useEffect(() => {
    if (open === false) {
      form.reset();
    }
  }, [form, open]);

  useEffect(() => {
    async function getCustomers() {
      if (customerPhone.length < 3 || customerPhone.length > 8) return;

      const res = await getAllCustomersService(customerPhone);
      setCustomers(res.data.map((customer: Customer) => customer));

      if (customerPhone.length < 8) {
        setSelectedCustomer(undefined);
        return;
      }

      if (customerPhone.length === 8 && res.data.length === 1) {
        setSelectedCustomer(res.data[0]);
        form.setValue("customerId", res.data[0].id ?? "", {
          shouldValidate: true,
        });
      }
    }

    getCustomers();
  }, [customerPhone, form]);

  useEffect(() => {
    if (type !== "OTHER") {
      form.setValue("otherType", "");
    }
  }, [type, form]);

  return {
    form,
    onSubmit,
    user,
    open,
    setOpen,
    type,
    showPhones,
    setShowPhones,
    selectCustomer,
    customerPhone,
    customers,
    isLoading
  };
}
