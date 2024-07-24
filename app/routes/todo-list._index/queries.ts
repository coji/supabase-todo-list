import { supabase } from '~/lib/supabase'

export const listTodos = async () => {
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: true })
  if (error) {
    throw new Error(error.message)
  }

  return todos
}
