import { AxiosError } from "axios";
import { toast } from "sonner";

/* eslint-disable no-console  */
export function handleServerError(error: unknown) {
  console.log(error);

  let errMsg = `Something went wrong! ${error}`;

  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    Number(error.status) === 204
  ) {
    errMsg = "Content not found.";
  }

  if (error instanceof AxiosError) {
    errMsg = error.response?.data.title;
  }

  toast.error(errMsg);
}
