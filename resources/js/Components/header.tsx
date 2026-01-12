"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import { Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
 { name: "Home", href: "/" },
 { name: "News", href: "/latest-news" },
 { name: "Politics", href: "/tag/politics" },
 { name: "Business", href: "/tag/business" },
 { name: "Economy", href: "/tag/economy" },
 { name: "Investigations", href: "/tag/investigations" },
 { name: "Opinion", href: "/tag/opinion" },
 { name: "Features", href: "/tag/features" },
 { name: "Africa", href: "/tag/africa" },
 { name: "World", href: "/tag/world" },
 { name: "Data & Reports", href: "/tag/data-reports" },
 { name: "About", href: "/about" },
 { name: "Contact", href: "/contact" },
]

export function Header() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

 return (
 <header className="sticky top-0 z-40 bg-background border-b border-border">
 <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
 {/* Logo and main nav */}
 <div className="flex items-center justify-between">
 <Link href="/" className="flex items-center gap-2">
 <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
 <span className="text-primary-foreground font-bold text-lg">A</span>
 </div>
 <span className="font-bold text-xl text-foreground hidden sm:inline">African Editorial</span>
 <span className="font-bold text-lg text-foreground sm:hidden">AE</span>
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
 <button className="p-2 text-foreground hover:bg-muted rounded transition-colors">
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
