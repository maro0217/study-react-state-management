import type { NextPage } from "next";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { Todo } from "src/types";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

const Add: NextPage<Props> = ({ setTodos }) => {
  //Genericisでいれたものの一覧を取得
  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    const text = event.currentTarget.text.value;
    setTodos(prevTodos => {
      const newTodo = { id: prevTodos.length + 1, text, isDone: false }
      return [...prevTodos, newTodo]
    })
    console.log(text)
    event.currentTarget.reset()
  }

  return (
    <div>
      <h3>TODO追加</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" autoComplete="off" required name="text"/>
        <button>追加</button>
      </form>
    </div>
  )
};

export default Add;
