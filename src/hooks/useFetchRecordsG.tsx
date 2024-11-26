import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiFetch } from '../plugins/http/api-fetch'
import { useAuthStore } from '../stores/auth/useAuthStore'
import { addToWindow } from '../utils/addToWindows'
import { RecordClucoseModel, RecordGlucose } from '../models/RecordGlucoseModel'

export const useFetchRecordsG = () => {
  const token = useAuthStore((state) => state.token)
  const apiFetch = new ApiFetch({ token: token || '' })
  const recordModel = new RecordClucoseModel(apiFetch)
  const queryClient = useQueryClient()

  const {
    data: recordsGlucose,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['records'],
    queryFn: async () => {
      const records = await recordModel.loadRecords()
      return records
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  const createRecordMutation = useMutation({
    mutationFn: (newRecord: RecordGlucose) => recordModel.saveRecord(newRecord),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] })
    },
  })

  const createRecord = async (newRecord: RecordGlucose) => {
    const result = await createRecordMutation.mutateAsync(newRecord)
    return result
  }

  addToWindow(recordsGlucose, 'RecordsGlucoseStore')
  return {
    recordsGlucose,
    isLoading,
    isError,
    createRecord,
  }
}
