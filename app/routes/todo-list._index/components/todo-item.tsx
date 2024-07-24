import { TaskCheckbox } from '~/routes/resources.task.complete/route'
import type { Todo } from '~/types'
import { DeleteTodoButton } from './delete-todo-button'

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {todo.task}
          </div>
        </div>
        <div>
          <TaskCheckbox todo={todo} />
          <DeleteTodoButton todo={todo} />
        </div>
      </div>
    </li>
  )
}
