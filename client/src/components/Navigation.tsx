/**
 * NAVIGATION COMPONENT
 * 
 * Design Philosophy: Cinematic Dark Elegance
 * - Sticky header with minimal design
 * - Smooth scroll navigation
 * - Mobile-responsive menu
 */

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Tjenester', href: '#services' },
  { label: 'Om', href: '#about' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
         <a
  href="#hero"
  onClick={(e) => {
    e.preventDefault();
    handleNavClick('#hero');
  }}
  className="flex items-center gap-3 group"
>
  {/* 🔥 LOGO */}
  <img
    src="/logo.png"
    alt="Meo Studio"
    className="
      h-12 md:h-16
      w-auto
      object-contain

      transition-all duration-300
      group-hover:scale-105

      drop-shadow-[0_0_8px_rgba(255,180,100,0.3)]
      group-hover:drop-shadow-[0_0_16px_rgba(255,180,100,0.6)]
    "
  />

  {/* 🔥 TEKST */}
  <span className="text-xl font-bold text-primary transition-colors group-hover:text-primary/80">
    Meo Studio
  </span>
        </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
