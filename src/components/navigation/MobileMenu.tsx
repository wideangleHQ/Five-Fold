"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, X, Calculator, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface NavItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  currentPath,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 lg:hidden bg-slate-950/95 backdrop-blur-md flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green font-heading text-lg font-bold text-white">
                F
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-extrabold tracking-tight text-white leading-none">
                  FIVEFOLD
                </span>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-brand-amber mt-0.5">
                  RENEWABLE
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="px-6 py-6 overflow-y-auto flex-1 flex flex-col justify-start space-y-1">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                if (item.submenu) {
                  return (
                    <div key={item.name} className="space-y-1 py-1">
                      <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {item.name}
                      </div>
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                            currentPath === sub.href
                              ? "bg-brand-green text-white font-semibold"
                              : "text-slate-200 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <span>{sub.name}</span>
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </Link>
                      ))}
                    </div>
                  );
                }

                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-brand-green text-white font-semibold"
                        : "text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Contact & Bottom Actions */}
          <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                href="/solar-calculator"
                onClick={onClose}
                variant="amber"
                size="sm"
                className="w-full text-xs font-semibold py-2.5"
              >
                <Calculator className="mr-1.5 h-4 w-4" />
                <span>Solar Calculator</span>
              </Button>
              <Button
                href="/contact"
                onClick={onClose}
                variant="primary"
                size="sm"
                className="w-full text-xs font-semibold py-2.5"
              >
                <span>Free Consultation</span>
              </Button>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-amber shrink-0" />
                <span>+91 70081 01078 / +91 70081 33792</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-amber shrink-0" />
                <span>info@fivefoldsolar.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
