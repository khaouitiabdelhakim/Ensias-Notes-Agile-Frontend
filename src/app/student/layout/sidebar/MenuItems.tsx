import { iconClasses } from "@mui/material";
import {
  IconDashboard,
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
    subheader: "Principale",
  },
  {
    id: uniqueId(),
    title: "Accueil",
    icon: IconUser,
    href: "/student",
  },

];

export default Menuitems;
