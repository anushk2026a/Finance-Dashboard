"use client";

import dynamic from "next/dynamic";

export const DynamicCharts = dynamic(
  () => import("./Charts").then((mod) => mod.Charts),
  { ssr: false }
);
