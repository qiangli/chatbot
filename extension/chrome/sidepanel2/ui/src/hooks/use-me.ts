import { useState, useEffect } from "react";
import { fetchMe } from "../utils/get-data";

export function useMe() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMe()
      .then((data) => setUser(data))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
