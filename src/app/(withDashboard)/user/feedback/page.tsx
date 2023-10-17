import FeedbackList from "@/components/Feedback/FeedbackList";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const FeedbackPage = () => {
  const user = getUserInfo() as any;

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          // onClick={() => setAddPackageModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Package
        </button>
      </div>
      <FeedbackList />
    </div>
  );
};

export default FeedbackPage;
