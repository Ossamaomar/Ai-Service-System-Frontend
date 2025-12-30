import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTicketSchema,
  type CreateTicketInput,
} from "../schemas/ticketSchemas";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import type { Device } from "../types/tickets.types";
import type { Customer } from "@/features/users/types/users.types";
import type { User } from "@/features/auth/types/auth.types";
import {
  getAllCustomersService,
  getAllTechniciansService,
} from "@/features/users/services/users.api";
import {
  createTicketService,
  getCustomerDevicesService,
} from "../services/tickets.api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateTicket() {
  const form = useForm<CreateTicketInput>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      deviceId: "",
      customerId: "",
      assignedTechId: undefined,
      customerPhone: "",
      branch: "FARQ",
      hasScratches: false,
      includesBattery: false,
      includesCharger: false,
      missingSkrews: false,
      underWarranty: false,
      urgent: false,
      wantsBackup: false,
      password: "",
    },
  });

  const { user } = useAuth();
  const customerPhone = useWatch({
    control: form.control,
    name: "customerPhone",
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showPhones, setShowPhones] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [devices, setDevices] = useState<Device[]>();
  const [technicians, setTechnicians] = useState<User[]>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateTicketInput) => createTicketService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket created successfully");
      form.reset();
      setOpen(false); // 👈 CLOSE DIALOG
      setIsLoading(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setIsLoading(false);
    },
  });

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
    async function fetchCustomerDevices() {
      try {
        if (!selectedCustomer) {
          setDevices([]);
          return;
        }
        const res = await getCustomerDevicesService(selectedCustomer?.id ?? "");
        console.log(res);
        setDevices(res.data);
      } catch {
        toast.error("An error occurred");
      }
    }

    fetchCustomerDevices();
  }, [selectedCustomer]);

  useEffect(() => {
    async function fetchTechnicians() {
      try {
        const res = await getAllTechniciansService(
          "TECHNICIAN",
          user?.branch || ""
        );
        setTechnicians(res.data);
        // console.log(res);
      } catch {
        toast.error("An error occured");
      }
    }

    fetchTechnicians();
  }, [user?.branch]);

  useEffect(() => {
    if (open === false) {
      form.reset();
    }
  }, [form, open]);

  function selectCustomer(customerData: Customer) {
    const customer = customers.find(
      (customer) => customer.phone === customerData.phone
    );
    form.setValue("customerPhone", customerData.phone);
    setSelectedCustomer(customer);
    form.setValue("customerId", customer?.id ?? "", { shouldValidate: true });
  }

  async function onSubmit(data: CreateTicketInput) {
    setIsLoading(true);
    mutation.mutate(data);
  }

  return {
    form,
    onSubmit,
    showPhones,
    setShowPhones,
    customerPhone,
    customers,
    selectCustomer,
    devices,
    technicians,
    user,
    open,
    setOpen,
    isLoading
  };
}
