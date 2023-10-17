import { getUserInfo } from "@/services/auth.service";
import React from "react";

const FeedbackList = () => {
    const {email} = getUserInfo() as any
    console.log(email);
    
  return <div>this is feedback list {email} </div>;
};

export default FeedbackList;
