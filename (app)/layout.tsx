
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { UserNav } from '@/components/layout/user-nav'
import { Logo } from '@/components/logo'
import { Briefcase, Home, Users, Settings, Languages, Info, CreditCard, BotMessageSquare, BrainCircuit, PiggyBank, Loader } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { useTranslation } from '@/hooks/use-translation'
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

function LanguageSwitcher() {
    const { setLanguage } = useLanguage();
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">{t('change_language')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('fr')}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('pt')}>
                Português
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ln')}>
                Lingala
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    );
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { user, profile, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isUserLoading && !user) {
      router.replace('/login');
      return;
    }

    // After loading, if there's a user and profile, handle role-based redirection
    if (!isUserLoading && user && profile) {
      const isCandidateDashboard = pathname.startsWith('/candidate');

      if (profile.role === 'candidate' && !isCandidateDashboard) {
        router.replace('/candidate/dashboard');
      } else if (profile.role !== 'candidate' && isCandidateDashboard) {
        router.replace('/dashboard');
      }
    }
  }, [isUserLoading, user, profile, router, pathname]);

  // Global loading state for the entire authenticated app portion
  if (isUserLoading || (user && profile === undefined)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
            <Loader className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }
  
  if (profile?.role === 'candidate') {
    // The useEffect above already handles redirection, we can just show the children
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" className="w-full">
                <SidebarMenuButton tooltip={t('dashboard')}>
                  <Home />
                  <span>{t('dashboard')}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/jobs" className="w-full">
                <SidebarMenuButton tooltip={t('job_offers')}>
                  <Briefcase />
                  <span>{t('job_offers')}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/candidates" className="w-full">
                <SidebarMenuButton tooltip={t('candidates')}>
                  <Users />
                  <span>{t('candidates')}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/interviews" className="w-full">
                <SidebarMenuButton tooltip={t('video_interview')}>
                  <BotMessageSquare />
                  <span>{t('interviews')}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <Separator className="my-2" />

          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/feed-clara" className="w-full">
                    <SidebarMenuButton tooltip={"Nourrir Clara.ai"}>
                        <BrainCircuit />
                        <span>{"Nourrir Clara.ai"}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/finance" className="w-full">
                    <SidebarMenuButton tooltip={"Finance & Comptabilité"}>
                        <PiggyBank />
                        <span>{"Finance & Comptabilité"}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>

        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
          <Separator className="my-2" />
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/about" className="w-full">
                    <SidebarMenuButton tooltip={t('about')}>
                        <Info />
                        <span>{t('about')}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/profile/subscription" className="w-full">
                    <SidebarMenuButton tooltip={t('subscription')}>
                        <CreditCard />
                        <span>{t('subscription')}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/profile" className="w-full">
                <SidebarMenuButton tooltip={t('settings')}>
                  <Settings />
                  <span>{t('settings')}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/50 px-6 backdrop-blur-sm">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add page title here */}
          </div>
           <LanguageSwitcher />
          <UserNav />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayoutContent>{children}</AppLayoutContent>
  )
}
