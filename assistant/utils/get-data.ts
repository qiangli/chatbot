// import { handleServerError } from "./handle-server-error"

/* eslint-disable no-console  */

// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

// export async function fetchAgentList() {
//   try {
//     // const response = await fetch(`${BASE_URL}/api/agents`)
//     const response = await fetch(`/api/agents`)

//     if (!response.ok) {
//       throw new Error("Network response was not ok")
//     }
//     return await response.json()
//   } catch (error) {
//     console.error("Error fetching agents:", error)
//     handleServerError(error)
//   }
// }

export async function fetchMe() {
  try {
    const response = await fetch("/cloud/me");
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
