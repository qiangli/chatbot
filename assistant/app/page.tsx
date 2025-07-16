"use client";

import React from "react";
import { Assistant } from "./assistant";

export default function Home() {
  React.useEffect(() => {
    // Client-side code here
    console.log("Page loaded");
  }, []);

  return (
    <>
      <Assistant />
    </>
  );
}
