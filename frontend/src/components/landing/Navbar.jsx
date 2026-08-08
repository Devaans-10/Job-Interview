import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BubbleMenu from '../BubbleMenu';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const baseItems = [
    {
      label: 'Features',
      href: '#features',
      ariaLabel: 'Features',
      rotation: -8,
      hoverStyles: { bgColor: '#B600A8', textColor: '#ffffff' }
    },
    {
      label: 'How It Works',
      href: '#how-it-works',
      ariaLabel: 'How It Works',
      rotation: 8,
      hoverStyles: { bgColor: '#00D4FF', textColor: '#111111' }
    },
    {
      label: 'Contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    }
  ];

  const authItems = user
    ? [
        {
          label: 'Dashboard',
          href: '#',
          onClick: () => navigate('/interview'),
          ariaLabel: 'Dashboard',
          rotation: 8,
          hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
        },
        {
          label: 'Logout',
          href: '#',
          onClick: () => {
            logout();
            navigate('/');
          },
          ariaLabel: 'Logout',
          rotation: -8,
          hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
        }
      ]
    : [
        {
          label: 'Login',
          href: '#',
          onClick: () => navigate('/login'),
          ariaLabel: 'Login',
          rotation: 8,
          hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
        },
        {
          label: 'Sign Up',
          href: '#',
          onClick: () => navigate('/signup'),
          ariaLabel: 'Sign Up',
          rotation: -8,
          hoverStyles: { bgColor: '#B600A8', textColor: '#ffffff' }
        }
      ];

  const items = [...baseItems, ...authItems];

  return (
    <div className="fixed w-full z-50 top-0 left-0">
      <BubbleMenu
        logo={<span className="font-black text-[#111] tracking-tighter text-sm">AI AGENT</span>}
        items={items}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
        className="!top-6"
      />
    </div>
  );
}
