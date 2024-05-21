import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import TableControl from './TableControl';
import ModalCreate from '../modal/ModalCreate';
import { getTodoFromLocal, setTodosToLocal } from '../../utils/localStorageUtil';

interface Todo {
  id: string;
  todoName: string;
  start: string;
  status: boolean;
  note: string;
}

const TodoControl = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTodo, setSearchTodo] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    const storedTodos = getTodoFromLocal();
    setTodos(storedTodos);
  }, []);

  const handleOpen = () => setIsOpen(true);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todoName.toLowerCase().includes(searchTodo.toLowerCase());
    const matchesFilter =
      filterStatus === 'All' ||
      (filterStatus === 'Doing' && !todo.status) ||
      (filterStatus === 'Finish' && todo.status);
    return matchesSearch && matchesFilter;
  });

  const addTodo = (newTodo: Todo) => {
    const currentTodos = [...todos, newTodo];
    setTodos(currentTodos);
    setTodosToLocal(currentTodos);
  };

  return (
    <>
      <h4>Todo list</h4>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTodo}
            onChange={(e) => setSearchTodo(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex mb-3 justify-content-between">
        <div className="d-flex align-items-center">
          <span className="me-3">Filter</span>
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Doing">Doing</option>
            <option value="Finish">Finish</option>
          </Form.Select>
        </div>
        <Button className="justify-content-end" variant="primary" onClick={handleOpen}>
          + New todo
        </Button>
      </div>
      <ModalCreate isOpen={isOpen} setIsOpen={setIsOpen} addTodo={addTodo} />
      <TableControl todos={filteredTodos} setTodos={setTodos} />
    </>
  );
};

export default TodoControl;
