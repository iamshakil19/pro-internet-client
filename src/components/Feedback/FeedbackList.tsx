"use client";

import { useGetAllFeedbackQuery } from "@/redux/api/feedbackApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const FeedbackList = ({ email }: any) => {

  const { data } = useGetAllFeedbackQuery({ email: email });
  return <div>this is feedback list</div>;
};

export default FeedbackList;
