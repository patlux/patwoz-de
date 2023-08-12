import { type PropsWithChildren } from 'react';
import { Menu } from './Menu';

export type BaseLayoutProps = PropsWithChildren<{
  footerCenterComponent?: React.ReactNode;
}>;

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Menu />

      <main className="xl:pl-72 bg-white py-20">
        <div className="px-6 w-full sm:max-w-2xl md:max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
};
