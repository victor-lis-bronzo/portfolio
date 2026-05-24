import { ReactNode } from "react";

export type ProjectsBaseProps = {
  children?: ReactNode;
  className?: string;
};

export type ProjectData = {
  id: string;
  title: string;
  techs: string[];
  imageUrl: string;
  link?: string;
};
