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

const axios = require('axios')
class DevicesAddPage extends React.Component {
  constructor(props) {
    super(props)
    this.values = {
      
      
      imei: null
    }
  }
  onSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:1234/devices/add', this.values)
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
                  <CardTitle tag="h5">Devices / Add</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col className="pr-1" md="10">
                        <FormGroup>
                          <label>IMEI</label>
                          <Input
                            onChange = {e => this.values.imei = e.target.value}
                            placeholder="IMEI"
                            type="text"
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

export default DevicesAddPage;
