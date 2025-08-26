import { useAuthStore } from "@/stores/auth-store";

const API_BASE_URL = "https://ai.dhnt.io";

export default function handleLogout() {
  fetch(`${API_BASE_URL}/cloud/logout`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/";
      } else {
        // Handle error cases
        console.error("Failed to logout.");
      }
      useAuthStore.getState().auth.reset();
    })
    .catch((error) => {
      console.error("An error occurred during logout:", error);
    });
}
