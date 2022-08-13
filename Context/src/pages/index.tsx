import type { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "src/types";

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

const Home: NextPage<Props> = ({ todos, setTodos }) => {

  //idの型が変わっても自動で変わるという保守性を担保
  const toggleIsDone = (id: Todo["id"]) => {
    console.log(id);
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone }
        }
        return todo;
      });
    });
  }

  return (
      <>
        <h3>TODO一覧</h3>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
                <label style={{ fontSize: "2rem" }}>
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    // 引数にidを渡したいから関数↓
                    onChange={() => toggleIsDone(todo.id)}
                    style={{width: "1.5rem", height: "1.5rem"}}
                  />{todo.text}
                </label>
            </div>
          )
        })}
      </>
    );
};

export default Home;
