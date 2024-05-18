import { iconClasses } from "@mui/material";
import {
  IconFolders,
  IconTimeline,
  IconUser,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
 
  {
    navlabel: true,
    subheader: "Référentiel",
  },
  {
    id: uniqueId(),
    title: "Enseignants",
    icon: IconUser,
    href: "/admin",
  },
  {
    id: uniqueId(),
    title: "Étudiants",
    icon: IconUsers,
    href: "/admin/etudiants",
  },
  {
    id: uniqueId(),
    title: "Classes",
    icon: IconUsersGroup,
    href: "/admin/classes",
  },
  {
    id: uniqueId(),
    title: "Matiéres",
    icon: IconFolders,
    href: "/admin/matieres",
  },
  {
    id: uniqueId(),
    title: "Planiﬁcation",
    icon: IconTimeline,
    href: "/admin/planification",
  }

];

export default Menuitems;
