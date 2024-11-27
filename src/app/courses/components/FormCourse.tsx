import React, { useState } from 'react'
import { ImageUpload } from '../../../components/ui/ImageUpload'
import { Input } from '../../../components/ui/Input'
import { InputArea } from '../../../components/ui/InputArea'
import { Button, IconButton } from '../../../components'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { toast } from 'react-toastify'
import { API_URL_BACK } from '../../../utils/contants'
import { useQueryClient } from '@tanstack/react-query'
import { XCircleIcon } from 'lucide-react'

interface IFormCourse {
  name: string
  description: string
  skills: string[]
}

const initialState: IFormCourse = {
  name: '',
  description: '',
  skills: [],
}

export const FormCourse: React.FC = () => {
  const [state, setState] = useState<IFormCourse>(initialState)
  const [isSending, setIsSending] = useState(false)
  const [skillKeyborad, setSkillKeyborad] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null) // Guardaremos el archivo original aquí

  const token = useAuthStore((state) => state.user.token)

  const queryClient = useQueryClient()

  const handleAddSkill = () => {
    if (!skillKeyborad) {
      return
    }

    setState((prev) => ({
      ...prev,
      skills: [...prev.skills, skillKeyborad],
    }))

    setSkillKeyborad('')
  }

  const handleRemoveSkill = (index: number) => {
    setState((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, description, skills } = state
    // Validate form data
    if (!name || !description || !skills) {
      toast.error('Por favor, completa todos los campos')
      return
    }

    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('skills', skills.join(','))
    if (file) {
      data.append('img', file)
    }

    try {
      setIsSending(true)
      const response = await fetch(API_URL_BACK + '/api/courses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })

      const result: { message: string } = await response.json()

      if (!response.ok) {
        throw new Error(result.message)
      }

      toast.success(result.message)

      // Clear form
      setImage(null)
      setFile(null)
      setState(initialState)
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      })
    } catch (error) {
      const erorResponse = error as Error
      toast.error(erorResponse.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <section className="grid md:grid-cols-5 gap-2 p-2">
        <div className="md:col-span-2">
          <ImageUpload
            image={image}
            setImage={setImage}
            setFile={setFile} // Pasamos setFile para guardar el archivo original
          />
          <section className="hidden md:block">
            <p className="text-xs mt-2">
              Habilidades del curso: <strong>{state.skills.length}</strong>
            </p>
            <div className="w-full h-20 overflow-y-scroll">
              {state.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded-lg text-xs inline-block m-1 relative group border border-transparent transition-colors hover:border-sky-700"
                >
                  <button
                    className="absolute -top-1 -right-1 z-20 hidden group-hover:block"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <XCircleIcon size={16} className="text-red-700 bg-white" />
                  </button>
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Curso
            </label>
            <Input
              className="w-full"
              name="name"
              placeholder="Ingresa el nombre del curso"
              value={state.name}
              onChange={(e) => {
                setState((prev) => ({ ...prev, name: e.target.value }))
              }}
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
              value={state.description}
              onChange={(e) => {
                setState((prev) => ({ ...prev, description: e.target.value }))
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Habilidades
            </label>
            <div className="flex justify-between">
              <Input
                name="skills"
                placeholder="Ingresa las habilidades"
                value={skillKeyborad}
                onChange={(e) => {
                  setSkillKeyborad(e.target.value)
                }}
              />

              <IconButton
                icon="plus"
                variant="primary"
                size="sm"
                label="Agregar skill"
                onClick={handleAddSkill}
              />
            </div>

            <section className="block md:hidden">
              <p className="text-xs mt-2">
                Habilidades del curso: <strong>{state.skills.length}</strong>
              </p>
              <div className="w-full h-20 overflow-y-scroll">
                {state.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-2 rounded-lg text-xs inline-block m-1 relative group border border-transparent transition-colors hover:border-sky-700"
                  >
                    <button
                      className="absolute -top-1 -right-1 z-20 hidden group-hover:block"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <XCircleIcon
                        size={16}
                        className="text-red-700 bg-white"
                      />
                    </button>
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-2">
            <Button
              className="w-full"
              type="submit"
              disabled={isSending}
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
