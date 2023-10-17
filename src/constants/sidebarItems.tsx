import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  ContainerOutlined,
  BookOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/package`}>Package</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/package`,
    },
    {
      label: <Link href={`/${role}/booking`}>Booking</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/booking`,
    },
    {
      label: <Link href={`/${role}/feedback`}>Feedback</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/feedback`,
    },
    {
      label: <Link href={`/${role}/blog`}>Blog</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/blog`,
    },
    {
      label: <Link href={`/${role}/faq`}>FAQ</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/faq`,
    },
    {
      label: <Link href={`/${role}/users`}>Users</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/users`,
    },
    {
      label: <Link href={`/${role}/rating`}>Rating</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/rating`,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/booking-list`}>Booking List</Link>,
      icon: <BookOutlined />,
      key: `/${role}/booking-list`,
    },
    {
      label: <Link href={`/${role}/feedback`}>Feedback</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/feedback`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
