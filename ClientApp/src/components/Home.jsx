import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      totalImages: 0,
      crewSize: 0,
      result: 0
    };
  }

  processResult() {
    var timeToOneUnitOfWork = 0;
    for (var i = 1; i <= this.state.crewSize; i++) {
      timeToOneUnitOfWork += 1 / this.state["crew" + i];  
    }

    var totalTime = this.state.totalImages / timeToOneUnitOfWork;
    this.setState({
      "result" : totalTime
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, function() {
      this.processResult();
    });
  }

  renderCrewDetails() {
    var rows = [];
    for (var i = 1; i <= this.state.crewSize; i++) {
      rows.push(
        <Form.Group as={Col} controlId={"formGridCrew" + i} key={i}>
          <Form.Label>In how much time the crew person #{i} completes one image</Form.Label>
          <Form.Control type="number" name={"crew" + i} placeholder="Completion Time" onChange={e => this.handleChange(e)} />
        </Form.Group>
      );
    }

    return rows;
  }

  render() {
    return (
      <React.Fragment>
        <Alert variant="success">
          <Alert.Heading>Here is the result</Alert.Heading>
          <p>
            {this.state.totalImages} images would take {this.state.result} minutes to complete
          </p>
        </Alert>

        <Form>
          <Form.Group controlId="formGroupImages">
            <Form.Label>Total Images to be processed</Form.Label>
            <Form.Control type="number" name="totalImages" placeholder="Please enter total images" onChange={e => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="formGroupCrew">
            <Form.Label>Crew Size</Form.Label>
            <Form.Control type="number" name="crewSize" placeholder="Please enter crew size" onChange={e => this.handleChange(e)} />
          </Form.Group>
          {this.renderCrewDetails()}
          
        </Form>

        <br />

        
      </React.Fragment>
    );
  }
}
