import type { NextPage } from "next";
import { useContext } from "react";
import { TodosContext, useTodosDispatch } from "src/state/todo";


const Home: NextPage = () => {
  const todos = useContext(TodosContext)
  //idの型が変わっても自動で変わるという保守性を担保
  const { toggleIsDone } = useTodosDispatch()
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
