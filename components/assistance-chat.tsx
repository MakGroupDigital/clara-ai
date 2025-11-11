
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
import { askClara } from '@/ai/flows/assistance-flow';

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
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await askClara({ question: input });
            const assistantMessage: Message = { role: 'assistant', content: result.answer };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = { role: 'assistant', content: t('error_toast_title') };
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
                    className="fixed bottom-8 right-8 rounded-full h-16 w-16"
                >
                    <MessageCircleQuestion size={32} />
                    <span className="sr-only">{t('assistance')}</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[75vh] flex flex-col">
                <SheetHeader>
                    <SheetTitle className="font-headline">
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span>
                    </SheetTitle>
                    <SheetDescription>
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span> modèle LLM expert en ressources humaines
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 p-4 pr-6 -mx-6">
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'assistant' && (
                                    <Avatar className="h-8 w-8 border-2 border-primary/50">
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "rounded-lg p-3 max-w-[75%]",
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                )}>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                     <Avatar className="h-8 w-8 border-2 border-muted-foreground/50">
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-4">
                                <Avatar className="h-8 w-8 border-2 border-primary/50">
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 bg-muted flex items-center">
                                    <Loader className="h-5 w-5 animate-spin text-primary"/>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="flex gap-2 p-4 -m-6 border-t bg-background">
                    <Input
                        placeholder={t('type_your_message')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
