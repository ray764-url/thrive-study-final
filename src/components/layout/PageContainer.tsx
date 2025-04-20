
import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`container mx-auto px-4 py-6 md:py-8 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
