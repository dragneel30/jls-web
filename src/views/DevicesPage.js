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
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { IconButton } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const axios = require('axios')

class DevicesPage extends React.Component {
    state = {
      devices: []
    }
    
    componentDidMount() {
      axios.get(`http://210.14.16.68:1234/devices/`)
        .then(res => {
          const devices = res.data.data;
          this.setState({ devices });
        })
        .catch(console.log)
    }
  render() {
    return (
      <>
        <div className="content">
          <Row>
              <Col>
                <h4>Devices</h4>
              </Col>
              <Col>
              
                 <div className="float-right">
                 
                 <NavLink
                    to={'/admin/devices/add'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                        </NavLink>
                    </div>
            </Col>
            <Col md="12">
              <Card className="card-plain">
                <CardBody>
                 <div style={{overflow: 'auto', height: 550}}>
                 <table class="table">
                    <thead className="text-primary">
                      <tr>
                        <th>Imei</th>
                        <th>Assigned Bus</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.devices.map( device => {
                              return (
                               <tr key={device.id}>
                                 <td>{device.imei}</td>
                                 <td>{`${device.name ? `${device.name} / ` : '' }${device.plate_no ? device.plate_no : ''}`}</td>
                                 <td>
                                  <NavLink
                                      to={{
                                        pathname: `/admin/devices/edit/${device.id}?id=${device.id}&imei=${device.imei}&bus_id=${device.bus_id}&plate_no=${device.plate_no}&bus_name=${device.name}`
                                      }}
                                      className="nav-link"
                                      activeClassName="active">
                                      <IconButton style={{color:'#000000'}}>
                                        <EditIcon/>
                                      </IconButton>
                                  </NavLink>
                  
                                 </td>

                               </tr>   
                              )
                            })
                          }

                    </tbody>
                  </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          
        </div>
      </>
    );
  }
}

export default DevicesPage;
