export const navMenu = [
  {
    title: "Home",
    url: "/",
    icon: "PhHouse",
    group: 'Main'
  },
  {
    title: "Login",
    url: "/login",
    icon: "PhLock",
    group: 'Others'
  },
  {
    title: "Empty page",
    url: "/page",
    icon: "PhFile",
    group: 'Main'
  },
  {
    title: "Settings",
    url: "/page",
    icon: "PhFile",
    group: 'Account'
  },
  {
    title: "Notifications",
    url: "/page",
    icon: "PhFile",
    group: 'Account'
  },
  {
    title: "404 Error",
    url: "/page",
    icon: "PhFile",
    group: 'Others'
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