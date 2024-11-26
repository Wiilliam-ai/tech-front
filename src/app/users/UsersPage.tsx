import { Eye, MailIcon } from 'lucide-react'
import { useUsers } from './hooks/useUsers'
import { Button, useModalApp } from '../../components'
import { RegisterUser } from './components/RegisterUser'
import { IUserWeb } from '../../interfaces/auth.interface'
import { DetailUser } from './components/DetailUser'
import { ApiFetch } from '../../plugins/http/api-fetch'
import { useAuthStore } from '../../stores/auth/useAuthStore'
import { UserModel } from '../../models'
import { toast } from 'react-toastify'

export default function UsersPage() {
  const { openModal, onAlert } = useModalApp()
  const { data: users } = useUsers()
  const token = useAuthStore((state) => state.user.token)

  const handleAddUser = () => {
    openModal({
      title: 'Agregar nuevo usuario',
      component: <RegisterUser />,
      widthDimension: 35,
    })
  }

  const handleViewUser = (user: IUserWeb) => {
    openModal({
      title: `Detalles de usuario`,
      component: <DetailUser user={user} />,
      widthDimension: 35,
    })
  }

  const handleFowardByEmail = (user: IUserWeb) => {
    onAlert({
      title: 'Reenviar email',
      description: `¿Estás seguro que deseas reenviar el email de verificación a ${user.email}?`,
      onAccept: async () => {
        const http = new ApiFetch({ token })
        const userModel = new UserModel(http)
        const result = await userModel.forwardByEmail(user.email)
        if (result) {
          toast.success(result)
        }
      },
    })
  }

  return (
    <>
      <p>
        Este modulo es para administrar los usuarios del sistema. Desde los
        profeionales, instructores, administradores y los usuarios finales.
      </p>

      <Button
        label="Agregar nuevo usuario"
        variant="primary"
        icon="plus"
        onClick={handleAddUser}
      />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto m-4">
        <table className="w-full">
          <thead className="bg-sky-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Estado Registro
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {user.isVerified ? 'Verificado' : 'No verificado'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {user.role.doAdmin && 'Admin'}
                    {user.role.doInst && 'Instructor'}
                    {user.role.doProf && 'Profesional'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    {user.isVerified && (
                      <button
                        className="text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-full transition-colors"
                        title="Ver detalles"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye size={18} />
                      </button>
                    )}

                    {!user.isVerified && (
                      <button
                        className="text-sky-500 hover:text-sky-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="Reenviar email"
                        onClick={() => handleFowardByEmail(user)}
                      >
                        <MailIcon size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
