import { FunctionComponent } from 'react';
import Navbar from '../navbar';

interface Props {
  children?: React.ReactNode;
}

const BaseLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className='py-16  bg-neutral-100 overflow-hidden min-h-screen' style={{zIndex:"-9"}}>
        <div className='max-w-screen-lg mx-auto px-4 space-y-8 sm:px-6 lg:px-8'>
          {children}
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
