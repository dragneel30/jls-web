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

class BusesPage extends React.Component {
    state = {
      buses: []
    }
    
    componentDidMount() {
      axios.get(`${process.env.REACT_APP_HTTP_SERVER}/buses/`)
        .then(res => {
          const buses = res.data.data;
          this.setState({ buses });
        })
        .catch(console.log)
    }
  
  render() {
    return (
      <>
        <div className="content">
          <Row>
              <Col>
                <h4>Buses</h4>
              </Col>
              <Col>
              
                 <div className="float-right">
                 
                 <NavLink
                    to={'/admin/buses/add'}
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
                        <th>Name</th>
                        <th>Plate Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    {
                            this.state.buses.map( bus => {
                              return (
                               <tr key={bus.id}>
                                 <td>{bus.name}</td>
                                 <td>{bus.plate_no}</td>
                                 <td>
                                  <NavLink
                                      to={{
                                        pathname: `/admin/buses/edit/${bus.id}?id=${bus.id}&name=${bus.name}&plate_no=${bus.plate_no}`,
                                      
                                        current_values: {
                                          bus_name: bus.name,
                                          plate_no: bus.plate_no
                                        }
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

export default BusesPage;
