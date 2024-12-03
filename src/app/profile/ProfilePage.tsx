import { useState } from 'react'
import { IconButton, useModalApp } from '../../components'
import { Image } from '../../components/custom/image/Image'
import { useAuthStore } from '../../stores/auth/useAuthStore'
import { API_URL_BACK } from '../../utils/contants'
import { ModalPhotoProfile } from './components/ModalPhotoProfile'

export const ProfilePage = () => {
  const dataUser = useAuthStore((state) => state.dataAuth)

  const URL_PROFILE = `${API_URL_BACK}/assets/avatars/${dataUser.user?.avatar?.url}`

  const [urlPhoto, setUrlPhoto] = useState(URL_PROFILE)

  const { openModal } = useModalApp()

  const updateAvatar = (avatar: string) => {
    setUrlPhoto(`${API_URL_BACK}/assets/avatars/${avatar}`)
  }

  const handleChangePhoto = () => {
    openModal({
      title: 'Cambiar foto de perfil',
      component: (
        <ModalPhotoProfile srcPhoto={urlPhoto} updateAvatar={updateAvatar} />
      ),
      widthDimension: 20,
    })
  }

  return (
    <section className="bg-black flex relative justify-center items-center rounded-md">
      <Image
        className="w-full h-full absolute top-0 left-0 object-cover rounded-md blur-lg"
        src={urlPhoto}
        alt={dataUser.user.firstName}
      />
      <div className="relative w-max group top-20 flex flex-col items-center">
        <div className="relative w-max">
          <figure className="size-52 overflow-hidden rounded-full border-4 transition-all border-transparent group-hover:border-sky-600">
            <Image
              className="w-full h-full object-cover"
              src={`${urlPhoto}`}
              alt={dataUser.user.firstName}
            />
          </figure>
          <IconButton
            className="absolute top-0 right-0 hidden group-hover:block"
            icon="camera"
            variant="blank"
            label="Cambiar foto"
            onClick={handleChangePhoto}
          />
        </div>
        <p className="text-gray-700 text-2xl font-bold">
          {dataUser.user.firstName} {dataUser.user.lastName}
        </p>
      </div>
    </section>
  )
}
