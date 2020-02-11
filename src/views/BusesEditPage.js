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

class BusesEditPage extends React.Component {
  state = {
    current_values: {
      id: 0,
      name: '',
      plate_no: ''
    }
  }

  constructor(props) {
    super(props)
    
  }
  
  componentDidMount() {
    
    let search = window.location.search;
    let params = new URLSearchParams(search); 

    this.setState({current_values: { id: params.get('id'), name: params.get('name'), plate_no: params.get('plate_no')}})
  }
  onSubmit = (e) => {
    e.preventDefault()

    console.log(this.state.current_values)
    axios.post(`${process.env.REACT_APP_HTTP_SERVER}/buses/edit`, this.state.current_values)
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
    return (
      <>
        <div className="content">
          <Row>
            <Col md="5">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Buses / Edit</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col className="pr-1" md="10">
                       
                        <FormGroup>
                            
                          <label>Name</label>
                          <Input
                            onChange={e => this.setState({current_values: {...this.state.current_values, name: e.target.value}})}   
                            placeholder="Name"
                            type="text"
                            value={this.state.current_values.name}
                            
                          />
                          <label>Plate number</label>
                          <Input
                            onChange={e => this.setState({current_values: {...this.state.current_values, plate_no: e.target.value}})}  
                            placeholder="Plate number"
                            type="text"
                            value={this.state.current_values.plate_no}
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

export default BusesEditPage;
