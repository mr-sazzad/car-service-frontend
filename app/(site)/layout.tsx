"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Loading from "../loading";
import { isLoggedIn } from "../utils/auth";

const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [userLoggedIn, router]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
