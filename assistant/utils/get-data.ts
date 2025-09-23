// import { handleServerError } from "./handle-server-error"

export async function fetchMe() {
  try {
    const response = await fetch("/cloud/me");
    if (!response.ok) {
      throw new Error("service failure");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.warn("not authenticated/error fetching profile:", error);
    // handleServerError(error)
  }
}
