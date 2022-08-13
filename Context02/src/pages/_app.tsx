import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Layout } from "src/components/Layout";
import { Todo } from "src/types";

const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: false },
  { id: 2, text: "bar", isDone: false },
];

export const TodoContext = createContext<{
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}>({ 
  todos: TODOS,
  //setTodosは上書きされるものであるから、上書きされた状態で使うと意図しない挙動を示すという意味でエラー関数を渡している
  setTodos: () => {
    throw Error("No default value!")
  }
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
    </TodoContext.Provider>
)
}
