import Footer from "@/components/footer";
import { Thread } from "@/components/assistant-ui/thread";

import "./chat.css";

function Chat() {
  return (
    <>
      {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2">
          <button onClick={navigateHome} className="btn btn-primary">
              <IconHome size={18} stroke={1.5} />
            </button>
          Profile
        </div>
      </header> */}
      <Thread />
      <Footer />
    </>
  );
}

export default Chat;
