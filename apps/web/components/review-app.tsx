"use client";

import dynamic from "next/dynamic";

const ReviewFrontend = dynamic(() => import("../src/App"), {
  ssr: false
});

export function ReviewApp() {
  return <ReviewFrontend />;
}
