
'use client';

import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useUser } from "@/firebase";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from '@/hooks/use-toast';
import { uploadFileAndGetURL } from '@/lib/firebase/storage';
import { updateProfile } from 'firebase/auth';
import { updateUserProfile } from '@/lib/firebase/users';
import { Loader } from 'lucide-react';

export default function ProfilePage() {
    const { t } = useTranslation();
    const auth = useAuth();
    const { user, profile, isUserLoading } = useUser();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        try {
            const photoURL = await uploadFileAndGetURL(file, `avatars/${user.uid}`);
            
            if (auth.currentUser) {
              await updateProfile(auth.currentUser, { photoURL });
            }
            // Also update the photoURL in the Firestore user profile
            await updateUserProfile(user.uid, { photoURL });
            
            toast({
                title: "Avatar changé !",
                description: "Votre nouvelle photo de profil a été mise à jour.",
            });
        } catch (error) {
            console.error("Error uploading avatar:", error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de changer l'avatar. Veuillez réessayer.",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    if (isUserLoading || !user || !profile) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    return (
        <div className="flex flex-col gap-8">
            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle>{t('personal_information')}</CardTitle>
                    <CardDescription>{t('personal_information_description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 border-2 border-primary">
                            <AvatarImage src={profile?.photoURL ?? user?.photoURL ?? "https://picsum.photos/seed/user-avatar/100/100"} />
                            <AvatarFallback>{profile?.firstName?.charAt(0) ?? user?.email?.charAt(0)?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/png, image/jpeg, image/gif"
                            className="hidden"
                            disabled={isUploading}
                        />
                        <Button variant="outline" onClick={triggerFileSelect} disabled={isUploading}>
                            {isUploading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            {isUploading ? "Chargement..." : t('change_avatar')}
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('name')}</Label>
                            <Input id="name" defaultValue={`${profile.firstName} ${profile.lastName}`} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('email')}</Label>
                            <Input id="email" type="email" defaultValue={user.email ?? ''} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle>{t('password')}</CardTitle>
                    <CardDescription>{t('password_description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">Cette fonctionnalité est en cours de développement.</p>
                </CardContent>
            </Card>

        </div>
    );
}
