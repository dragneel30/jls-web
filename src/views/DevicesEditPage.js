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
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

const axios = require('axios')

class DevicesEditPage extends React.Component {
  state = {
    available_buses: [],
    current_values: {
      id: 0,
      imei: '',
      bus_id: 0
    },
    selected_bus: {

    }
  }
  constructor(props) {
    super(props)

 
  }
  componentDidMount() {
    
    let search = window.location.search;
    let params = new URLSearchParams(search); 

    this.setState({current_values: {...this.state.current_values, id: params.get('id'),
     imei: params.get('imei'), bus_id: params.get('bus_id') }})
  
    axios.get('http://210.14.16.68:1234/buses/available', { params: { context: 'devices' } })
    .then(response => {
      let available_buses = [{
        id: params.get('bus_id'),
        name: params.get('bus_name'),
        plate_no: params.get('plate_no')
      }]
      
      available_buses = [...available_buses, ...response.data.data]

      this.setState({available_buses, selected_bus: available_buses[0]})
    })
    .catch(console.log);

  }
  
  onSubmit = (e) => {
    e.preventDefault()

    
    console.log(JSON.stringify(this.state.current_values))
    axios.post('http://210.14.16.68:1234/devices/edit', this.state.current_values)
    .then(response => {

      console.log(response) 
      if (response.data.error) {

      } else {
        this.props.history.goBack()
      }
    })
    .catch(console.log)

  }
  render() {
    
    let search = window.location.search;
    let params = new URLSearchParams(search); 

    return (
      <>
        <div className="content">
          <Row>
            <Col md="5">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Devices / Edit</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                  
                  <Row>
                      <Col className="pr-1" md="10">
                       
                        <FormGroup>
                        <label>IMEI</label>
                          <Input
                            
                            onChange={e => this.setState({current_values: {...this.state.current_values, imei: e.target.value}})}   
                            placeholder="IMEI"
                            type="text"
                            value={this.state.current_values.imei}
                          />

                  </FormGroup>
                         </Col>
                         </Row>

                    <Row>
                      <Col className="pr-1" md="10">
                       
                        <FormGroup>
                          <label>Assigned bus</label>
                      <Autocomplete
                      value={
                        this.state.selected_bus}
                        onChange={(event, value) => 
                          this.setState({
                            selected_bus: value,
                            current_values: {...this.state.current_values, bus_id: value.id }
                          })
                        }
                        options={this.state.available_buses}
                        getOptionLabel={option => `${option.name} / ${option.plate_no}`}
                        renderInput={params => {
                         // console.log(this.state.available_buses)

                          return (
                              <TextField {...params} label="Assign Bus" variant="outlined" fullWidth />
                            )
                        }}
                      />

                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        
                      <Col className="pl-3" md="10">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Save
                        </Button>
                      </Col>
                     
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default DevicesEditPage;
