import { useActionData } from '@remix-run/react'
import type { Todos } from '~/types'
import { TodoItem } from './todo-item'
import { AddToDoForm } from './add-todo-form'
import { Alert } from './alert'
import type { clientAction } from '../route'

export const TodoList = ({ todos }: { todos: Todos }) => {
  const actionData = useActionData<typeof clientAction>()

  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>

      <AddToDoForm />

      {actionData?.error && <Alert text={actionData?.error} />}

      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  )
}
