import { Form } from '@remix-run/react'
import type { Todo } from '~/types'

export const DeleteTodoButton = ({ todo }: { todo: Todo }) => {
  return (
    <Form method="POST" className="inline">
      <input type="hidden" name="id" value={todo.id} />
      <button
        type="submit"
        name="intent"
        value="delete"
        className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
          <title>delete</title>
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </Form>
  )
}
