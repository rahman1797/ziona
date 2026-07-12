"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";

export function useAnalytics() {
  useEffect(() => {
    void initAnalytics();
  }, []);
}
