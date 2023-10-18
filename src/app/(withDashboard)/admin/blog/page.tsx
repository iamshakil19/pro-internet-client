'use client'

import { useDebounced } from '@/redux/hooks';
import React, { useState } from 'react';

const BlogPage = () => {
    const query: Record<string, any> = {};
    // const [deletePackage] = useDeletePackageMutation();
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
    return (
        <div>
            this is blog page
        </div>
    );
};

export default BlogPage;