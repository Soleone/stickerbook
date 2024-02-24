import { NavLink } from '@remix-run/react';

const NAVIGATION = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Collection',
    path: '/collection',
  },
  {
    label: 'About',
    path: '/about',
  },
];

export default function Navigation() {
  return (
    <nav className="p-4 text-foreground mb-4">
      {NAVIGATION.map(({ label, path }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) => {
            const baseMarkup = 'mr-4';
            const dynamic = isActive ? 'text-theme-gray-900 underline' : 'text-theme-gray-700';
            return `${baseMarkup} ${dynamic}`;
          }}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
