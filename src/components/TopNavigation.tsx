interface Props {
  url: string;
}

function TopNavigation({ url }: Props) {
  return (
    <nav className="flex flex-row items-center mb-12">
      <Link to="/" active={url === '/'}>
        Patrick Wozniak
      </Link>
      <Separator />
      <Link to="https://stackoverflow.com/users/story/6300994?view=Cv">cv</Link>
      <Separator />
      <Link to="mailto:hi@patwoz.de">mail</Link>
    </nav>
  );
}

interface LinkProps {
  to: string;
  active?: boolean;
  children: string;
}

function Link({ to, active, children }: LinkProps) {
  return (
    <a className={`no-underline ${active ? 'font-bold text-black' : ''}`} href={to}>
      {children}
    </a>
  );
}

function Separator() {
  return <div className="text-gray-400 mx-3">{'//'}</div>;
}

export default TopNavigation;
