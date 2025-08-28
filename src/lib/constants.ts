import { PhBellSimple, PhFile, PhGear, PhHouse, PhLock, PhWarningOctagon } from "@phosphor-icons/vue";
import type { Theme } from "./models.ts";

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
    url: "/notifications",
    icon: PhBellSimple,
    group: 'Account'
  },
  {
    title: "404 Error",
    url: "/error404",
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

export const themes = [
  {
    name: 'slate',
    color: '215 16.3% 46.9%'
  },
  {
    name: 'stone',
    color: '25 5.3% 44.7%'
  },
  {
    name: 'gray',
    color: '220 8.9% 46.1%'
  },
  {
    name: 'neutral',
    color: '0 0% 45.1%'
  },
  {
    name: 'zinc',
    color: '240 5.9% 10%'
  },
  {
    name: 'red',
    color: '0 72.2% 50.6%'
  },
  {
    name: 'rose',
    color: '346.8 77.2% 49.8%'
  },
  {
    name: 'orange',
    color: '20.5 90.2% 48.2%'
  },
  {
    name: 'green',
    color: '142.1 70.6% 45.3%'
  },
  {
    name: 'blue',
    color: '217.2 91.2% 59.8%'
  },
  {
    name: 'yellow',
    color: '47.9 95.8% 53.1%'
  },
  {
    name: 'violet',
    color: '263.4 70% 50.4%'
  }
] as Theme[];