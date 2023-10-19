"use client";

import AddBlog from "@/components/Blog/AddBlog";
import PIModal from "@/components/ui/Modal";
import PITable from "@/components/ui/Table";
import { useDeleteBlogMutation, useGetAllBlogQuery } from "@/redux/api/blogApi";
import { useDebounced } from "@/redux/hooks";
import { Button, message } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import EditBlog from "@/components/Blog/EditBlog";
const BlogPage = () => {
  const query: Record<string, any> = {};
  const [deleteBlog] = useDeleteBlogMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [addBlogModal, setAddBlogModal] = useState<boolean>(false);
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

  const { data, isLoading } = useGetAllBlogQuery({ ...query });

  const deleteHandler = async (id: string) => {
    message.loading({
      key: "deleteBlog",
      content: "Deleting...",
    });
    try {
      const res = await deleteBlog(id);
      if (res) {
        message.success({
          key: "deleteBlog",
          content: "Successfully deleted",
        });
        setOpen(false);
        setDeleteId("");
      }
    } catch (err: any) {
      message.error({
        key: "deleteBlog",
        content: err.message,
      });
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "image",
      sorter: false,
      render: (data: any) => (
        <Image
          src={data ? data : avatar}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          alt=""
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      render: (data: any) => <p style={{ maxWidth: "400px" }}> {data} </p>,
    },
    {
      title: "Description",
      dataIndex: "desc",
      // sorter: false,
      render: (data: any) => <p style={{ maxWidth: "600px" }}> {data} </p>,
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
          onClick={() => setAddBlogModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Blog
        </button>
      </div>

      <PITable
        loading={isLoading}
        columns={columns}
        dataSource={data?.blog}
        pageSize={size}
        totalPages={data?.meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <PIModal
        title="Delete Blog"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(deleteId)}
      >
        <p className="text-orange-500">Do you want to delete this blog ?</p>
      </PIModal>

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={addBlogModal}
        closeModal={() => setAddBlogModal(false)}
        title="Add Blog"
      >
        <AddBlog setAddBlogModal={setAddBlogModal} />
      </PIModal>

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={updateData}
        closeModal={() => setUpdateData(null)}
        title="Edit Blog"
      >
        <EditBlog updateData={updateData} setUpdateData={setUpdateData} />
      </PIModal>
    </div>
  );
};

export default BlogPage;
