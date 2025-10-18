"use client";

// Interface for team data
export interface Team {
  name: string;
  logo: string;
  plan: string;
}

// Interface for navigation main data
export interface NavMain {
  title: string;
  url: string;
}

export const teams: Team[] = [
  {
    name: "Acme Inc",
    logo: "",
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: "",
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: "",
    plan: "Free",
  },
];

export const navMain: NavMain[] = [
  {
    title: "แดชบอร์ด",
    url: "#",
  },
  {
    title: "โปรเจค/มินิโปรเจค",
    url: "#",
  },
  {
    title: "ฟีเจอร์/ระบบ",
    url: "#",
  },
  {
    title: "โน้ต",
    url: "#",
  },
  {
    title: "ผังงาน",
    url: "#",
  },
];
