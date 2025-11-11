"use client"

import * as React from "react"
import {
  Zap,
  LayoutGrid,
  Activity,
  Briefcase,
  Home,
  Plane,
  Eye,
  Radio,
  DollarSign,
  Calendar,
  TrendingUp,
  BookOpen,
  MapPin,
  Layers,
  Settings,
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      group: "Principal",
      items: [
        {
          title: "Painel",
          url: "/",
          icon: LayoutGrid,
          isActive: false,
        },
        {
          title: "Atividade",
          url: "#",
          icon: Activity,
          isActive: true,
        },
      ],
    },
    {
      group: "Serviços",
      items: [
        {
          title: "Transfer",
          url: "/transfer",
          icon: Briefcase,
          isActive: false,
        },
        {
          title: "Combo",
          url: "#",
          icon: Layers,
          isActive: false,
        },
        {
          title: "Hospedagem",
          url: "#",
          icon: Home,
          isActive: false,
        },
        {
          title: "Ingresso",
          url: "#",
          icon: Briefcase,
          isActive: false,
        },
        {
          title: "Passeio",
          url: "#",
          icon: Plane,
          isActive: false,
        },
        {
          title: "Experiência",
          url: "#",
          icon: Eye,
          isActive: false,
        },
        {
          title: "Circuito",
          url: "#",
          icon: Radio,
          isActive: false,
        },
      ],
    },
    {
      group: "Comercial",
      items: [
        {
          title: "Tarifário",
          url: "#",
          icon: DollarSign,
          isActive: false,
        },
        {
          title: "Disponibilidade",
          url: "#",
          icon: Calendar,
          isActive: false,
        },
      ],
    },
    {
      group: "Complementos",
      items: [
        {
          title: "Slots",
          url: "#",
          icon: Zap,
          isActive: false,
        },
        {
          title: "Perímetros",
          url: "#",
          icon: MapPin,
          isActive: false,
        },
        {
          title: "Diretrizes",
          url: "#",
          icon: BookOpen,
          isActive: false,
        },
      ],
    },
    {
      group: "Organização",
      items: [
        {
          title: "Configurações",
          url: "#",
          icon: Settings,
          isActive: false,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
