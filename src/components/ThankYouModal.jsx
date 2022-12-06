import React from "react";
import { Modal, Button } from "react-bootstrap"

const ThankYouModal = (props) => {
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Payment Success
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Thank you!</h4>
          <p>
            Makasiih ya
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ThankYouModal