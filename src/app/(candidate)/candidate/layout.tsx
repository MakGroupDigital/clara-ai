
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
import { Briefcase, MessageSquare, User, Settings, Languages, BotMessageSquare } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { useTranslation } from '@/hooks/use-translation'

function LanguageSwitcher() {
    const { setLanguage } = useLanguage();
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-[1.2rem] w-[1.2rem] text-primary" />
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

function CandidateLayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/candidate/dashboard" className="w-full">
                <SidebarMenuButton tooltip="Offres d'emploi">
                  <Briefcase />
                  <span>Offres d'emploi</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="#" className="w-full">
                <SidebarMenuButton tooltip="Mes entretiens">
                  <BotMessageSquare />
                  <span>Mes entretiens</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="#" className="w-full">
                <SidebarMenuButton tooltip="Messages">
                  <MessageSquare />
                  <span>Messages</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
          <Separator className="my-2" />
          <SidebarMenu>
             <SidebarMenuItem>
                <Link href="#" className="w-full">
                    <SidebarMenuButton tooltip="Profil">
                        <User />
                        <span>Profil</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="#" className="w-full">
                <SidebarMenuButton tooltip="Réglages">
                  <Settings />
                  <span>Réglages</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/50 px-6 backdrop-blur-sm border-primary/20">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
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


export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <CandidateLayoutContent>{children}</CandidateLayoutContent>
  )
}
