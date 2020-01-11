/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import BusesPage from "views/BusesPage.js";
import DriversPage from "views/DriversPage.js"
import DevicesPage from "views/DevicesPage.js"
import DevicesAddPage from "views/DevicesAddPage.js"
import UserPage from "views/User.jsx";
import UpgradeToPro from "views/Upgrade.jsx";
import { ModuleResolutionKind } from "typescript";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Dashboard",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/buses",
    name: "Buses",
    icon: "nc-icon nc-caps-small",
    component: BusesPage,
    layout: "/admin"
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "nc-icon nc-caps-small",
    component: DriversPage,
    layout: "/admin"
  },
  {
    path: "/devices",
    name: "Devices",
    icon: "nc-icon nc-caps-small",
    component: DevicesPage,
    layout: "/admin"
  }
];

export default routes;
