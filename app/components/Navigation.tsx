import { NavLink } from '@remix-run/react';
import { cn } from '~/lib/utils';

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
          className={({ isActive }) =>
            cn(
              'mr-4 p-2 rounded-xl hover:bg-theme-yellow-300 hover:text-theme-yellow-900',
              isActive ? 'text-theme-gray-900 underline' : 'text-theme-gray-700',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
