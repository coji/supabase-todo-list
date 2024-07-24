import type { Database } from '~/lib/schema'

export type Todos = Database['public']['Tables']['todos']['Row'][]
export type Todo = Todos[0]
