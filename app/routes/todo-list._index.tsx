import { redirect, useLoaderData } from '@remix-run/react'
import TodoList from '~/components/TodoList'
import { supabase } from '~/lib/initSupabase'

export const clientLoader = async () => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    // 未ログインなのでログイン画面にリダイレクト
    throw redirect('/')
  }
  return { session: data.session }
}

export default function TodoListIndex() {
  const { session } = useLoaderData<typeof clientLoader>()
  return <TodoList session={session} />
}