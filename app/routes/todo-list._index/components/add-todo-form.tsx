import { Form, useActionData } from '@remix-run/react'
import type { clientAction } from '../route'

export const AddToDoForm = () => {
  const actionData = useActionData<typeof clientAction>()

  return (
    <Form className="flex gap-2 my-2" method="POST">
      <input
        key={actionData?.todo?.id}
        className="rounded w-full p-2"
        type="text"
        placeholder="make coffee"
        name="task"
      />
      <button type="submit" name="intent" value="add" className="btn-black">
        Add
      </button>
    </Form>
  )
}
