"use client";

import { useGetAllFeedbackQuery } from "@/redux/api/feedbackApi";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";
import dayjs from "dayjs";
import PITable from "@/components/ui/Table";
const FeedbackComponents = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const { data, isLoading } = useGetAllFeedbackQuery({ ...query });

  const columns = [
    {
      title: "Name",
      dataIndex: "user",
      sorter: false,
      render: (user: any) => user.name,
    },
    {
      title: "Description",
      dataIndex: "desc",
      sorter: false,
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
    <PITable
      loading={isLoading}
      columns={columns}
      dataSource={data?.feedback}
      pageSize={size}
      totalPages={data?.meta?.total}
      showSizeChanger={true}
      onPaginationChange={onPaginationChange}
      onTableChange={onTableChange}
      showPagination={true}
    />
  );
};

export default FeedbackComponents;
