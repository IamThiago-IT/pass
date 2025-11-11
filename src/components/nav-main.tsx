"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    group: string
    items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
    }[]
  }[]
}) {
  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.group}>
          <SidebarGroupLabel className="text-sm">{group.group}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem
                key={item.title}
                className={item.isActive ? "" : "opacity-40"}
              >
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.isActive}
                  className="text-sm py-2 px-4"
                >
                  <a href={item.url}>
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span className="text-sm font-bold">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
