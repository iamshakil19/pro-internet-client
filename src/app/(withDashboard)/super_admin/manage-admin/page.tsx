"use client";

import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Button, Input, Select, Switch, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import PITable from "@/components/ui/Table";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import PIModal from "@/components/ui/Modal";
import { useUpdateProfileMutation } from "@/redux/api/authApi";
import CreateAdmin from "@/components/Admin/CreateAdmin";
import EditProfile from "@/components/Profile/EditProfile";

const ManageAdmin = () => {
  const query: Record<string, any> = {};
  const [deleteUser] = useDeleteUserMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [role, setRole] = useState<string>("admin");
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [createAdminModal, setCreateAdminModal] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<any>(null);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllUserQuery({ ...query, role });

  const handleAccess = async (value: any) => {
    message.loading({
      key: "updateProfile",
      content: "Updating...",
    });
    try {
      const res = await updateProfile({
        id: value?.id,
        body: { access: value?.access },
      });
      if (res) {
        message.success({
          key: "updateProfile",
          content: "Successfully updated",
        });
      }
    } catch (error: any) {
      message.error({
        key: "updateProfile",
        content: error.message,
      });
    }
  };

  const handleRole = async (value: any) => {
    message.loading({
      key: "updateProfile",
      content: "Updating...",
    });
    try {
      const res = await updateProfile({
        id: value?.id,
        body: { role: value?.role },
      });
      if (res) {
        message.success({
          key: "updateProfile",
          content: "Successfully updated",
        });
      }
    } catch (error: any) {
      message.error({
        key: "updateProfile",
        content: error.message,
      });
    }
  };

  const deleteHandler = async (id: string) => {
    message.loading({
      key: "deleteAdmin",
      content: "Deleting...",
    });
    try {
      const res = await deleteUser(id);
      if (res) {
        message.success({
          key: "deleteAdmin",
          content: "Successfully deleted",
        });
        setOpen(false);
        setDeleteId("");
      }
    } catch (err: any) {
      message.error({
        key: "deleteAdmin",
        content: err.message,
      });
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "image",
      render: function (data: any) {
        return (
          <Image
            className="rounded-full shadow-lg"
            src={data ? data : avatar}
            height={50}
            width={50}
            alt=""
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Access",
      render: function (data: any) {
        return (
          <Select
            defaultValue={data?.access}
            status={`${!data?.access ? "error" : ""}`}
            style={{ width: 120 }}
            onChange={(e) => {
              handleAccess({ access: e, id: data?.id });
            }}
            options={[
              { value: true, label: "Active" },
              { value: false, label: "Disable" },
            ]}
          />
        );
      },
    },
    {
      title: "Role",
      render: function (data: any) {
        return (
          <Select
            defaultValue={data?.role}
            style={{ width: 120 }}
            onChange={(e) => {
              handleRole({ role: e, id: data?.id });
            }}
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />
        );
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      responsive: ["lg"],
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex items-center">
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => setUpdateData(data)}
              type="primary"
              className="bg-blue-500"
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setOpen(true);
                setDeleteId(data?.id);
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const onChangeSwitch = (checked: boolean) => {
    if (!checked) {
      setRole("admin");
    } else {
      setRole("user");
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <div className="mb-5 flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-5">
          <Input
            type="text"
            size="large"
            value={searchTerm}
            placeholder="Search..."
            style={{
              width: "100%",
              maxWidth: "300px",
              margin: "5px 0px",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Switch title="See user list" onChange={onChangeSwitch} />
        </div>
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <button
              onClick={resetFilters}
              style={{ margin: "0px 5px" }}
              title="Reset Filters"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              <ReloadOutlined />
            </button>
          )}
          <button
            onClick={() => setCreateAdminModal(true)}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Create Admin
          </button>
        </div>
      </div>
      <PITable
        loading={isLoading}
        columns={columns}
        dataSource={data?.users}
        pageSize={size}
        totalPages={data?.meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <PIModal
        title="Delete Admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(deleteId)}
      >
        <p className="text-orange-500">Do you want to delete this admin ?</p>
      </PIModal>

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={createAdminModal}
        closeModal={() => setCreateAdminModal(false)}
        title="Create Admin"
      >
        <CreateAdmin setCreateAdminModal={setCreateAdminModal} />
      </PIModal>
      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={updateData}
        closeModal={() => setUpdateData(null)}
        title="Edit Profile"
      >
        <EditProfile updateData={updateData} setUpdateData={setUpdateData} />
      </PIModal>
    </div>
  );
};

export default ManageAdmin;
