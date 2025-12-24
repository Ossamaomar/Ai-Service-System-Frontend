import { useAuth } from "@/features/auth/contexts/AuthContext";
import { IconListDetails, IconUser } from "@tabler/icons-react";
import { FaUsersGear } from "react-icons/fa6";
import { useMemo, type ComponentType } from "react";

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
              url: "/app/tickets",
              icon: IconListDetails,
            },
            {
              title: "Technicians",
              url: "/app/technicians",
              icon: FaUsersGear,
            },
            {
              title: "Account",
              url: "/app/account",
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
