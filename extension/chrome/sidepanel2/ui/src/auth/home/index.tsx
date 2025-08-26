import { useAuth } from "@/stores/auth-store";
import { TopHeader } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
// import { Heading } from '../components/heading'
import Chat from "./chat";
import Welcome from "./welcome";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <TopHeader />
      <Main fixed>
        {/* <Heading
          title='Home'
          desc='dhnt.io is here to help you make the most of AI technology.'
        /> */}
        {user ? <Chat /> : <Welcome />}
      </Main>
    </>
  );
}
