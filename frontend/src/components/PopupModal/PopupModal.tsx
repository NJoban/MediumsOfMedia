import React from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import CreateForm from '../CreateForm/CreateForm'

interface PopupModalProps {
    size: ModalProps["size"];
    onHide: (() => void) | undefined;
    show: boolean;
    titleText: String;
}

const PopupModal = ({
    size,
    onHide,
    show,
    titleText,

}: PopupModalProps) => {
    return (
        <div>
            <Modal
                size={size}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>
                            {titleText}
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateForm
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PopupModal