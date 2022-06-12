import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <AiIcons.AiFillHome color="black" />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/admin/report",
    icon: <AiIcons.AiOutlineContainer color="black" />,
    cName: "nav-text",
  },
  {
    title: "Instructor",
    path: "/admin/instructor",
    icon: <AiIcons.AiOutlineTeam color="black" />,
    cName: "nav-text",
  },
  {
    title: "Master user",
    path: "/admin/master",
    icon: <AiIcons.AiOutlineControl color="black" />,
    cName: "nav-text",
  },
  {
    title: "Dirbushment",
    path: "/admin/dirbushment",
    icon: <AiIcons.AiFillBank color="black" />,
    cName: "nav-text",
  },
];
