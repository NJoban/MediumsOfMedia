import React from 'react'
import { Button, Form } from 'react-bootstrap'

const CreateForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Watching" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} type="text" placeholder="My TV Show Watch List" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check inline type="checkbox" label="All" />
        <Form.Check inline type="checkbox" label="Movies" />
        <Form.Check inline type="checkbox" label="TV Shows" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default CreateForm