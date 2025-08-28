import { useEffect } from "react";
import { useAuth } from "@/stores/auth-store";
import { TopHeader } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import Chat from "./chat";
import Welcome from "./welcome";
import { type WsMessage, sendWsMessage } from "@/lib/ws/manager";
import { AuthUser } from "@/stores/auth-store";

async function authenticate(token: string): Promise<WsMessage> {
  const req: WsMessage = {
    type: "auth",
    recipient: "hub",
    payload: token,
  };
  const resp = sendWsMessage(req);
  return resp;
}

export default function Home() {
  const { user, accessToken, setUser } = useAuth();

  useEffect(() => {
    if (!user && accessToken) {
      const attemptAuthentication = async () => {
        const resp = await authenticate(accessToken);
        if (resp) {
          if (resp && resp.payload) {
            const pl = JSON.parse(resp.payload);
            const userData: AuthUser = {
              name: pl.name,
              email: pl.email,
              avatar: pl.avatar,
            };
            setUser(userData);
          }
        }
      };
      attemptAuthentication();
    }
  }, [user, accessToken, setUser]);

  return (
    <>
      <TopHeader />
      <Main>{user ? <Chat /> : <Welcome />}</Main>
    </>
  );
}
