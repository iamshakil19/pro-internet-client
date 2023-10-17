"use client";

import { useGetAllFeedbackQuery } from "@/redux/api/feedbackApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const FeedbackList = ({ email }: any) => {
  const { data } = useGetAllFeedbackQuery({});

  const { feedback } = data || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {feedback?.map((item: any) => (
        <div className="w-full bg-white p-3 rounded-lg shadow-lg max-w-xs mx-0">
          {item.desc}
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
