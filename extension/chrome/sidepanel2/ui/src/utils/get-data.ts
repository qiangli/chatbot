import { BASE_URL } from "@/types/constants"
import { useAuthStore } from "@/stores/auth-store"

// import { handleServerError } from "./handle-server-error"

export async function fetchMe() {
  const token = useAuthStore.getState().auth.accessToken
  const response = await fetch(`${BASE_URL}/cloud/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("service failure")
  }
  const data = response.json()
  // console.info('data', data)
  return data
  // try {

  // } catch (err) {
  //   // console.warn("not authenticated/error fetching profile:", err)
  //   handleServerError(err)
  // }
}
