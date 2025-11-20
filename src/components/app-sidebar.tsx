"use client"

import * as React from "react"
import {
  Activity,
  AudioWaveform,
  BookOpen,
  Briefcase,
  Calendar,
  Command,
  DollarSign,
  Eye,
  Frame,
  GalleryVerticalEnd,
  Home,
  LayoutGrid,
  Layers,
  MapPin,
  PieChart,
  Plane,
  Radio,
  Settings,
  Zap,
  Building2
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useTranslations } from "next-intl"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Sidebar")

  // This is sample data.
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
    },
    teams: [
      { name: "Pass", logo: Building2 },
      { name: "Allinsys", logo: Building2 },
      { name: "Google", logo: Building2 },
    ],
    navMain: [
      {
        group: t("Principal"),
        items: [
          { title: t("Dashboard"), url: "/", icon: LayoutGrid, isActive: false },
          { title: t("Activity"), url: "#", icon: Activity, isActive: true },
        ],
      },
      {
        group: t("Services"),
        items: [
          { title: t("Transfer"), url: "/transfer", icon: Briefcase, isActive: false },
          { title: t("Combo"), url: "#", icon: Layers, isActive: false },
          { title: t("Hosting"), url: "#", icon: Home, isActive: false },
          { title: t("Ticket"), url: "#", icon: Briefcase, isActive: false },
          { title: t("Tour"), url: "#", icon: Plane, isActive: false },
          { title: t("Experience"), url: "#", icon: Eye, isActive: false },
          { title: t("Circuit"), url: "#", icon: Radio, isActive: false },
        ],
      },
      {
        group: t("Commercial"),
        items: [
          { title: t("Tariff"), url: "#", icon: DollarSign, isActive: false },
          { title: t("Availability"), url: "#", icon: Calendar, isActive: false },
        ],
      },
      {
        group: t("Addons"),
        items: [
          { title: t("Slots"), url: "#", icon: Zap, isActive: false },
          { title: t("Perimeters"), url: "#", icon: MapPin, isActive: false },
          { title: t("Guidelines"), url: "#", icon: BookOpen, isActive: false },
        ],
      },
      {
        group: t("Organization"),
        items: [
          { title: t("Settings"), url: "#", icon: Settings, isActive: false },
        ],
      },
    ],
    projects: [
      { name: "Design Engineering", url: "#", icon: Frame },
      { name: "Sales & Marketing", url: "#", icon: PieChart },
      { name: "Travel", url: "#", icon: MapPin },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
