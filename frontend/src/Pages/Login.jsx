import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!email.trim() || !password.trim()) {
            setFormError('Email and Password are required.');
            return;
        }

        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setFormError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background/95 to-primary/5">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/80 shadow-2xl shadow-primary/5">
                <CardHeader className="space-y-2 text-center pb-6">
                    <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm font-medium">
                        Log in to your account to start analyzing repositories.
                    </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {formError && (
                            <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-sm font-medium animate-in fade-in duration-300">
                                {formError}
                            </div>
                        )}
                        
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 bg-background/50 border-border/85"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password font-medium text-sm">Password</Label>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-xs text-primary font-semibold hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 bg-background/50 border-border/85"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col space-y-4 pt-4">
                        <Button 
                            type="submit" 
                            className="w-full h-11 text-sm font-medium transition-all shadow-lg hover:shadow-primary/20"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        
                        <div className="text-center text-xs text-muted-foreground font-medium">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary hover:underline font-semibold">
                                Create an account
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
