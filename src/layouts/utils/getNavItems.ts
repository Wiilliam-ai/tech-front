import {
  // BookText,
  BoxIcon,
  HouseIcon,
  LucideProps,
  UserCircleIcon,
  UsersIcon,
} from 'lucide-react'
import { IUser } from '../../interfaces/auth.interface'

interface INavItem {
  title: string
  url: string
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  isView: boolean
  isVi?: undefined
}

export const getNavItems = (user: IUser) => {
  const navItems: INavItem[] = [
    {
      title: 'Resumen',
      url: '/',
      Icon: HouseIcon,
      isView: true,
    },
    {
      title: 'Perfil',
      url: '/profile',
      Icon: UserCircleIcon,
      isView: true,
    },
    {
      title: 'Cursos',
      url: '/courses',
      Icon: BoxIcon,
      isView: true,
    },
    {
      title: 'Usuarios',
      url: '/users',
      Icon: UsersIcon,
      isView: user.role?.doAdmin,
    },
    /*,
    {
      title: 'Roadmaps',
      url: '/roadmaps',
      Icon: BookText,
      isView: true,
    },*/
  ]

  const navItemsFiltered = navItems.filter((item) => item.isView)

  return navItemsFiltered
}
