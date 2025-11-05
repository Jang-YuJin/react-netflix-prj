import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const Error = ({error, resetErrorBoundary}) => {
  return (
    <Alert key={'danger'} variant={'danger'}>
      <p>{error?.message}</p>
      <hr></hr>
      <div className="d-flex justify-content-end">
        <Button variant="danger" size='m' onClick={resetErrorBoundary}>Refresh</Button>
      </div>
    </Alert>
  )
}

export default Error
