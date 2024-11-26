import { useState } from 'react'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components'
import { useParams } from 'wouter'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { UserModel } from '../../../models'
import { toast } from 'react-toastify'

export const VerifyPage = () => {
  const [state, setState] = useState({
    error: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const params = useParams<{ token: string }>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSending) return
    setIsSending(true)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!firstName || !lastName || !password || !confirmPassword) {
      setState({ ...state, error: 'Todos los campos son requeridos' })
      setIsSending(false)
      return
    }

    if (password !== confirmPassword) {
      setState({ ...state, error: 'Las contraseñas no coinciden' })
      setIsSending(false)
      return
    }

    if (password.length < 6) {
      setState({
        ...state,
        error: 'La contraseña debe tener al menos 6 caracteres',
      })
      setIsSending(false)
      return
    }

    const http = new ApiFetch({})
    const userModel = new UserModel(http)

    const result = await userModel.completeVerifyUser(
      firstName,
      lastName,
      password,
      params.token,
    )

    setIsSending(false)

    if (!result) return
    toast.success(result)
    setIsVerified(true)
  }

  if (isVerified) {
    return (
      <div>
        <h1 className="text-xl font-bold text-center">¡Cuenta verificada!</h1>
        <p className="text-center text-gray-700">
          Tu cuenta ha sido verificada correctamente.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Verifica tu cuenta</h1>
      <p className="text-center text-gray-700">
        Completa el registro de tu cuenta.
      </p>

      <form className="space-y-1" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="font-bold text-slate-600 ml-1" htmlFor="firstName">
            Nombres
          </label>
          <Input
            name="firstName"
            placeholder="Ingresa tu nombre"
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-600 ml-1" htmlFor="lastName">
            Apellidos
          </label>
          <Input
            name="lastName"
            placeholder="Ingresa tu apellido"
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-600 ml-1" htmlFor="password">
            Contraseña
          </label>
          <Input
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <label
            className="font-bold text-slate-600 ml-1"
            htmlFor="confirmPassword"
          >
            Confirmar contraseña
          </label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirma tu contraseña"
            className="w-full"
          />
        </div>

        {state.error && (
          <div className="bg-red-500 rounded-md px-2 py-1 font-bold text-sm text-white">
            {state.error}
          </div>
        )}

        <div className="flex justify-center items-center py-3">
          <Button
            type="submit"
            label="Completar registro"
            variant="primary"
            disabled={isSending}
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  )
}
