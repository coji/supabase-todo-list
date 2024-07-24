import { type ClientActionFunctionArgs, useLoaderData } from '@remix-run/react'
import { TodoList } from './components/todo-list'
import { requireUser } from '~/lib/supabase'
import { listTodos } from './queries'
import { addTodo, deleteTodo } from './mutations'

export const clientLoader = async () => {
  await requireUser()
  const todos = await listTodos()
  return { todos }
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const user = await requireUser()

  const formData = await request.formData()
  const intent = formData.get('intent') as string
  if (!intent) {
    throw new Error('intent is required')
  }

  // タスク追加
  if (intent === 'add') {
    const task = formData.get('task') as string
    if (!task) {
      throw new Error('task is required')
    }
    const todo = await addTodo(user.id, task)
    return { intent, todo, error: null }
  }

  // タスク削除
  if (intent === 'delete') {
    const id = formData.get('id') as string
    if (!id) {
      throw new Error('id is required')
    }
    const todo = await deleteTodo(Number(id))
    return { intent, todo, error: null }
  }
}

export default function TodoListIndex() {
  const { todos } = useLoaderData<typeof clientLoader>()
  return <TodoList todos={todos} />
}
