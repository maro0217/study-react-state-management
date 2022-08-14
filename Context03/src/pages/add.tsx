import type { NextPage } from "next";
import { ComponentProps } from "react";
import { useTodosDispatch } from "src/state/todo";



const Add: NextPage = () => {
  const { addTodo } = useTodosDispatch()

  //Genericisでいれたものの一覧を取得
  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    const text = event.currentTarget.text.value;
    addTodo(text)
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
