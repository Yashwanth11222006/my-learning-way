import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Navbar />
      
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;