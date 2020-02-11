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

class DriversAddPage extends React.Component {

  state = {
    imagePreview: 0
  }
  constructor(props) {
    super(props)
    
    this.values = {
      name: null
    }
  }
  onSubmit = (e) => {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_HTTP_SERVER}/drivers/add`, this.values)
    .then(response => {

      console.log(response) 
      if (response.data.error) {

      } else {
        this.props.history.goBack()
      }
    })
    .catch(console.log)

    const formData = new FormData()

    formData.append('image', this.file)
    formData.append('test', 'sadasd')

    fetch(`${process.env.REACT_APP_HTTP_SERVER}/upload?test=1`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      console.log(images)
    })
  }
  handleClick = e => {
    this.refs.fileUploader.click();
  }
  onChangeFile = e => {

    this.file = e.target.files[0]
    this.setState({imagePreview: URL.createObjectURL(this.file)})
    

  }
  render() {
    return (
      <>
        <div className="content">
        <input type="file" id="file" ref="fileUploader" style={{display: "none"}} 
        
          onChange={this.onChangeFile}/>
          <Row>
            <Col md="5">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Drivers / Add</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}> 
                    <Row>
                      <Col className="pr-1" md="10">
                        <FormGroup>
                          <label>Picture</label>
                            
                          <div className="avatar" onClick={this.handleClick}>
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={this.state.imagePreview ? this.state.imagePreview : require("assets/img/faces/joe-gardner-2.jpg")}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            onChange={e => { this.values.name = e.target.value }}
                            placeholder="Name"
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
                      {/* <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div> */}
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

export default DriversAddPage;
