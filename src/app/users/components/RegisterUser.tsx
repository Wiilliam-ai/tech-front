import React, { useState } from 'react'
import { Input } from '../../../components/ui/Input'
import { Users, Monitor, Briefcase, LucideIcon } from 'lucide-react'
import { Button, useModal } from '../../../components'
import { ErrorMessage } from '../../../components/ui/ErrorMessage'
import { toast } from 'react-toastify'
import { useUsers } from '../hooks/useUsers'

// Definición de tipos
type RoleOption = {
  selected?: boolean
  label: string
  description: string
  icon: LucideIcon
}

type UserState = {
  email: string
  role: {
    doAdmin: boolean
    doInst: boolean
    doProf: boolean
  }
}

const INITIAL_STATE: UserState = {
  email: '',
  role: {
    doAdmin: false,
    doInst: false,
    doProf: false,
  },
}

export const RegisterUser: React.FC = () => {
  const { closeModal } = useModal()
  const [state, setState] = useState<UserState>(INITIAL_STATE)
  const { createUserMutation } = useUsers()
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)

  const roleOptions: RoleOption[] = [
    {
      selected: state.role.doAdmin,
      label: 'Administrador',
      description: 'Control total del sistema',
      icon: Users,
    },
    {
      selected: state.role.doInst,
      label: 'Instructor',
      description: 'Gestiona cursos y contenido',
      icon: Monitor,
    },
    {
      selected: state.role.doProf,
      label: 'Profesional',
      description: 'Acceso limitado',
      icon: Briefcase,
    },
  ]

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      email: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!state.email) {
      setError('El email es requerido')
      return
    }

    setIsSending(true)

    const result = await createUserMutation.mutateAsync({
      email: state.email,
      role: state.role,
    })

    if (!result) {
      setIsSending(false)
      return
    }

    toast.success(result)
    setState(INITIAL_STATE)
    setError('')
    setIsSending(false)
    closeModal()
  }

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <Input
            className="w-full"
            name="email"
            type="email"
            placeholder="Ingrese el email"
            value={state.email}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-4">
            Seleccione el Rol del usuario
          </p>

          <div className="grid grid-cols-3 gap-4">
            {roleOptions.map((role, index) => {
              const Icon = role.icon
              return (
                <div
                  key={index}
                  className={`
                    border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
                    ${
                      role.selected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      role: {
                        doAdmin: index === 0 ? true : false,
                        doInst: index === 1 ? true : false,
                        doProf: index === 2 ? true : false,
                      },
                    }))
                  }}
                >
                  <div className="flex flex-col items-center">
                    <Icon
                      className={`
                        mb-3 
                        ${role.selected ? 'text-blue-600' : 'text-gray-400'}
                      `}
                      size={40}
                    />
                    <h3
                      className={`
                      text-sm font-semibold mb-2
                      ${role.selected ? 'text-blue-800' : 'text-gray-700'}
                    `}
                    >
                      {role.label}
                    </h3>
                    <p className="text-xs text-center text-gray-500">
                      {role.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-2">
          <ErrorMessage message={error} />
        </div>

        <Button
          className="w-full mt-4"
          label="Registrar"
          variant="primary"
          disabled={isSending}
          type="submit"
          onClick={() => {}}
        />
      </form>
    </div>
  )
}
