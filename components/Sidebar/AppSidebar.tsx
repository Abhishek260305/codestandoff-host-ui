"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar";
import { useClientRouter } from "../../hooks/useClientRouter";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconSchool,
  IconSword,
  IconCode,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * ============================================================================
 * APP SIDEBAR - Uses design tokens from host
 * ============================================================================
 */

type Route = 'dashboard' | 'training' | '1v1' | 'playground' | null;

interface AppSidebarProps {
  currentRoute: Route;
}

export default function AppSidebar({ currentRoute: _currentRoute }: AppSidebarProps) {
  const router = useClientRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Route>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateRoute = () => {
      let path: string;
      
      if (router?.pathname) {
        path = router.pathname;
      } else if (typeof window !== 'undefined') {
        path = window.location.pathname;
      } else {
        return;
      }

      if (path === '/dashboard') {
        setCurrentRoute('dashboard');
      } else if (path === '/training') {
        setCurrentRoute('training');
      } else if (path === '/1v1') {
        setCurrentRoute('1v1');
      } else if (path === '/playground') {
        setCurrentRoute('playground');
      } else {
        setCurrentRoute(null);
      }
    };

    updateRoute();

    if (router?.events) {
      router.events.on('routeChangeComplete', updateRoute);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', updateRoute);
    }

    return () => {
      if (router?.events) {
        router.events.off('routeChangeComplete', updateRoute);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', updateRoute);
      }
    };
  }, [isClient, router, router?.pathname]);

  const links = [
    {
      label: "Dashboard",
      route: 'dashboard' as Route,
      href: '/dashboard',
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
      ),
    },
    {
      label: "Training",
      route: 'training' as Route,
      href: '/training',
      icon: (
        <IconSchool className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
      ),
    },
    {
      label: "1v1",
      route: '1v1' as Route,
      href: '/1v1',
      icon: (
        <IconSword className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
      ),
    },
    {
      label: "Playground",
      route: 'playground' as Route,
      href: '/playground',
      icon: (
        <IconCode className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
      ),
    },
    {
      label: "Settings",
      route: null,
      href: '#',
      icon: (
        <IconSettings className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
      ),
    },
    {
      label: "Logout",
      route: null,
      href: '#',
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
      ),
      onClick: () => {
        logout();
      },
    },
  ];

  const handleLinkClick = (link: typeof links[0]) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.route !== null && link.href) {
      if (isClient && router) {
        router.push(link.href);
      } else if (typeof window !== 'undefined') {
        window.location.href = link.href;
      }
    }
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "User";
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-1">
            {links.map((link, idx) => {
              const isActive = link.route !== null && currentRoute === link.route;
              
              return (
                <div
                  key={idx}
                  className="mx-1 cursor-pointer rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <SidebarLink
                    link={{
                      label: link.label,
                      href: link.href,
                      icon: link.icon,
                    }}
                    onClick={() => handleLinkClick(link)}
                  />
                </div>
              );
            })}
          </div>
          {/* Theme Toggle */}
          <ThemeToggleButton />
        </div>
        <div 
          className={cn("rounded-lg py-1", open ? "mx-1 px-2" : "mx-0 px-0")}
          style={{ backgroundColor: 'transparent' }}
        >
          <SidebarLink
            link={{
              label: getUserDisplayName(),
              href: "#",
              icon: (
                <div 
                  className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ 
                    backgroundColor: 'var(--color-info)',
                    color: '#ffffff'
                  }}
                >
                  {getUserInitials()}
                </div>
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <div className="mx-1">
      <a
        href="#"
        className="relative z-20 flex items-center justify-start gap-2 py-2 px-2 text-sm font-normal"
      >
        <div 
          className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"
          style={{ backgroundColor: 'var(--text-primary)' }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-semibold whitespace-pre"
          style={{ color: 'var(--text-primary)' }}
        >
          CodeStandoff
        </motion.span>
      </a>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="mx-1">
      <a
        href="#"
        className="relative z-20 flex items-center justify-start py-2 px-2 text-sm font-normal"
      >
        <div 
          className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"
          style={{ backgroundColor: 'var(--text-primary)' }}
        />
      </a>
    </div>
  );
};

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const { open, animate } = useSidebar();
  
  return (
    <div className="mt-4 mx-1">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleTheme();
        }}
        className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 w-full rounded-lg cursor-pointer transition-colors"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {theme === 'dark' ? (
          <IconSun className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
        ) : (
          <IconMoon className="h-5 w-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
        )}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          {theme === 'dark' ? "Light Mode" : "Dark Mode"}
        </motion.span>
      </button>
    </div>
  );
};
