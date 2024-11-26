import { Link } from 'wouter'
import { Button } from '../../../components'
import { Input } from '../../../components/ui/Input'
import { useState } from 'react'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { UserModel } from '../../../models'
import { toast } from 'react-toastify'

export default function RecoverPage() {
  const [state, setState] = useState({
    error: '',
    email: '',
  })

  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { email } = state

    if (!email.trim()) {
      setState({ ...state, error: 'Todos los campos son requeridos' })
      return
    }

    const http = new ApiFetch({})
    const userModel = new UserModel(http)

    setIsSending(true)

    const result = await userModel.recover(email)

    if (!result?.message) {
      setIsSending(false)
      return
    }
    toast.success(result.message)
    setState({ email: '', error: '' })

    setIsSending(false)
  }

  return (
    <section>
      <div>
        <h1 className="text-xl font-bold text-center">Recupera tu cuenta</h1>
        <p className="text-center text-gray-700">
          Ingresa el correo de tu usuario asociado.
        </p>

        <form className="space-y-1" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="font-bold text-slate-600 ml-1" htmlFor="email">
              Email:
            </label>
            <Input
              name="email"
              placeholder="Ingresa tu correo"
              className="w-full"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
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
              label="Recuperar"
              variant="primary"
              disabled={isSending}
              onClick={() => {}}
            />

            <Link href="/login" className="text-sky-700">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
