import React, { useState } from 'react'
import { ImageUpload } from '../../../components/ui/ImageUpload'
import { Input } from '../../../components/ui/Input'
import { InputArea } from '../../../components/ui/InputArea'
import { Button } from '../../../components'

export const FormCourse: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null) // Guardaremos el archivo original aquí

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string

    // Validate form data
    if (!name) {
      alert('Por favor, ingresa el nombre del curso')
      return
    }

    const data = new FormData()
    data.append('name', name)
    if (file) {
      data.append('img', file)
    }

    try {
      // Send data to backend
      const response = await fetch('https://tu-api.com/api/curso', {
        method: 'POST',
        body: data,
      })

      if (!response.ok) {
        throw new Error('Error al enviar los datos')
      }

      const result = await response.json()
      console.log('Datos enviados con éxito:', result)
    } catch (error) {
      console.error('Hubo un problema al enviar los datos:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <section className="flex p-4 gap-3">
        <ImageUpload
          image={image}
          setImage={setImage}
          setFile={setFile} // Pasamos setFile para guardar el archivo original
        />

        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Curso
            </label>
            <Input
              className="w-full"
              name="name"
              placeholder="Ingresa el nombre del curso"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <InputArea
              name="description"
              className="w-full"
              placeholder="Ingresa la descripción del curso"
              onChange={(e) => {
                // Guardamos el valor en el textarea
                console.log(e.target.value)
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Habilidades
            </label>
            <Input name="skills" placeholder="Ingresa las habilidades" />
          </div>

          <div className="mt-2">
            <Button
              className="w-full"
              type="submit"
              label="Crear Curso"
              variant="primary"
              onClick={() => {}}
            />
          </div>
        </div>
      </section>
    </form>
  )
}
