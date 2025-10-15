'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CookieConsent from '@/components/ui/CookieConsent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useEffect, useMemo, useState } from 'react';

const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
  loading: () => null,
});

const LIGHT_PAGES = ['/impressum', '/datenschutz', '/blog'] as const;
const FULL_SCREEN_DEMO_PAGES = [
  '/demos/LeadScoringEngine',
  '/demos/LiveAnalyticsDashboard',
  '/demos/WhatsAppBusinessDemo',
  '/demos/liquid-distortion',
  '/leistungen/fitness-crm/demo',
  '/leistungen/fitness-crm/demo/intervention',
  '/leistungen/website/shop',
  '/leistungen/website/colour-harmoniser',
] as const;

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const [shouldHydrateChat, setShouldHydrateChat] = useState(false);

  const isLightPage = useMemo(
    () => LIGHT_PAGES.some((page) => pathname.startsWith(page)),
    [pathname]
  );

  const shouldHideHeaderAndFooter = useMemo(
    () => FULL_SCREEN_DEMO_PAGES.some((page) => pathname.startsWith(page)),
    [pathname]
  );

  const shouldHideChatbot = shouldHideHeaderAndFooter;

  useEffect(() => {
    if (shouldHideChatbot) {
      setShouldHydrateChat(false);
      return;
    }

    let cancelled = false;

    const enableChat = () => {
      if (!cancelled) {
        setShouldHydrateChat(true);
      }
    };

    if (typeof window === 'undefined') {
      return undefined;
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const idleHandle = win.requestIdleCallback(enableChat, { timeout: 4000 });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(idleHandle);
      };
    }

    const timeoutHandle = window.setTimeout(enableChat, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutHandle);
    };
  }, [shouldHideChatbot]);

  return (
    <div className={`min-h-screen ${isLightPage ? 'bg-white text-gray-900' : 'bg-black text-white'}`}>
      <CookieConsent />

      {!shouldHideHeaderAndFooter && <Header />}

      <main>{children}</main>

      {!shouldHideHeaderAndFooter && <Footer />}

      {shouldHydrateChat && !shouldHideChatbot ? <ChatWidget /> : null}
    </div>
  );
}

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
