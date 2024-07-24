import { Form, useActionData } from '@remix-run/react'
import { Alert } from './alert'
import type { clientAction } from '../route'

export const AddToDoForm = () => {
  const actionData = useActionData<typeof clientAction>()

  return (
    <Form className="flex gap-2 my-2">
      <input
        className="rounded w-full p-2"
        type="text"
        placeholder="make coffee"
        name="task"
      />
      <button type="submit" name="intent" value="add" className="btn-black">
        Add
      </button>

      {actionData?.error && <Alert text={actionData?.error} />}
    </Form>
  )
}
