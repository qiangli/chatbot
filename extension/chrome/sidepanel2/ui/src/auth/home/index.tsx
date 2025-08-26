import { useAuth } from "@/stores/auth-store";
import { TopHeader } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
// import { Heading } from '@/components/heading'
import Chat from "./chat";
import Welcome from "./welcome";
// import { IconBrandGithub } from "@tabler/icons-react";

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

        {/* <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg"></p>
            <footer className="flex text-sm">
              All roads lead to Rome
              <a href="https://github.com/qiangli/ai" target="_blank">
                <IconBrandGithub size={18} />
              </a>
            </footer>
          </blockquote>
        </div> */}
      </Main>
    </>
  );
}
