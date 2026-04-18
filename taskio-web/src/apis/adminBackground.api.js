import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const fetchAdminBackgroundAPI = async ({ search, page, limit }) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/admin/backgrounds`, {
    params: {
      ...(search ? { search } : {}),
      page,
      limit
    }
  })
  return response.data.metadata
}

export const updateBlockBackgroundAPI = async ({ backgroundId }) => {
  const response = await authorizeAxiosInstance.patch(`${API_ROOT}/v1/admin/backgrounds/block/${backgroundId}`)
  toast.success('Background change status successfully!')
  return response.data.metadata
}

// export const updateAdminUserApi = async ({ userId, userData }) => {
//   const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/admin/users/${userId}`, userData)
//   toast.success('User updated successfully!')
//   return response.data.metadata
// }

export const createAdminBackgroundAPI = async ({ backgroundData }) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/admin/backgrounds`, backgroundData)
  toast.success('Admin background created successfully!')
  return response.data.metadata
}
