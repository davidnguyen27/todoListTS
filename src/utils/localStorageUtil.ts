import { Todo } from '../types/types';

const TODO_KEY = 'todos';

export const getTodoFromLocal = (): Todo[] => {
  const storedTodos = localStorage.getItem(TODO_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const setTodosToLocal = (todos: Todo[]): void => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
};
