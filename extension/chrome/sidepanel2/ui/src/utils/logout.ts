import { useAuthStore } from "@/stores/auth-store";

import { BASE_URL } from "@/types/constants";

export default function handleLogout() {
  fetch(`${BASE_URL}/cloud/logout`, {
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
