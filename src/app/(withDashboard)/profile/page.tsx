"use client";
import { useGetMeQuery } from "@/redux/api/authApi";
import Image from "next/image";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import PIModal from "@/components/ui/Modal";
import EditProfile from "@/components/Profile/EditProfile";
const ProfilePage = () => {
  const { data } = useGetMeQuery({});
  const [updateData, setUpdateData] = useState<any>(null);
  return (
    <div className="max-w-2xl mt-10 lg:mt-20 mx-auto shadow-lg bg-white p-5 rounded-lg">
      <div className="flex justify-end">
        <button
          onClick={() => setUpdateData(data)}
          className="bg-blue-500 text-white font-medium px-5 text-base py-1 rounded-md"
        >
          Edit
        </button>
      </div>
      <div>
        <div>
          <Image
            src={data?.image}
            alt=""
            width={100}
            height={100}
            className="object-cover rounded-full shadow-lg"
          />
        </div>

        <div>
          <h2 className="mt-3 capitalize text-xl font-medium">{data?.name}</h2>
          <p className="text-base font-medium mt-1">
            <MailOutlined /> {data?.email}
          </p>
          <p className="text-base font-medium mt-1">
            <PhoneOutlined /> {data?.phone}
          </p>
          <p className="mt-5 text-base">
            Joined - {dayjs(data?.createdAt).format("MMM D, YYYY hh:mm A")}
          </p>
        </div>
      </div>

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={updateData}
        closeModal={() => setUpdateData(null)}
        title="Edit Profile"
      >
        <EditProfile updateData={updateData} setUpdateData={setUpdateData} />
      </PIModal>
    </div>
  );
};

export default ProfilePage;
