"use client";

import AddBlog from "@/components/Blog/AddBlog";
import PIModal from "@/components/ui/Modal";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";

const BlogPage = () => {
  const query: Record<string, any> = {};
  // const [deletePackage] = useDeletePackageMutation();
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
  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          onClick={() => setAddBlogModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Package
        </button>
      </div>

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={addBlogModal}
        closeModal={() => setAddBlogModal(false)}
        title="Add Blog"
      >
        <AddBlog setAddBlogModal={setAddBlogModal} />
      </PIModal>
    </div>
  );
};

export default BlogPage;
