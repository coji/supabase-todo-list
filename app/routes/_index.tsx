import { redirect, useNavigate } from '@remix-run/react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from 'react'
import { supabase } from '~/lib/initSupabase'

export const clientLoader = async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    // ログイン済みなので TODO リスト画面にリダイレクト
    throw redirect('/todo-list')
  }
  return {}
}

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const navigate = useNavigate()

  useEffect(() => {
    // Auth コンポーネントでログインすると session が更新されるのでここでリダイレクト
    // ほんとは clientAction で redirect したいけど、その場合認証画面自作になるので一旦。
    if (session) {
      navigate('/todo-list')
    }
  }, [session, navigate])

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <div className="w-full h-full flex justify-center items-center p-4">
          <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
            <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
              Login
            </span>
            <Auth
              supabaseClient={supabase}
              providers={[]}
              appearance={{ theme: ThemeSupa }}
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
