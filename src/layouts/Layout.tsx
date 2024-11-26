import { useState } from 'react'
import { IconButton } from '../components'
import { ModalComponent } from '../components/custom/modal/ModalComponent'
import { ModalProvider } from '../components/custom/modal/provider/ModalProvider'
import { NavLayout } from './NavLayout'

interface Props {
  title?: string
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children, title = 'App' }: Props) => {
  const [isActived, setIsActived] = useState(false)

  return (
    <ModalProvider>
      <section className="md:grid grid-cols-12 grid-rows-layout">
        <header className="bg-sky-700 text-white p-4 flex h-full items-center justify-between md:col-start-3 md:col-end-13">
          <IconButton
            className="block md:hidden"
            icon="menu"
            variant="secondary"
            label="Menu"
            onClick={() => {
              setIsActived(!isActived)
            }}
          />

          <h1 className="text-xl font-bold">{title}</h1>

          <div>
            <img
              src="h"
              alt="Logo"
              className="size-10 border-2 border-white rounded-full"
              title="Logo"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150'
              }}
            />
          </div>
        </header>

        <aside
          className={`absolute md:static top-0 md:top-auto left-0 md:left-auto w-full md:w-auto h-screen md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 bg-sky-800 transition-all ${
            isActived ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="text-center font-bold py-4 text-xl text-white md:hidden">
            <h2>Menu</h2>
          </div>

          <IconButton
            className="absolute md:hidden top-2 right-4 shadow-none"
            icon="xicon"
            variant="blank"
            label="Close"
            onClick={() => {
              setIsActived(!isActived)
            }}
          />

          <NavLayout />
        </aside>

        {/** Coloca el <main> dentro de la cuadrícula usando columnas específicas */}
        <main className="p-4 md:col-start-3 md:col-end-13">{children}</main>
      </section>

      <ModalComponent />
    </ModalProvider>
  )
}
