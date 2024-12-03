import { Image } from '../../../components/custom/image/Image'
import { IUserWeb } from '../../../interfaces/auth.interface'
import { API_URL_BACK } from '../../../utils/contants'

interface Props {
  user: IUserWeb
}

export const DetailUser = ({ user }: Props) => {
  const URL_PROFILE = `${API_URL_BACK}/assets/avatars/${user.avatar.url}`

  return (
    <div>
      <div className="flex flex-col items-center">
        <Image
          src={URL_PROFILE}
          alt="user"
          className="w-32 h-32 rounded-full border-2 border-sky-700 object-cover"
        />
        <h2 className="text-xl font-bold mt-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="mt-4 grid md:grid-cols-2">
        <h3 className="text-lg font-bold md:col-span-2 text-center border bg-sky-700 rounded-t-md text-white">
          Información
        </h3>
        <p className="text-center border-l border-b border-r">
          <span className="font-bold">Rol:</span>{' '}
          {user.role.doAdmin && 'Administrador'}
          {user.role.doInst && 'Instructor'}
          {user.role.doProf && 'Profesional'}
        </p>
        <p className="text-center border-r border-b">
          <span className="font-bold">Estado:</span>{' '}
          {user.isVerified ? 'Verificado' : 'No verificado'}
        </p>
      </div>
    </div>
  )
}
