import * as React from 'react';
import type { ReactNode } from 'react';

function TopNavigation() {
  return (
    <nav className="flex flex-col md:flex-row items-center space-x-4 mb-12">
      <Link to="/" active={true}>
        Patrick Wozniak
      </Link>
      <div className="flex space-x-4">
        <span className="text-gray-400">(</span>
        <Link to="https://stackoverflow.com/users/story/6300994?view=Cv">cv</Link>
        <span className="text-gray-400">{'//'}</span>
        <Link to="mailto:hi@patwoz.de">mail</Link>
        <span className="text-gray-400">)</span>
      </div>
    </nav>
  );
}

interface LinkProps {
  to: string;
  active?: boolean;
  children: ReactNode;
}

function Link({ to, active, children }: LinkProps) {
  return (
    <a className={`no-underline ${active ? 'font-bold text-black' : ''}`} href={to}>
      {children}
    </a>
  );
}

export default TopNavigation;
