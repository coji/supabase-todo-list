import { type ClientActionFunctionArgs, useFetcher } from '@remix-run/react'
import { supabase } from '~/lib/supabase'
import type { Todos } from '~/types'

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const id = Number(formData.get('id'))
  const isCompleted = formData.get('isCompleted') === 'true'

  const { data } = await supabase
    .from('todos')
    .update({ is_complete: isCompleted })
    .eq('id', id)
    .throwOnError()
    .select()
    .single()

  return { data }
}

export const TaskCheckbox = ({ todo }: { todo: Todos[0] }) => {
  const fetcher = useFetcher<typeof clientAction>({
    key: `task-complete-${todo.id}`
  })

  const toggle = async () => {
    fetcher.submit(
      {
        id: todo.id,
        isCompleted: !todo.is_complete
      },
      {
        method: 'post',
        action: '/resources/task/complete'
      }
    )
  }

  return (
    <input
      className="cursor-pointer"
      onChange={() => toggle()}
      type="checkbox"
      checked={
        fetcher.formData?.get('isCompleted')
          ? Boolean(fetcher.formData?.get('isCompleted'))
          : todo.is_complete ?? undefined
      }
    />
  )
}
