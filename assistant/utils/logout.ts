import { useAuthStore } from "@/stores/auth-store";

/* eslint-disable no-console  */
export default function handleLogout() {
  fetch("/cloud/logout", {
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
