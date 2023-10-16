"use client";

import { Button, Input, message } from "antd";
import PITable from "@/components/ui/Table";
import { useDebounced } from "@/redux/hooks";
import { useState } from "react";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  useDeletePackageMutation,
  useGetAllPackageQuery,
} from "@/redux/api/packageApi";
import PIModal from "@/components/ui/Modal";
import AddPackage from "@/components/Package/AddPackage";
import EditPackage from "@/components/Package/EditPackage";
import { useGetMeQuery } from "@/redux/api/authApi";

const Package = () => {
  const query: Record<string, any> = {};
  const [deletePackage] = useDeletePackageMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [addPackageModal, setAddPackageModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
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

  const { data, isLoading } = useGetAllPackageQuery({ ...query });

  const deleteHandler = async (id: string) => {
    message.loading({
      key: "deletePackage",
      content: "Deleting...",
    });
    try {
      const res = await deletePackage(id);
      if (res) {
        message.success({
          key: "deletePackage",
          content: "Successfully deleted",
        });
        setOpen(false);
        setDeleteId("");
      }
    } catch (err: any) {
      message.error({
        key: "deletePackage",
        content: err.message,
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "RenewsFee",
      dataIndex: "renewsFee",
      sorter: true,
      responsive: ["lg"],
    },
    {
      title: "Storage",
      dataIndex: "storage",
      sorter: true,
    },
    {
      title: "Bandwidth",
      dataIndex: "bandwidth",
      sorter: true,
      responsive: ["lg"],
    },
    {
      title: "Website",
      dataIndex: "website",
      sorter: true,
    },
    {
      title: "CPU",
      dataIndex: "cpu",
      sorter: true,
    },
    {
      title: "Physical Memory",
      dataIndex: "physicalMemory",
      sorter: true,
      responsive: ["lg"],
    },
    {
      title: "Process",
      dataIndex: "process",
      sorter: true,
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          onClick={() => setAddPackageModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Package
        </button>
      </div>
      <PITable
        loading={isLoading}
        columns={columns}
        dataSource={data?.package}
        pageSize={size}
        totalPages={data?.meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <PIModal
        title="Delete Package"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(deleteId)}
      >
        <p className="text-orange-500">Do you want to delete this package ?</p>
      </PIModal>

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
      </PIModal>
    </div>
  );
};

export default Package;
