import React, { useState, useRef } from 'react';
import { useAuth } from '../Context/AuthContext';
import { updateProfile, uploadAvatar } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, User, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Profile = () => {
    const { user, updateUser } = useAuth();

    const [username, setUsername] = useState(user?.username || '');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const fileInputRef = useRef(null);

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!username.trim()) {
            setErrorMessage('Username cannot be empty.');
            return;
        }

        setIsUpdatingProfile(true);
        try {
            const res = await updateProfile(username);
            updateUser(res.user);
            setSuccessMessage('Username updated successfully!');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Failed to update username.');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSuccessMessage('');
        setErrorMessage('');

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setErrorMessage('Please select a valid image file (PNG, JPG, WEBP).');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage('File size must be less than 5MB.');
            return;
        }

        setIsUploadingAvatar(true);
        try {
            const res = await uploadAvatar(file);
            updateUser(res.user);
            setSuccessMessage('Profile photo updated successfully!');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Failed to upload image.');
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    return (
        <div className="min-h-[85vh] py-12 px-4 bg-gradient-to-br from-background via-background/95 to-primary/5">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Avatar / Quick Info Card */}
                <Card className="md:col-span-1 bg-card/60 backdrop-blur-xl border border-border/80 shadow-2xl h-fit">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl font-bold">Profile Photo</CardTitle>
                        <CardDescription>Click to change your photo</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg relative bg-secondary flex items-center justify-center">
                                {isUploadingAvatar ? (
                                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <img 
                                        src={user?.avatar} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                    />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                                <Camera className="w-4 h-4" />
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isUploadingAvatar}
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg">{user?.username}</h3>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings Form Card */}
                <Card className="md:col-span-2 bg-card/60 backdrop-blur-xl border border-border/80 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                            Account Settings
                        </CardTitle>
                        <CardDescription>Update your public username and account details.</CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={handleUsernameSubmit}>
                        <CardContent className="space-y-6">
                            {successMessage && (
                                <div className="p-3.5 rounded-lg border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-2 animate-in fade-in duration-300">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 animate-in fade-in duration-300">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        className="pl-10 bg-muted/50 border-border/85"
                                        value={user?.email || ''}
                                        disabled
                                        readOnly
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="yourusername"
                                        className="pl-10 bg-background/50 border-border/85"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isUpdatingProfile}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="flex justify-end pt-2">
                            <Button 
                                type="submit" 
                                className="h-11 px-6 text-sm font-medium transition-all shadow-lg hover:shadow-primary/20"
                                disabled={isUpdatingProfile}
                            >
                                {isUpdatingProfile ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
