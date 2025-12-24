import type { Branches, Ticket } from "@/features/tickets/types/tickets.types";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "RECEPTIONIST" | "TECHNICIAN" | "CUSTOMER" | "ADMIN" | "STORE_MANAGER";
  isActive: boolean;
  branch?: Branches;

  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  //   password: string;
  //   passwordConfirm: string;
  //   assignedTickets?: Ticket[];
  //   customer?: Customer;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  userId?: string;
  tickets?: Ticket[];
  // user?: string;
  // devices?: Device[];
  isActive: boolean;
  createdAt: Date;
};
