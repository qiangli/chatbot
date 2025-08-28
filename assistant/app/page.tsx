"use client";

import { useEffect } from "react";
import { useAuth } from "@/stores/auth-store";
import { Assistant } from "./assistant";
import { useMe } from "@/hooks/use-me";

export default function Home() {
  const navigateAuth = () => {
    window.location.href = "/signin";
  };

  const { setUser } = useAuth();
  const { user, loading } = useMe();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setUser(user);
      }
    };

    fetchUserData();
  }, [user, setUser]);

  if (loading) return null;

  if (!user) {
    navigateAuth();
    return null;
  }

  return (
    <>
      <Assistant />
    </>
  );
}
