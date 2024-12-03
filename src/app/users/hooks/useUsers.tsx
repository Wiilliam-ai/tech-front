import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { IUserRegister, UserModel } from '../../../models'

export const useUsers = () => {
  const token = useAuthStore((state) => state.dataAuth.token)
  const http = new ApiFetch({ token })
  const userModel = new UserModel(http)

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => userModel.listUsers(),
    staleTime: 1000 * 60 * 15, // 5 minutes
  })

  // register user

  const createUserMutation = useMutation({
    mutationFn: (user: IUserRegister) => userModel.register(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })

  return { data, isLoading, isError, createUserMutation }
}
