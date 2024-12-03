import { PowerIcon } from 'lucide-react'
import { Link } from 'wouter'
import { useModalApp } from '../components'
import { useLogout } from '../hooks/useLogout'
import { getNavItems } from './utils/getNavItems'
import { useAuthStore } from '../stores/auth/useAuthStore'

export const NavLayout = () => {
  const { logoutUser } = useLogout()
  const user = useAuthStore((state) => state.dataAuth.user)
  const navItems = getNavItems(user)

  const { onAlert } = useModalApp()

  const hanldeLogout = () => {
    onAlert({
      title: 'Cerrar sesión',
      description: '¿Estás seguro que deseas cerrar sesión?',
      onAccept: async () => {
        logoutUser()
      },
    })
  }

  return (
    <nav className="text-white p-4">
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.url}
              className="py-2 hover:bg-sky-900 px-2 rounded-md border-b border-sky-900 flex items-center gap-2"
            >
              {item.Icon && <item.Icon size={24} />}
              {item.title}
            </Link>
          </li>
        ))}

        <li>
          <button
            className="py-2 w-full hover:bg-sky-900 px-2 rounded-md border-b border-sky-900 flex items-center gap-2"
            onClick={hanldeLogout}
          >
            <PowerIcon size={24} />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  )
}
