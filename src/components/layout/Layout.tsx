
import { ReactNode } from "react";
import Navbar from "./Navbar";
import SkipToContent from "../accessibility/SkipToContent";
import KeyboardNavTip from "../features/KeyboardNavTip";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipToContent />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <KeyboardNavTip />
    </div>
  );
};

export default Layout;
