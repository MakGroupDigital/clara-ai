
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircleQuestion, Send, Bot, User, Loader } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export function AssistanceChat() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        const currentInput = input;
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/assistance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: currentInput }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la réception de la réponse');
            }

            const result = await response.json();
            const assistantMessage: Message = { 
                role: 'assistant', 
                content: result.answer || result.error || 'Désolé, une erreur est survenue.' 
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error: any) {
            console.error('Erreur lors de l\'envoi du message:', error);
            const errorMessage: Message = { 
                role: 'assistant', 
                content: error.message || t('error_toast_title') || 'Désolé, une erreur est survenue. Veuillez réessayer.' 
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="default"
                    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 rounded-full h-14 w-14 sm:h-16 sm:w-16 z-50 shadow-lg"
                >
                    <MessageCircleQuestion className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="sr-only">{t('assistance')}</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] sm:h-[75vh] flex flex-col p-0 gap-0">
                <SheetHeader className="px-4 pt-4 pb-2 border-b">
                    <SheetTitle className="font-headline text-lg sm:text-xl">
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span>
                    </SheetTitle>
                    <SheetDescription className="text-xs sm:text-sm">
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span> modèle LLM expert en ressources humaines
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 sm:space-y-6">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground text-sm py-8">
                                Posez votre question à Clara.ai
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-2 sm:gap-4", message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'assistant' && (
                                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-primary/50 flex-shrink-0 bg-background">
                                        <AvatarFallback className="bg-background p-0.5">
                                            <div className="h-full w-full flex items-center justify-center">
                                                <svg
                                                    width="100%"
                                                    height="100%"
                                                    viewBox="0 0 52 52"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="text-primary"
                                                >
                                                    <defs>
                                                        <linearGradient id="logo-gradient-chat" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                                                            <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                                                        </linearGradient>
                                                    </defs>
                                                    <path d="M26 4C14.9543 4 6 12.9543 6 24C6 35.0457 14.9543 44 26 44C37.0457 44 46 35.0457 46 24C46 12.9543 37.0457 4 26 4Z" stroke="url(#logo-gradient-chat)" strokeWidth="1.5"/>
                                                    <path d="M26 12V18" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                    <path d="M26 30V36" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                    <path d="M36 24H30" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                    <path d="M22 24H16" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                    <path d="M21 21L17 17" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                    <path d="M31 21L35 17" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                    <path d="M21 27L17 31" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                    <path d="M31 27L35 31" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                    <rect x="22" y="20" width="8" height="8" rx="1.5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                </svg>
                                            </div>
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "rounded-lg p-3 max-w-[85%] sm:max-w-[75%] break-words",
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                )}>
                                    <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                     <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-muted-foreground/50 flex-shrink-0">
                                        <AvatarFallback><User className="h-4 w-4 sm:h-5 sm:w-5" /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-2 sm:gap-4">
                                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-primary/50 flex-shrink-0 bg-background">
                                    <AvatarFallback className="bg-background p-0.5">
                                        <div className="h-full w-full flex items-center justify-center">
                                            <svg
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 52 52"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-primary"
                                            >
                                                <defs>
                                                    <linearGradient id="logo-gradient-loading" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                                                        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M26 4C14.9543 4 6 12.9543 6 24C6 35.0457 14.9543 44 26 44C37.0457 44 46 35.0457 46 24C46 12.9543 37.0457 4 26 4Z" stroke="url(#logo-gradient-loading)" strokeWidth="1.5"/>
                                                <path d="M26 12V18" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                <path d="M26 30V36" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                <path d="M36 24H30" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                <path d="M22 24H16" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                                <path d="M21 21L17 17" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                <path d="M31 21L35 17" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                <path d="M21 27L17 31" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                <path d="M31 27L35 31" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
                                                <rect x="22" y="20" width="8" height="8" rx="1.5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                                            </svg>
                                        </div>
                                    </AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 bg-muted flex items-center">
                                    <Loader className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary"/>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="flex gap-2 p-3 sm:p-4 border-t bg-background">
                    <Input
                        placeholder={t('type_your_message')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                        className="text-sm sm:text-base flex-1"
                    />
                    <Button onClick={handleSend} disabled={isLoading} size="icon" className="h-10 w-10 sm:h-11 sm:w-11">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
