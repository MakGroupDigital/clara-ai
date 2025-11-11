
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/hooks/use-translation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAuth } from '@/firebase'
import { initiateEmailSignIn } from '@/firebase/non-blocking-login'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FirebaseError } from 'firebase/app'
import { sendPasswordResetEmail } from 'firebase/auth'

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function LoginPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isResetDialogOpen, setResetDialogOpen] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await initiateEmailSignIn(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/invalid-credential') {
        toast({
          variant: 'destructive',
          title: 'Identifiants invalides',
          description: 'Veuillez vérifier votre e-mail et votre mot de passe.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: t('error_toast_title'),
          description: 'Une erreur inconnue est survenue.',
        });
        console.error('Sign in error:', error);
      }
    }
  };

  const handlePasswordReset = async (data: ResetPasswordFormValues) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "E-mail envoyé",
        description: "Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.",
      });
      setResetDialogOpen(false);
      resetForm.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('error_toast_title'),
        description: "Impossible d'envoyer l'e-mail. Vérifiez que l'adresse est correcte.",
      });
    }
  }

  return (
    <Card className="bg-card/80 border-primary/20 shadow-glow-primary-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-headline">{t('login_welcome_back')}</CardTitle>
        <CardDescription>{t('login_prompt')}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{t('password')}</FormLabel>
                    <Dialog open={isResetDialogOpen} onOpenChange={setResetDialogOpen}>
                      <DialogTrigger asChild>
                         <button type="button" className="ml-auto inline-block text-sm underline">
                          {t('forgot_password')}
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
                          <DialogDescription>
                            Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...resetForm}>
                          <form onSubmit={resetForm.handleSubmit(handlePasswordReset)} className="space-y-4">
                            <FormField
                              control={resetForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t('email')}</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="m@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter>
                              <Button type="submit" disabled={resetForm.formState.isSubmitting}>
                                Envoyer le lien
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" disabled={form.formState.isSubmitting}>
              {t('login_button')}
            </Button>
          </CardContent>
        </form>
      </Form>
      <CardFooter className="flex-col gap-4">
        <div className="text-center text-sm">
          {t('no_account')}{' '}
          <Link href="/signup" className="underline">
            {t('signup_link')}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
