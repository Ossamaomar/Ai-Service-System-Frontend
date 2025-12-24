import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import aiLogoTransparent from "@/assets/ai-logo-transparent.jpg";
import useSidebar from "@/hooks/useSidebar";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navData } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <img src={aiLogoTransparent} className="size-8" alt="Hero" />
                <span className="text-base font-semibold">
                  AI Service System
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {navData ? (
        <>
          <SidebarContent className="items-center justify-center">
            <NavMain items={navData.navMain} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={navData.user} />
          </SidebarFooter>
        </>
      ) : null}
    </Sidebar>
  );
}
