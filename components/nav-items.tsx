"use client";

import {
  BookOpen,
  Brain,
  Code,
  Lightbulb,
  MessageCircleQuestion,
  Users,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    name: "Community Post",
    url: "/admin/post",
    icon: Users,
  },
  {
    name: "Classroom",
    url: "/dashboard/classroom",
    icon: BookOpen,
  },
  {
    name: "Ask me anything",
    url: "/dashboard/ask-me-anything",
    icon: MessageCircleQuestion,
  },
  {
    name: "Project Ideas",
    url: "/dashboard/project-ideas",
    icon: Lightbulb,
  },
  {
    name: "Code with peers",
    url: "/dashboard/code-with-peers",
    icon: Code,
  },
  {
    name: "Weekly Catchup",
    url: "/dashboard/weekly-catchup",
    icon: Brain,
  },
];

export function NavItems() {
  return (
    <SidebarGroup className="">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon size={24} />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
