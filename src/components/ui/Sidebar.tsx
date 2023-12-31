"use client";

import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const { Sider } = Layout;

const SideBar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const { role } = getUserInfo() as any;
  const router = useRouter();
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={270}
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed);
      }}
      className={`min-h-full bg-white`}
      style={{
        background: "white",
      }}
    >
      <div
        onClick={() => router.push("/")}
        className="text-black text-center font-bold text-xl p-3 mt-2 mb-5 cursor-pointer"
      >
        Pro Internet
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
