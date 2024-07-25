import { redirect, useNavigate } from '@remix-run/react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from 'react'
import { supabase, getUser } from '~/lib/supabase'

export const clientLoader = async () => {
  const user = await getUser()
  if (user) {
    // ログイン済みなので TODO リスト画面にリダイレクト
    throw redirect('/todo-list')
  }
  return {}
}

export default function Home() {
  const navigate = useNavigate()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Auth コンポーネントでログインすると session が更新されるのでここでリダイレクト
    // ほんとは clientAction で redirect したいけど、その場合ユーザ登録や認証画面が自作になるので一旦。
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        navigate('/todo-list')
      }
    })
  }, [])

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="min-w-full min-h-screen flex items-center justify-center flex-col">
        <h1 className="mx-auto">Remix Supabase Todo List</h1>
        <div className="w-full h-full flex justify-center items-center p-4">
          <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
            <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
              Login
            </span>

            <Auth
              supabaseClient={supabase}
              providers={['google']}
              appearance={{ theme: ThemeSupa }}
              theme="light"
            />
          </div>
        </div>
        <footer className="flex justify-center gap-4">
          <a
            className="underline"
            href="https://github.com/coji/supabase-todo-list"
            target="_blank"
            rel="noreferrer"
          >
            Source Code
          </a>
          <a
            className="underline"
            href="https://x.com/techtalkjp"
            target="_blank"
            rel="noreferrer"
          >
            Author
          </a>
        </footer>
      </div>
    </div>
  )
}
