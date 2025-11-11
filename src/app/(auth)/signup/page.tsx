
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/hooks/use-translation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { initiateEmailSignUp } from '@/lib/firebase/non-blocking-login'
import { useAuth } from '@/firebase'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { FirebaseError } from 'firebase/app'

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis." }),
  lastName: z.string().min(1, { message: "Le nom de famille est requis." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await initiateEmailSignUp(auth, data.email, data.password, `${data.firstName} ${data.lastName}`);
      router.push('/dashboard');
    } catch (error) {
       if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        toast({
          variant: 'destructive',
          title: 'Email déjà utilisé',
          description: 'Cette adresse e-mail est déjà associée à un compte.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: t('error_toast_title'),
          description: "La création du compte a échoué. Veuillez réessayer.",
        });
        console.error('Sign up error:', error);
      }
    }
  };
  
  return (
    <Card className="bg-card/80 border-primary/20 shadow-glow-primary-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">{t('signup_title')}</CardTitle>
        <CardDescription>
            {t('signup_description_part1')} <span className="text-accent">Clara</span><span className="text-primary">.ai</span> {t('signup_description_part2')}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('first_name')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('last_name')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Robinson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full shadow-lg shadow-primary/30 hover-shadow-primary/50 transition-shadow" disabled={form.formState.isSubmitting}>
              {t('create_account_button')}
            </Button>
          </CardContent>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        {t('already_have_account')}{' '}
        <Link href="/login" className="underline">
          {t('login_link')}
        </Link>
      </div>
    </Card>
  )
}
