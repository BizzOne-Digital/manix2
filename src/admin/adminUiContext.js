import { createContext, useContext } from 'react'

export const AdminUiContext = createContext({
  showToast: () => {},
})

export function useAdminToast() {
  return useContext(AdminUiContext)
}
