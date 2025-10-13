'use client'

/**
 * LOGOUT BUTTON COMPONENT
 *
 * Client component that triggers the logout server action.
 * Can be used anywhere in the app.
 */

import { logoutAction } from '@/app/(auth)/actions'
import { LogOut } from 'lucide-react'
import { useTransition } from 'react'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogOut className="h-5 w-5" />
      <span>{isPending ? 'Logging out...' : 'Logout'}</span>
    </button>
  )
}
