import { FC } from "react";
import Store from "./views/store";
import Library from "./views/library";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import LibraryMusicTwoToneIcon from "@mui/icons-material/LibraryMusicTwoTone";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import Profile from "./views/profile";

interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  icon: typeof ShoppingBagTwoToneIcon;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    icon: ShoppingBagTwoToneIcon,
    component: Store,
  },
  {
    key: "library-route",
    title: "Library",
    path: "library",
    enabled: true,
    icon: LibraryMusicTwoToneIcon,
    component: Library,
  },
  {
    key: "profile-route",
    title: "Profile",
    path: "profile",
    enabled: true,
    icon: AssignmentIndTwoToneIcon,
    component: Profile,
  },
];
