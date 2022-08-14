import { FC } from "react";
import { useTodos } from "src/state/todo";



export const TodoCounter: FC = () => {
  const todos = useTodos();
  console.log(todos);

    return (
      <>
          <h2>TODO: {todos.length}件</h2>
          <h2>TODO: {todos.length}件</h2>
      </>
      )
    
}