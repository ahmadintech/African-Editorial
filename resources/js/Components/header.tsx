"use client"

import type React from "react"
import { useState } from "react"
import { Link, usePage, router } from "@inertiajs/react"
import { Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
    { name: "Home", href: "/" },
    { name: "News", href: "/latest-news" },
    { name: "Politics", href: "/category/politics" },
    { name: "Business", href: "/category/business" },
    { name: "Economy", href: "/category/economy" },
    { name: "Investigations", href: "/category/investigations" },
    { name: "Opinion", href: "/category/opinion" },
    { name: "Features", href: "/category/features" },
    { name: "Africa", href: "/category/africa" },
    { name: "World", href: "/category/world" },
    { name: "Data & Reports", href: "/category/data-reports" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export function Header() {
    const { props } = usePage();
    const settings = (props.settings || {}) as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.get((window as any).route('search'), { q: searchQuery })
            setSearchOpen(false)
            setSearchQuery("")
            setMobileMenuOpen(false)
        }
    }

    return (
        <header className="sticky top-0 z-40 bg-background border-b border-border">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Logo and main nav */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        {settings?.logo_url ? (
                            <img src={settings.logo_url} alt={settings.site_name || "African Editorial"} className="h-8 w-auto object-contain" />
                        ) : (
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">A</span>
                            </div>
                        )}
                        <span className="font-bold text-xl text-foreground hidden sm:inline">{settings?.site_name || "African Editorial"}</span>
                        <span className="font-bold text-lg text-foreground sm:hidden">
                            {settings?.site_name ? settings.site_name.split(' ').map((word: string) => word[0]).join('').toUpperCase() : "AE"}
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navigation.slice(0, 6).map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="relative group">
                            <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">More</button>
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {navigation.slice(6).map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-card-foreground hover:bg-muted first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`relative flex items-center transition-all duration-300 ${searchOpen ? 'w-48 sm:w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                            <form onSubmit={handleSearch} className="w-full">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full bg-muted border border-border rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus={searchOpen}
                                />
                            </form>
                        </div>
                        <button
                            className={`p-2 rounded transition-colors ${searchOpen ? 'text-primary' : 'text-foreground hover:bg-muted'}`}
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <ThemeToggle />
                        <button
                            className="lg:hidden p-2 text-foreground hover:bg-muted rounded transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-border">
                        <div className="space-y-2">
                            <form onSubmit={handleSearch} className="px-4 mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-3 top-2.5">
                                        <Search className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                            </form>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
