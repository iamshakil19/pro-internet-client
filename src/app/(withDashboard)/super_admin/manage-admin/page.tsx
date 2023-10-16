"use client";

import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Button, Select, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import PITable from "@/components/ui/Table";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import PIModal from "@/components/ui/Modal";

const ManageAdmin = () => {
  const query: Record<string, any> = {};
  const [deleteUser] = useDeleteUserMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

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

  const { data, isLoading } = useGetAllUserQuery({ ...query });

  const handleChange = (value: string) => {
    console.log(value);
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
      dataIndex: "access",
      render: function (access: any) {
        return (
          <Select
            defaultValue={access}
            status={`${!access ? "error" : ""}`}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: true, label: "Active" },
              { value: false, label: "Disable" },
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
              // onClick={() => setUpdateData(data)}
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          // onClick={() => setAddPackageModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Admin
        </button>
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
      {/*
      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={addPackageModal}
        closeModal={() => setAddPackageModal(false)}
        title="Add Package"
      >
        <AddPackage setAddPackageModal={setAddPackageModal} />
      </PIModal>

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={updateData}
        closeModal={() => setUpdateData(null)}
        title="Edit Package"
      >
        <EditPackage updateData={updateData} setUpdateData={setUpdateData} />
      </PIModal> */}
    </div>
  );
};

export default ManageAdmin;
