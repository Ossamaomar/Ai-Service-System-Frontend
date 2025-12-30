import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useState } from "react";
import {
  updatePasswordSchema,
  updateProfileSchema,
  type UpdatePasswordInput,
  type UpdateProfileInput,
} from "../schemas/accountSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateCurrentUserService } from "../services/users.api";
import { updatePasswordService } from "@/features/auth/services/auth.api";
import { AxiosError } from "axios";

export default function useEditAccount() {
  const { user, refresh, updateUser } = useAuth();
  const [isEditingData, setIsEditingData] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const dataForm = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const passwordForm = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const dataFormOnSubmit = async (data: UpdateProfileInput) => {
    try {
      setIsLoadingData(true);

      await refresh();
      const res = await updateCurrentUserService(data);
      updateUser(res.data.data);
      toast.success("Profile updated successfully!");
      setIsEditingData(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setIsLoadingData(false);
    }
  };

  const passwordFormOnSubmit = async (data: UpdatePasswordInput) => {
    try {
      setIsLoadingPassword(true);

      await refresh();
      await updatePasswordService(data);

      toast.success("Password updated successfully!");
      setIsEditingPassword(false);
    } catch (error) {
        console.log("Erro")
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleDataFormCancel = () => {
    dataForm.reset({
      name: user?.name || "",
      phone: user?.phone || "",
    });
    setIsEditingData(false);
  };

  const handlePasswordFormCancel = () => {
    passwordForm.reset({
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    });
    setIsEditingPassword(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "TECHNICIAN":
        return "default";
      case "CUSTOMER":
        return "secondary";
      default:
        return "outline";
    }
  };

  return {
    user,
    isEditingData,
    isLoadingData,
    dataFormOnSubmit,
    handleDataFormCancel,
    getInitials,
    getRoleBadgeVariant,
    dataForm,
    setIsEditingData,
    isEditingPassword,
    setIsEditingPassword,
    passwordForm,
    isLoadingPassword,
    passwordFormOnSubmit,
    handlePasswordFormCancel,
  };
}
