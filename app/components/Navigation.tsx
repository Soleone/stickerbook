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
    <nav className="p-4 mb-4">
      {NAVIGATION.map(({ label, path }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            cn(
              'mr-4 p-2 rounded-md hover:bg-radix-yellow-4 hover:text-radix-black',
              isActive ? 'text-radix-black' : 'text-radix-muted',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
