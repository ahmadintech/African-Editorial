"use client"

import { Link, usePage } from "@inertiajs/react"
import { Twitter, Facebook, Linkedin, Mail } from "lucide-react"

export function Footer() {
    const { settings } = usePage().props as any;

    return (
        <footer className="bg-secondary text-secondary-foreground border-t border-border mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Footer content grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            {settings?.logo_url ? (
                                <img src={settings.logo_url} alt={settings.site_name || "African Editorial"} className="h-6 w-auto object-contain" />
                            ) : (
                                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">A</span>
                                </div>
                            )}
                            <span className="font-bold">{settings?.site_name || "African Editorial"}</span>
                        </div>
                        <p className="text-sm text-secondary-foreground/80">
                            {settings?.site_description || "Premium African news platform featuring deep-dive journalism, investigative reporting, and policy analysis."}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/editorial" className="hover:text-primary transition-colors">
                                    Editorial Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            {settings?.twitter_url && (
                                <a
                                    href={settings.twitter_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.facebook_url && (
                                <a
                                    href={settings.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.linkedin_url && (
                                <a
                                    href={settings.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            <a
                                href={`mailto:${settings?.contact_email || "hello@africaneditorial.com"}`}
                                className="p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/80">
                    <p>{settings?.copyright_text || "© 2026 African Editorial. All rights reserved."}</p>
                </div>
            </div>
        </footer>
    )
}
