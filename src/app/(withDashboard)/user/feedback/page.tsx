"use client";

import AddFeedback from "@/components/Feedback/AddFeedback";
import FeedbackList from "@/components/Feedback/FeedbackList";
import PIModal from "@/components/ui/Modal";
import { useGetAllFeedbackQuery } from "@/redux/api/feedbackApi";
import { getUserInfo } from "@/services/auth.service";
import React, { useState } from "react";

const FeedbackPage = () => {
  const { email } = getUserInfo() as any;

  const [addFeedbackModal, setAddFeedbackModal] = useState<boolean>(false);
  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          onClick={() => setAddFeedbackModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Feedback
        </button>
      </div>
      <FeedbackList email={email} />

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={addFeedbackModal}
        closeModal={() => setAddFeedbackModal(false)}
        title="Add Feedback"
      >
        <AddFeedback setAddFeedbackModal={setAddFeedbackModal} />
      </PIModal>
    </div>
  );
};

export default FeedbackPage;
