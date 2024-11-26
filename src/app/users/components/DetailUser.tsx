import { IUserWeb } from '../../../interfaces/auth.interface'

interface Props {
  user: IUserWeb
}

export const DetailUser = ({ user }: Props) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          src={user.avatar.url}
          alt="user"
          className="w-32 h-32 rounded-full border-2 border-sky-700"
          onError={(e) => {
            e.currentTarget.src = 'https://i.pravatar.cc/300'
          }}
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
