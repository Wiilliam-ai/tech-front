import { Route, Switch, useLocation } from 'wouter'
import { useEffect, useState, useRef } from 'react'
import { AppLoader } from '../components/layouts/AppLoader'
import { LayoutAuth } from './auth/components/LayoutAuth'
import LoginPage from './auth/screens/LoginPage'
import RecoverPage from './auth/screens/RecoverPage'
import CompleteRecoverPage from './auth/screens/CompleteRecoverPage'
import { useAuthStore } from '../stores/auth/useAuthStore'
import { ApiFetch } from '../plugins/http/api-fetch'
import { UserModel } from '../models'
import { IUser } from '../interfaces/auth.interface'
import { Layout } from '../layouts/Layout'
import UsersPage from './users/UsersPage'
import { VerifyPage } from './auth/screens/VerifyPage'
import { useLogout } from '../hooks/useLogout'
import CoursesPage from './courses/CoursesPage'
import { CoursePage } from './courses/CoursePage'

const pathsPublic = ['login', 'forgot-password', 'verify', 'recover']

export const App = () => {
  const [loading, setLoading] = useState(true)

  const auth = useAuthStore((state) => state.auth)
  const user = useAuthStore((state) => state.user)
  const logoutAuth = useAuthStore((state) => state.logoutAuth)
  const verifyAuth = useAuthStore((state) => state.verifyAuth)
  const [pathname, navigate] = useLocation()

  const { logoutUser } = useLogout()

  // useRef para controlar si ya se realizó la llamada
  const hasFetchedAuth = useRef(false)

  useEffect(() => {
    const fetchAuth = async () => {
      const paths = pathname.split('/')[1]
      const isPublic = pathsPublic.includes(paths)

      if (isPublic) {
        setLoading(false)
        return
      }

      if (!auth && !user.token) {
        logoutAuth()
        navigate('/login')
        setLoading(false)
        return
      }

      const http = new ApiFetch({ token: user.token })
      const userModel = new UserModel(http)

      const result = await userModel.verifyAuth({
        logout: () => {
          logoutUser()
        },
      })

      if (result?.message) {
        verifyAuth({
          token: user.token,
          user: result.data as unknown as IUser,
        })
      }

      const isViewLogin = pathname === '/login'
      if (isViewLogin) navigate('/admin')

      setLoading(false)
    }

    // Evitar múltiples llamadas
    if (!hasFetchedAuth.current) {
      hasFetchedAuth.current = true
      fetchAuth()
    }
  }, [auth, logoutAuth, logoutUser, navigate, pathname, user.token, verifyAuth])

  if (loading) return <AppLoader />

  return (
    <Switch>
      <Route path="/">
        <h1>hola</h1>
      </Route>

      {/* Rutas de autenticación */}
      <Route path="/login">
        <LayoutAuth>
          <LoginPage />
        </LayoutAuth>
      </Route>
      <Route path="/forgot-password">
        <LayoutAuth>
          <RecoverPage />
        </LayoutAuth>
      </Route>
      <Route path="/verify/:token">
        <LayoutAuth>
          <VerifyPage />
        </LayoutAuth>
      </Route>
      <Route path="/recover/:token">
        <LayoutAuth>
          <CompleteRecoverPage />
        </LayoutAuth>
      </Route>

      {/* Rutas generales */}
      <Route path="/admin" nest>
        <Route path="/">
          <Layout title="Resumen">
            <h1>Admin</h1>
          </Layout>
        </Route>

        <Route path="/users">
          <Layout title="Modulo de usuarios">
            <UsersPage />
          </Layout>
        </Route>

        <Route path="/courses">
          <Layout title="Cursos">
            <CoursesPage />
          </Layout>
        </Route>

        <Route path="/courses/:id/:name">
          {(params) => (
            <Layout title={params.name}>
              <CoursePage />
            </Layout>
          )}
        </Route>
      </Route>
      <Route path="/*">
        <h1>404</h1>
      </Route>
    </Switch>
  )
}
