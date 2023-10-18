import { USER_ROLE } from "./role";

export const NavbarItems = (role: string) => {
  const UserItems = [
    {
      label: <span>Home</span>,
      href: `/`,
      key: `/`,
    },
    {
      label: <span>Services</span>,
      href: `/${role}/services`,
      key: `/${role}/services`,
    },
    {
      label: <span>Dashboard</span>,
      href: `/${role}/dashboard`,
      key: `/${role}/dashboard`,
    },
    {
      label: <span>Feedbacks</span>,
      href: `/${role}/feedback`,
      key: `/${role}/feedback`,
    },
    {
      label: <span>Blogs</span>,
      href: `/${role}/blogs`,
      key: `/${role}/blogs`,
    },
    {
      label: <span>profile</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
    {
      label: <span>Give A Feedback</span>,
      href: `/${role}/post-feedback`,
      key: `/${role}/post-feedback`,
    },
  ];

  const AdminItems = [
    {
      label: <span>Dashboard</span>,
      href: `/${role}/dashboard`,
      key: `/${role}/dashboard`,
    },
    {
      label: <span>User Management</span>,
      href: `/${role}/management/user`,
      key: `/${role}/management/user`,
    },
    {
      label: <span>Service Management</span>,
      href: `/${role}/management/service`,
      key: `/${role}/management/service`,
    },
    {
      label: <span>Booking Management</span>,
      href: `/${role}/management/booking`,
      key: `/${role}/management/booking`,
    },
    {
      label: <span>Content Management</span>,
      href: `/${role}/management/content`,
      key: `/${role}/management/content`,
    },
    {
      label: <span>profile Management</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
  ];

  const SuperAdminItems = [
    {
      label: <span>profile Management</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
    {
      label: <span>Manage Admins</span>,
      href: `/${role}/management/admin`,
      key: `/${role}/management/admin`,
    },
  ];

  if (role === USER_ROLE.USER) return UserItems;
  else if (role === USER_ROLE.ADMIN) return AdminItems;
  else if (role === USER_ROLE.SUPER_ADMIN) return SuperAdminItems;
};
