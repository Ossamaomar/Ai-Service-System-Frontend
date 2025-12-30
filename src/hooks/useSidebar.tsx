import { useAuth } from "@/features/auth/contexts/AuthContext";
import { IconListDetails, IconUser } from "@tabler/icons-react";
import { FaUsers, FaUsersGear } from "react-icons/fa6";
import { useMemo, type ComponentType } from "react";
import { MdDevices } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { BsCpu } from "react-icons/bs";

type SidebarIcon = ComponentType<{ className?: string; size?: number }>;

export interface NavItem {
  title: string;
  url: string;
  icon: SidebarIcon;
}

interface NavData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavItem[];
}

export default function useSidebar() {
  const { user } = useAuth();
  const navData = useMemo<NavData | null>(() => {
    if (!user) return null;

    switch (user.role) {
      case "RECEPTIONIST":
        return {
          user: {
            name: user.name,
            email: user.email,
            avatar: "/avatars/default.jpg",
          },
          navMain: [
            {
              title: "Tickets",
              url: "/tickets",
              icon: IconListDetails,
            },
            {
              title: "Devices",
              url: "/devices",
              icon: MdDevices,
            },
            {
              title: "Customers",
              url: "/customers",
              icon: FaUsers,
            },
            {
              title: "Technicians",
              url: "/technicians",
              icon: FaUsersGear,
            },
            {
              title: "Account",
              url: "/account",
              icon: IconUser,
            },
          ],
        };
      case "TECHNICIAN":
        return {
          user: {
            name: user.name,
            email: user.email,
            avatar: "/avatars/default.jpg",
          },
          navMain: [
            {
              title: "Tickets",
              url: "/tickets",
              icon: IconListDetails,
            },
            {
              title: "Devices",
              url: "/devices",
              icon: MdDevices,
            },
            {
              title: "Parts",
              url: "/parts",
              icon: BsCpu,
            },
            {
              title: "Repairs",
              url: "/repairs",
              icon: GiAutoRepair ,
            },
            {
              title: "Account",
              url: "/account",
              icon: IconUser,
            },
          ],
        };

      default:
        return null;
    }
  }, [user]);

  return { navData };
}
