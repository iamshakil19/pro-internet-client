"use client";

import PIModal from "@/components/ui/Modal";
import PITable from "@/components/ui/Table";
import {
  useDeleteBookingMutation,
  useGetAllBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";
import { Button, DatePicker, Input, Select, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import avatar from "@/assets/avatar.jpg";
import dayjs from "dayjs";
import FormDatePicker from "@/components/Forms/FormDatePicker";
const BookingComponents = () => {
  const query: Record<string, any> = {};
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [role, setRole] = useState<string>("admin");
  const [updateData, setUpdateData] = useState<any>(null);
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

  const { data, isLoading } = useGetAllBookingQuery({ ...query, role });

  const handleStatus = async (value: any) => {
    message.loading({
      key: "updateBooking",
      content: "Updating...",
    });
    try {
      const res = await updateBooking({
        id: value?.id,
        body: { status: value?.status },
      });
      if (res) {
        message.success({
          key: "updateBooking",
          content: "Successfully updated",
        });
      }
    } catch (error: any) {
      message.error({
        key: "updateBooking",
        content: error.message,
      });
    }
  };
  const handleStartDate = async (value: any) => {
    if (!value.startDate) {
      return;
    }
    const tempObject = { ...value };
    tempObject["startDate"] = dayjs(tempObject["startDate"]).toISOString();

    message.loading({
      key: "updateBooking",
      content: "Updating...",
    });
    try {
      const res = await updateBooking({
        id: value?.id,
        body: { startDate: tempObject.startDate },
      });
      if (res) {
        message.success({
          key: "updateBooking",
          content: "Successfully updated",
        });
      }
    } catch (error: any) {
      message.error({
        key: "updateBooking",
        content: error.message,
      });
    }
  };

  const deleteHandler = async (id: string) => {
    message.loading({
      key: "deleteBooking",
      content: "Deleting...",
    });
    try {
      const res = await deleteBooking(id);
      if (res) {
        message.success({
          key: "deleteBooking",
          content: "Successfully deleted",
        });
        setOpen(false);
        setDeleteId("");
      }
    } catch (err: any) {
      message.error({
        key: "deleteBooking",
        content: err.message,
      });
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "user",
      render: function (data: any) {
        return (
          <Image
            className="rounded-full shadow-lg"
            src={data?.image ? data?.image : avatar}
            height={50}
            width={50}
            alt=""
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "user",

      render: function (data: any) {
        return <span>{data?.name}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "user",

      render: function (data: any) {
        return <span>{data?.email}</span>;
      },
    },
    {
      title: "Phone",
      dataIndex: "user",

      render: function (data: any) {
        return <span>{data?.phone}</span>;
      },
    },
    {
      title: "Package Name",
      dataIndex: "package",

      render: function (data: any) {
        return <span className="capitalize">{data?.name}</span>;
      },
    },
    {
      title: "Price",
      dataIndex: "package",

      render: function (data: any) {
        return <span className="capitalize">{data?.price}</span>;
      },
    },
    {
      title: "Start Date",

      render: function (data: any) {
        return (
          data && (
            <DatePicker
              defaultValue={dayjs(data?.startDate)}
              onChange={(e) => {
                handleStartDate({ startDate: e, id: data?.id });
              }}
            />
          )
        );
      },
    },
    {
      title: "Status",
      render: function (data: any) {
        return (
          <Select
            defaultValue={data?.status}
            status={`${
              data?.status === "cancel"
                ? "error"
                : data?.status === "pending"
                ? "warning"
                : ""
            }`}
            style={{ width: 120 }}
            onChange={(e) => {
              handleStatus({ status: e, id: data?.id });
            }}
            options={[
              { value: "pending", label: "Pending" },
              { value: "accepted", label: "Accepted" },
              { value: "cancel", label: "Cancel" },
            ]}
          />
        );
      },
    },
    // {
    //   title: "CreatedAt",
    //   dataIndex: "createdAt",
    //   responsive: ["lg"],
    //   render: function (data: any) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
    // },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex items-center">
            {/* <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => setUpdateData(data)}
              type="primary"
              className="bg-blue-500"
            >
              <EditOutlined />
            </Button> */}
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
        </div>
      </div>
      <PITable
        loading={isLoading}
        columns={columns}
        dataSource={data?.booking}
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
        <p className="text-orange-500">Do you want to delete this booking ?</p>
      </PIModal>
    </div>
  );
};

export default BookingComponents;
