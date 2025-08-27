import { useAuthStore } from "@/stores/auth-store";
import { BASE_URL } from "@/types/constants";

export async function fetchMe() {
  try {
    const token = useAuthStore.getState().auth.accessToken;
    const response = await fetch(`${BASE_URL}/cloud/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("service failure");
    }
    const data = response.json();
    // console.info('data', data)
    return data;
  } catch (error) {
    console.warn("not authenticated/error fetching profile:", error);
    // handleServerError(error)
  }
}
