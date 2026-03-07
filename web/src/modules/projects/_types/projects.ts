import { ReactNode } from "react";

export type ProjectsBaseProps = {
  children?: ReactNode;
  className?: string;
};

export type ProjectData = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
};
