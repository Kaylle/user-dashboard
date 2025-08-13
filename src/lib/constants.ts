import { PhBellSimple, PhFile, PhGear, PhHouse, PhLock, PhWarningOctagon } from "@phosphor-icons/vue";
import type { Color } from "./models.ts";

export const navMenu = [
  {
    title: "Home",
    url: "/",
    icon: PhHouse,
    group: 'Main'
  },
  {
    title: "Login",
    url: "/login",
    icon: PhLock,
    group: 'Others'
  },
  {
    title: "Empty page",
    url: "/page",
    icon: PhFile,
    group: 'Main'
  },
  {
    title: "Settings",
    url: "/settings",
    icon: PhGear,
    group: 'Account'
  },
  {
    title: "Notifications",
    url: "/page",
    icon: PhBellSimple,
    group: 'Account'
  },
  {
    title: "404 Error",
    url: "/page",
    icon: PhWarningOctagon,
    group: 'Others'
  }
];

export const settingsNavItems = [
  {
    title: 'Profile',
    href: '/settings/profile'
  },
  {
    title: 'Appearance',
    href: '/settings/appearance'
  }
];

export const userColumns = [
  {
    label: "User",
    value: "fullName",
    isVisible: true,
    type: "avatar",
    sortable: true,
    sortMode: 0
  },
  {
    label: "Position",
    value: "position",
    isVisible: true,
    type: "string",
    sortable: true,
    sortMode: 0
  },
  {
    label: "Status",
    value: "status",
    isVisible: true,
    type: "tag"
  },
  {
    label: "Email",
    value: "email",
    isVisible: true,
    type: "email",
    sortable: true,
    sortMode: 0
  },
  {
    label: "Phone",
    value: "phone",
    isVisible: true,
    type: "phone",
    sortable: true,
    sortMode: 0
  }
];

export const allColors: Color[] = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet',
];