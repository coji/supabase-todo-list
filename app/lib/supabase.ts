import { createClient } from '@supabase/supabase-js'
import type { Database } from './schema'
import { redirect } from '@remix-run/react'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export const requireUser = async () => {
  const user = await getUser()

  // 未ログイン時はログイン画面にリダイレクト
  if (!user) throw redirect('/')

  return user
}

export const getUser = async () => {
  const { data } = await supabase.auth.getSession()
  return data?.session?.user
}
