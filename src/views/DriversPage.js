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

class DriversPage extends React.Component {
  state = {
    drivers: []
  }
  
  componentDidMount() {


    axios.get(`${process.env.REACT_APP_HTTP_SERVER}/drivers/`)
      .then(res => {
        const drivers = res.data.data;
        this.setState({ drivers });
        console.log(drivers)
      })
      .catch(console.log)
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
              <Col>
                <h4>Drivers</h4>
              </Col>
              <Col>
              
                 <div className="float-right">
                 
                 <NavLink
                    to={'/admin/drivers/add'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                        </NavLink>
                    </div>
            </Col>
            </Row>
              <Card className="card-plain">
                <CardBody>
                 <div style={{overflow: 'auto', height: 550}}>
                 <table class="table">
                    <thead className="text-primary">
                      <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Assigned bus</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                    {
                            this.state.drivers.map( driver => {
                              return (
                               <tr key={driver.id}>
                                 <td>{driver.picture}</td>
                                 <td>{driver.name}</td> 
                                 <td>{`${driver.bus_name ? `${driver.bus_name} / ` : '' }${driver.plate_no ? driver.plate_no : ''}`}</td>
                                
                                 <td>
                                  <NavLink
                                      to={{
                                        pathname: `/admin/drivers/edit/${driver.id}?id=${driver.id}&plate_no=${driver.plate_no}&bus_id=${driver.bus_id}&bus_name=${driver.bus_name}&name=${driver.name}`,
                                      
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
          
        </div>
      </>
    );
  }
}

export default DriversPage;
