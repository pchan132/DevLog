"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {items.map((item) => (
          <SidebarMenuButton key={item.title} asChild>
            <SidebarMenuSubButton asChild className="pl-8 ">
              <a href={item.url}>
                <span className="text-xl">{item.title}</span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuButton>
        ))}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
