import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background">
            <Head title="Log in" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-card shadow-md overflow-hidden sm:rounded-lg border border-border">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                        <span className="text-primary-foreground font-bold text-2xl">A</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
                    <p className="text-muted-foreground text-sm">Welcome back, please log in.</p>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <label className="block font-medium text-sm text-foreground" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-border bg-background text-foreground rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 border"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="text-destructive text-xs mt-1">{errors.email}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-sm text-foreground" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-border bg-background text-foreground rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 border"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <div className="text-destructive text-xs mt-1">{errors.password}</div>}
                    </div>

                    <div className="mt-4 block italic">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-border text-primary shadow-sm focus:ring-primary h-4 w-4"
                            />
                            <span className="ms-2 text-sm text-muted-foreground cursor-pointer">Remember me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <button
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 focus:bg-primary/90 active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-25"
                            disabled={processing}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
