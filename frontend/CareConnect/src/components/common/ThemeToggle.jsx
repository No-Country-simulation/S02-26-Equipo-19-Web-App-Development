import { Sun, Moon } from 'lucide-react';

/**
 * A simple button that switches light/dark mode.
 * props:
 *  - dark: boolean current state
 *  - toggle: () => void
 */
const ThemeToggle = ({ dark, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-bg-tertiary transition-colors text-f-primary"
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;