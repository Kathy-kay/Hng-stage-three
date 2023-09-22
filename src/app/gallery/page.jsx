/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect } from "react";
import GetImages from "../component/GetImages";
import Navbar from "../component/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      toast.error("You are not logged in", {
        autoClose: 5000,
        onClose: () => {
          router.push("/");
        },
      });
    }
  }, [session, router]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <GetImages />
    </div>
  );
};

export default page;
