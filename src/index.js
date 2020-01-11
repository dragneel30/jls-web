import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import {
  Marker,
  GoogleMap
} from '@react-google-maps/api';
import AdminLayout from "layouts/Admin.jsx";
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import BusesPage from "views/BusesPage.js";
import DriversPage from "views/DriversPage.js"
import DriversEditPage from "views/DriversEditPage.js"
import DriversAddPage from "views/DriversAddPage.js"
import DevicesPage from "views/DevicesPage.js"
import BusesAddPage from "views/BusesAddPage.js"
import BusesEditPage from "views/BusesEditPage.js"
import UserPage from "views/User.jsx";

import DevicesAddPage from "views/DevicesAddPage.js";
import DevicesEditPage from "views/DevicesEditPage.js";
const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" render={props => <AdminLayout {...props} />} />
      <Route exact path="/admin" render={props => <AdminLayout {...props} />} />
      

      <Route exact path="/admin/buses" render={props => 
          <AdminLayout {...props} component={<BusesPage {...props}></BusesPage>}/>
        }/>
        <Route exact path="/admin/maps" render={props => 
        
        <AdminLayout {...props} component={<Maps {...props}></Maps>}/>
          }/>
          <Route exact path="/admin/buses/add" render={props => 
              <AdminLayout {...props} component={<BusesAddPage {...props}></BusesAddPage>}/>
              }/>
              
      <Route exact path="/admin/buses/edit/:id" render={props => 
          <AdminLayout {...props} component={<BusesEditPage {...props}></BusesEditPage>}/>
          }/>
          <Route exact path="/admin/user-page" render={props => 
              <AdminLayout {...props} component={<UserPage {...props}></UserPage>}/>
              }/>
      <Route exact path="/admin/drivers" render={props => 
          <AdminLayout {...props} component={<DriversPage {...props}></DriversPage>}/>
          }/>
          
      <Route exact path="/admin/drivers/edit/:id" render={props => 
          <AdminLayout {...props} component={<DriversEditPage {...props}></DriversEditPage>}/>
          }/>
          
      <Route exact path="/admin/drivers/add" render={props => 
          <AdminLayout {...props} component={<DriversAddPage {...props}></DriversAddPage>}/>
          }/>
          <Route exact path="/admin/devices/add" render={props => 
            <AdminLayout {...props} component={<DevicesAddPage {...props}></DevicesAddPage>}/>
            }/>
            <Route exact path="/admin/devices/edit/:id" render={props => 
              <AdminLayout {...props} component={<DevicesEditPage {...props}></DevicesEditPage>}/>
              }/>
            <Route exact path="/admin/buses/BusesAddPage" render={props => 
              <AdminLayout {...props} component={<DevicesAddPage {...props}></DevicesAddPage>}/>
              }/>
              <Route exact path="/admin/devices" render={props => 
                <AdminLayout {...props} component={<DevicesPage {...props}></DevicesPage>}/>
                }/>

<Route exact path="/admin/notifications" render={props => 
            <AdminLayout {...props} component={<Notifications {...props}></Notifications>}/>
            }/>
    
        
     
    </Switch>
  </Router>,
  document.getElementById("root")
);
