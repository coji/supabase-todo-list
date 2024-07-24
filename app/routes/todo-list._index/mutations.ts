import { supabase } from '~/lib/supabase'

export const addTodo = async (userId: string, taskText: string) => {
  const task = taskText.trim()
  if (task.length === 0) {
    throw new Error('タスクを入力してください')
  }

  const { data: todo } = await supabase
    .from('todos')
    .insert({ task, user_id: userId })
    .select()
    .single()
    .throwOnError()

  return todo
}

export const deleteTodo = async (id: number) => {
  console.log(id)
  await supabase.from('todos').delete().eq('id', id).throwOnError()
}
