// import { handleServerError } from "./handle-server-error";

// import { useAuth } from "@/stores/auth-store";
// const ACCESS_TOKEN = "access-token";

import { useAuthStore } from "@/stores/auth-store";

const API_BASE_URL = "https://ai.dhnt.io";

// export async function fetchAgentList() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/agents`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching agents:", error);
//     handleServerError(error);
//   }
// }

export async function fetchMe() {
  try {
    const token = useAuthStore.getState().auth.accessToken;
    const response = await fetch(`${API_BASE_URL}/cloud/me`, {
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
