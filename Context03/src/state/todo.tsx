import { createContext, Dispatch, FC, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from "react";
import { Todo } from "src/types";

const TODOS: Todo[] = [
    { id: 1, text: "foo", isDone: false },
    { id: 2, text: "bar", isDone: false },
  ];

//参照系
export const TodosContext = createContext(TODOS)

//更新系
export const TodosDispatchContext = createContext<{
  toggleIsDone: (id: Todo["id"]) => void;
  addTodo: (text: Todo["text"]) => void;
}>({
  toggleIsDone: () => {
    throw Error("No default value!")
  },
  addTodo: () => {
    throw Error("No default value!")
  }
})

export const TodoProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>(TODOS);

    
    const toggleIsDone = useCallback((id: Todo["id"]) => {
      console.log(id);
      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.id === id) {
            return { ...todo, isDone: !todo.isDone }
          }
          return todo;
        });
      });
    }, [])

    const addTodo = useCallback((text: Todo["text"]) => {
      setTodos(prevTodos => {
        const newTodo = { id: prevTodos.length + 1, text, isDone: false }
        return [...prevTodos, newTodo]
      })
    }, [])

    const todosDipatchValue = useMemo(() => {
      return { toggleIsDone, addTodo }
    }, [addTodo, toggleIsDone])

    return (
        <TodosContext.Provider value={todos}>
          <TodosDispatchContext.Provider value={{ toggleIsDone, addTodo }}>
            {children}
          </TodosDispatchContext.Provider>
        </TodosContext.Provider>

    );
};

export const useTodos = () => {
  const todos = useContext(TodosContext);
  return todos;
};

export const useTodosDispatch = () => {
  return useContext(TodosDispatchContext);
};