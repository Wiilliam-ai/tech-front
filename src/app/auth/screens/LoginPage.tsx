import { Link, useLocation } from 'wouter'
import { Button } from '../../../components'
import { Input } from '../../../components/ui/Input'
import { useState } from 'react'
import { UserModel } from '../../../models'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { toast } from 'react-toastify'
import { useAuthStore } from '../../../stores/auth/useAuthStore'

export default function LoginPage() {
  const [state, setState] = useState({
    error: '',
  })

  const [isSending, setIsSending] = useState(false)

  const loginAuth = useAuthStore((state) => state.loginAuth)
  const [, navigate] = useLocation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email') as string
    const password = data.get('password') as string

    if (!email || !password) {
      setState({ error: 'Todos los campos son requeridos' })
      return
    }

    const http = new ApiFetch({})
    const userModel = new UserModel(http)

    setIsSending(true)
    const result = await userModel.login({
      email,
      password,
    })

    if (result?.message) {
      toast.success(result.message)
    }

    if (result?.data?.token) {
      loginAuth(result.data)
      navigate('/admin')
    }

    setIsSending(false)
  }

  return (
    <section>
      <div>
        <h1 className="text-xl font-bold text-center">Inicio de Sesion</h1>
        <p className="text-center text-gray-700">Lorem ipsum dolor sit amet.</p>

        <form className="space-y-1" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="font-bold text-slate-600 ml-1" htmlFor="email">
              Email:
            </label>
            <Input
              name="email"
              placeholder="Ingrese el correo de usuario"
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-600 ml-1" htmlFor="password">
              Contraseña:
            </label>
            <Input
              name="password"
              type="password"
              placeholder="Ingrese la contraseña"
              className="w-full"
            />
          </div>

          {state.error && (
            <div className="bg-red-500 rounded-md px-2 py-1 font-bold text-sm text-white">
              {state.error}
            </div>
          )}

          <div className="flex justify-between py-3">
            <Button
              type="submit"
              label="login"
              variant="primary"
              disabled={isSending}
              onClick={() => {}}
            />

            <Link href="/forgot-password" className="text-sky-700">
              Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
