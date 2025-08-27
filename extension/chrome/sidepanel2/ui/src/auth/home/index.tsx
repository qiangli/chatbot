import { useAuth } from "@/stores/auth-store";
import { TopHeader } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import Chat from "./chat";
import Welcome from "./welcome";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <TopHeader />
      <Main fixed>{user ? <Chat /> : <Welcome />}</Main>
    </>
  );
}
