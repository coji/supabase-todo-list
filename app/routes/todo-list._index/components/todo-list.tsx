import type { Todos } from '~/types'
import { TodoItem } from './todo-item'
import { AddToDoForm } from './add-todo-form'

export const TodoList = ({ todos }: { todos: Todos }) => {
  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>

      <AddToDoForm />

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
