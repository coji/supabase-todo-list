import { type ClientActionFunctionArgs, useLoaderData } from '@remix-run/react'
import { TodoList } from './components/todo-list'
import { requireUser } from '~/lib/supabase'
import { listTodos } from './queries'

export const clientLoader = async () => {
  requireUser()
  const todos = await listTodos()
  return { todos }
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const intent = formData.get('intent')
  if (!intent) {
    throw new Error('intent is required')
  }
  return { intent: String(intent), error: 'error!' }
}

export default function TodoListIndex() {
  const { todos } = useLoaderData<typeof clientLoader>()
  return <TodoList todos={todos} />
}
