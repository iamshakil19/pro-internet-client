"use client";
import { authKey } from "@/constants/storageKey";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showSidebarDrawer } from "@/redux/slice/sidebarSlice";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { MenuOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Typography } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

const Navbar = ({
  items,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
}) => {
  const userLoggedIn = isLoggedIn();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout className="layout">
      <div className="bg-white">
        <Header className="flex items-center border-b container mx-auto">
          {/* {hasSider && (
          <Button
            type="primary"
            className="lg:hidden"
            onClick={() => {
              dispatch(showSidebarDrawer());
            }}
          >
            <MenuOutlined />
          </Button>
        )} */}
          <Content>
            <Link href="/">
              <p
                className={`m-0 text-blue-500 text-2xl font-bold ${
                  hasSider && "text-center lg:text-left"
                }`}
              >
                Pro Internet
              </p>
            </Link>
          </Content>
          <Menu
            className="lg:block hidden"
            disabledOverflow
            mode="horizontal"
            selectedKeys={[pathname]}
          >
            {items?.map((item) => (
              <Menu.Item key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}

            {userLoggedIn ? (
              <button
                onClick={() => {
                  logOut();
                }}
                className="bg-red-500 px-4 text-white rounded-md font-semibold"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="bg-blue-500 px-4 text-white rounded-md font-semibold"
              >
                Login
              </button>
            )}
          </Menu>

          <div className="lg:hidden">
            <Button type="primary" onClick={showDrawer}>
              <MenuFoldOutlined />
            </Button>
          </div>
          <Drawer
            title="Menu"
            placement="left"
            onClose={onClose}
            visible={open}
          >
            <Menu
              theme="light"
              mode="vertical"
              selectedKeys={[pathname]}
              style={{ borderRight: 0 }}
            >
              {items?.map((item) => (
                <Menu.Item key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </Header>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
