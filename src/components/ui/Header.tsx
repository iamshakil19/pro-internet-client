"use client";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/authApi";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const { data } = useGetMeQuery({});
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <p
          style={{
            margin: "0px 5px",
          }}
        >
          <span className="text-base font-medium">{data?.name}</span>
        </p>
        <Dropdown menu={{ items }}>
          <a>
            <Image
              alt=""
              width={35}
              height={35}
              className="rounded-full ml-3"
              src={data?.image ? data?.image : avatar}
            />
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
