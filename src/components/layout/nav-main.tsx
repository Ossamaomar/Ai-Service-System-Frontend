import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/hooks/useSidebar";
import { useLocation, useNavigate } from "react-router";

export function NavMain({ items }: { items: NavItem[] }) {
  // const pathname = useRouterState({
  //   select: (state) => state.location.pathname,
  // });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className={`${
                  pathname.includes(item.url)
                    ? "bg-linear-to-r from-[#057f77] via-[#057f77]/50 to-white !text-white rounded-r-none"
                    : ""
                }
                          bg-white transition duration-300 hover:border-2  py-5  hover:border-[#057f77]/80 rounded-lg cursor-pointer
                        `}
                onClick={() => navigate(item.url)}
              >
                <item.icon className="!w-5 !h-5 shrink-0" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
