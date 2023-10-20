"use client";
import { authKey } from "@/constants/storageKey";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showSidebarDrawer } from "@/redux/slice/sidebarSlice";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { MenuFoldOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Layout, Menu } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;

const Navbar = ({
  items,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
}) => {
  const userLoggedIn = isLoggedIn();
  const { email } = getUserInfo() as any;
  const { booking } = useAppSelector((state) => state.bookings);

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
      <div className="">
        <Header className="flex items-center border-b mx-auto">
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
            theme="dark"
            selectedKeys={[pathname]}
          >
            {items?.map((item) => (
              <Menu.Item key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
            <span
              onClick={() => router.push("/cart")}
              className="mx-2 cursor-pointer"
            >
              <Badge count={booking?.length}>
                <ShoppingCartOutlined className="text-xl" />
              </Badge>
            </span>

            {userLoggedIn ? (
              <>
                <span className="mr-2">
                  <Menu.Item>
                    <Link href="/profile">Dashboard</Link>
                  </Menu.Item>
                </span>

                <Menu.Item
                  style={{ color: "red" }}
                  onClick={() => {
                    logOut();
                  }}
                >
                  Log Out
                </Menu.Item>
              </>
            ) : (
              <Menu.Item
                style={{ color: "blue" }}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Menu.Item>
            )}
          </Menu>

          <div className="lg:hidden">
            <button
              onClick={showDrawer}
              className="bg-blue-500 text-white px-4 rounded-md text-base py-1"
            >
              <MenuFoldOutlined />
            </button>
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
              <span
                onClick={() => router.push("/cart")}
                className="mx-2 cursor-pointer"
              >
                <Badge count={booking?.length}>
                  <ShoppingCartOutlined className="text-xl" />
                </Badge>
              </span>
              {userLoggedIn ? (
                <>
                  <span className="mr-2">
                    <Menu.Item>
                      <Link href="/profile">Dashboard</Link>
                    </Menu.Item>
                  </span>
                  {/* <span className="mr-2">
                    <Menu.Item>
                      <Link href="/profile" style={{color: "red"}}>Log Out</Link>
                    </Menu.Item>
                  </span> */}

                  <Menu.Item>
                    <Link
                      onClick={() => {
                        logOut();
                      }}
                      style={{ color: "red" }}
                      href="/profile"
                    >
                      Log Out
                    </Link>
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  <Link
                    onClick={() => {
                      router.push("/login");
                    }}
                    style={{ color: "blue" }}
                    href="/login"
                  >
                    Login
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          </Drawer>
        </Header>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
