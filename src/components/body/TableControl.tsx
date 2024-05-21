import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import ModalUpdate from '../modal/ModalUpdate';
import { toast, Slide } from 'react-toastify';
import { Todo } from '../../types/types';
import { setTodosToLocal } from '../../utils/localStorageUtil';

interface TableControlProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TableControl: React.FC<TableControlProps> = ({ todos, setTodos }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Todo | null>(null);

  const handleOpenSelected = (todo: Todo) => {
    setIsOpen(true);
    setSelected(todo);
  };

  const handleStatusChange = (id: string) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : todo));
    setTodos(updatedTodos);
    setTodosToLocal(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const currentTodos = todos.filter((todo) => todo.id !== id);
    setTodos(currentTodos);
    setTodosToLocal(currentTodos);
    toast.success('Delete successful', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
      transition: Slide,
    });
  };

  const updateAction = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
    setTodos(updatedTodos);
    setTodosToLocal(updatedTodos);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Todo name</th>
            <th>Created date</th>
            <th>Status</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.todoName}</td>
              <td>{todo.start}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`custom-switch-${todo.id}`}
                  label={todo.status ? 'Finish' : 'Doing'}
                  checked={todo.status}
                  onChange={() => handleStatusChange(todo.id)}
                />
              </td>
              <td>{todo.note}</td>
              <td>
                <Button className="me-2" variant="info" onClick={() => handleOpenSelected(todo)}>
                  <i className="fa-solid fa-eye"></i> Detail
                </Button>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>
                  <i className="fa-solid fa-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selected && (
        <ModalUpdate isOpen={isOpen} setIsOpen={setIsOpen} todoData={selected} updateAction={updateAction} />
      )}
    </>
  );
};

export default TableControl;
