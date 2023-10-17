import { redirect } from "next/navigation";
import React from "react";

const UserPage = () => {
  return redirect("/profile");
};

export default UserPage;
