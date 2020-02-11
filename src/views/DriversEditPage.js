
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
const qs = require('querystring')

class DriversEditPage extends React.Component {
  state = {
    available_buses: [],
    image: null,
    current_values: {
      id: 0,
      name: '',
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


    axios.get(`${process.env.REACT_APP_HTTP_SERVER}/buses/available`, { params: { context: 'drivers' } })
    .then(response => {
      let available_buses = [{
        id: params.get('bus_id'),
        name: params.get('bus_name'),
        plate_no: params.get('plate_no')
      }]
      
      available_buses = [...available_buses, ...response.data.data]

      this.setState({available_buses, selected_bus: available_buses[0], 
      current_values: { id: params.get('id'), name: params.get('name'), bus_id: params.get('bus_id')}})
    })
    .catch(console.log);

  }
  
  onSubmit = (e) => {
    e.preventDefault()

    // this.values.file = this.state.image
    
  //   const formData = new FormData()

  //   formData.append('file', this.state.image)
  //   let file = this.state.image;
  //   console.log(file)
  //   const config = {
  //     headers: {
  //         'content-type': 'multipart/form-data'
  //     }
  // }
  //   // axios.post("${process.env.REACT_APP_HTTP_SERVER}/upload", formData, config)
  //   // .then(response => { // then print response status
  //   //     console.log(response)
  //   // }).catch(console.log)

  //   fetch('${process.env.REACT_APP_HTTP_SERVER}/upload', {
  //     method: 'POST',
  //     headers: {
  //         'content-type': 'multipart/form-data'
  //     },
  //     body: formData
  //   }).then(
  //     response => response.json() // if the response is a JSON object
  //   ).then(
  //     success => console.log(success) // Handle the success response object
  //   ).catch(
  //     error => console.log(error) // Handle the error response object
  //   );
  console.log(this.state.current_values)
    axios.post(`${process.env.REACT_APP_HTTP_SERVER}/drivers/edit`, this.state.current_values)
    .then(response => {

      console.log(response) 
      if (response.data.error) {

      } else {
        this.props.history.goBack()
      }
    })
    .catch(console.log)

  }

  onChangeHandler = (e) => {
    
    const image = URL.createObjectURL(e.target.files[0])
    this.setState({image})
    
  }
  onImageClickedHandler = (e) => {

    this.refs.fileUploader.click();
  }
  render() {
    return (
      <>
        <div className="content">
          <input type="file" name="file" ref="fileUploader" accept="image/*" onChange={this.onChangeHandler} style={{display: "none"}}/>
          <Row>
            <Col md="5">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Drivers / Edit</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col className="pr-1" md="10">
                       
                        <FormGroup>
                        
                        <label>Picture</label>
                            
                            <div className="avatar" onClick={this.onImageClickedHandler}>
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={this.state.image == null ? require("assets/img/faces/joe-gardner-2.jpg") : this.state.image}
                              />
                            </div>
                            
                  </FormGroup>
                         </Col>
                         </Row>
                    <Row>
                      <Col className="pr-1" md="10">
                       
                        <FormGroup>
                        <label>Name</label>
                          <Input
                            value={this.state.current_values.name}
                            onChange={e => this.setState({current_values: {...this.state.current_values,
                               name: e.target.value}})} 
                            placeholder="Name"
                            type="text"
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

export default DriversEditPage;
