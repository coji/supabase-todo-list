import { supabase } from '~/lib/supabase'
import { Form, Outlet, redirect } from '@remix-run/react'

export const clientAction = async () => {
  await supabase.auth.signOut()
  return redirect('/')
}

export default function TodoListLayout() {
  return (
    <div className="w-full h-full bg-gray-200">
      <div
        className="w-full h-full flex flex-col justify-center items-center p-4"
        style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
      >
        <Outlet />
        <Form method="post">
          <button type="submit" className="btn-black w-full mt-12">
            Logout
          </button>
        </Form>
      </div>
    </div>
  )
}
