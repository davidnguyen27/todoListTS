import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Slide, toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { Todo } from '../../types/types';

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addTodo: (newTodo: Todo) => void;
}

const ModalCreate: React.FC<ModalCreateProps> = ({ isOpen, setIsOpen, addTodo }) => {
  const [todoName, setTodoName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleClose = () => setIsOpen(false);

  const handleAdd = () => {
    const newTodo: Todo = {
      id: uuid(),
      todoName,
      start: date,
      status: false,
      note,
    };
    addTodo(newTodo);
    handleClose();
    toast.success('Create successful', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
      transition: Slide,
    });
    setTodoName('');
    setDate(new Date().toISOString().split('T')[0]);
    setNote('');
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Todo Name</Form.Label>
            <Form.Control
              type="text"
              value={todoName}
              placeholder="Todo name"
              onChange={(e) => setTodoName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Created Date</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" value={note} onChange={(e) => setNote(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreate;
