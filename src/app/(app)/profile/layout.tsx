
'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, CreditCard } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">{t('settings')}</h1>
            
            <div className="grid gap-8 lg:grid-cols-4">
                <div className="lg:col-span-1">
                     <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>{t('navigation')}</CardTitle>
                            <CardDescription>{t('profile_nav_description')}</CardDescription>
                        </CardHeader>
                        <nav className="flex flex-col gap-1 p-2">
                             <Link href="/profile" >
                                <div className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${pathname === '/profile' ? 'bg-muted' : ''}`}>
                                    <User className="h-4 w-4"/>
                                    <span>{t('profile')}</span>
                                </div>
                            </Link>
                             <Link href="/profile/subscription" >
                                <div className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${pathname === '/profile/subscription' ? 'bg-muted' : ''}`}>
                                    <CreditCard className="h-4 w-4"/>
                                    <span>{t('subscription')}</span>
                                </div>
                            </Link>
                        </nav>
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
