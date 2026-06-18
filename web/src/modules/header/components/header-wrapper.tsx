"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface HeaderWrapperProps {
  children: React.ReactNode;
  pagesWithoutHeader: string[];
}

export default function HeaderWrapper({
  children,
  pagesWithoutHeader,
}: HeaderWrapperProps) {
  const pathname = usePathname();

  const shouldHideHeader = pagesWithoutHeader.some((page) => {
    const formattedPage = page.startsWith("/") ? page : `/${page}`;
    return (
      pathname === formattedPage || pathname.startsWith(`${formattedPage}/`)
    );
  });

  if (shouldHideHeader) {
    return null;
  }

  return <>{children}</>;
}
