import { FunctionComponent } from "react";
import Navbar from "../navbar";

//for react > 18, 밑에꺼 넣어야 children prop이 들어감. 18전에는 밑에라인 안써도 됐음.
interface Props {
  children?: React.ReactNode;
}

const BaseLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="py-16 bg-gray-50 overflow-hidden min-h-screen">
        <div className="max-w-7wl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
