import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  accessibilityMode?: string;
}

const Layout = ({ children, accessibilityMode = 'standard' }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar accessibilityMode={accessibilityMode} />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;