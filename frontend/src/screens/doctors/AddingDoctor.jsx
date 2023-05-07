import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function AddingDoctor(props) {
  return (
    <Container >
      <h2> Add New Doctor</h2>
    <Form>
        <Row>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"  />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name </Form.Label>
                <Form.Control type="text"  />
            </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

        <Form.Label>Phone Number</Form.Label>
        <Form.Select aria-label="Default select example"  >
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
        </Form.Group>
        </Col>
      <Col sm={12} md={6} lg={4}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number"  />
      </Form.Group>
      </Col>
      <Col sm={12} md={6} lg={4}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      </Col>
      </Row>

 

      

   
    </Form>

    </Container>
  )
}
