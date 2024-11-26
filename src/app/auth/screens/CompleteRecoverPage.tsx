import { useState } from 'react'
import { Input } from '../../../components/ui/Input'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { UserModel } from '../../../models'
import { Button } from '../../../components'
import { useLocation, useParams } from 'wouter'
import { toast } from 'react-toastify'

export default function CompleteRecoverPage() {
  const [state, setState] = useState({
    error: '',
    password: '',
    confirmPassword: '',
  })

  const [isSending, setIsSending] = useState(false)

  const params = useParams<{ token: string }>()
  const token = params.token

  const [, navigate] = useLocation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { password, confirmPassword } = state

    if (!password || !confirmPassword) {
      setState({ ...state, error: 'Todos los campos son requeridos' })
      return
    }

    if (password !== confirmPassword) {
      setState({ ...state, error: 'Las contraseñas no coinciden' })
      return
    }

    if (password.length < 6) {
      setState({
        ...state,
        error: 'La contraseña debe tener al menos 6 caracteres',
      })
      return
    }

    const http = new ApiFetch({})
    const userModel = new UserModel(http)

    setIsSending(true)

    const result = await userModel.completeRecover(token, password)

    if (!result?.message) {
      setIsSending(false)
      return
    }

    toast.success(result.message)
    setState({ password: '', confirmPassword: '', error: '' })

    setIsSending(false)
    navigate('/login')
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center">
        Restablece tus credenciales
      </h1>
      <p className="text-center text-gray-700">
        Ingresa las nuevas credenciales para tu cuenta.
      </p>

      <form className="space-y-1" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="font-bold text-slate-600 ml-1" htmlFor="email">
            Nuevo password:
          </label>
          <Input
            name="password"
            placeholder="Ingresa tu nueva contraseña"
            className="w-full"
            type="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-600 ml-1" htmlFor="email">
            Confirmar password:
          </label>
          <Input
            name="confirmPassword"
            placeholder="Confirma tu nueva contraseña"
            className="w-full"
            type="password"
            value={state.confirmPassword}
            onChange={(e) =>
              setState({ ...state, confirmPassword: e.target.value })
            }
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
            label="Guardar"
            variant="primary"
            disabled={isSending}
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  )
}
