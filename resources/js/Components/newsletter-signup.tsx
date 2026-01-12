"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
 const [email, setEmail] = useState("")
 const [subscribed, setSubscribed] = useState(false)

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault()
 if (email) {
 setSubscribed(true)
 setEmail("")
 setTimeout(() => setSubscribed(false), 3000)
 }
 }

 return (
 <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
 <div className="bg-primary text-primary-foreground rounded-lg p-8 sm:p-12">
 <div className="flex items-center gap-3 mb-4">
 <Mail className="w-6 h-6" />
 <h2 className="text-2xl sm:text-3xl font-bold">Subscribe to African Editorial</h2>
 </div>

 <p className="text-primary-foreground/90 mb-6 text-lg">
 Get the latest in-depth reporting, investigations, and analysis delivered to your inbox
 </p>

 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
 <input
 type="email"
 placeholder="your@email.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="flex-1 px-4 py-3 rounded bg-primary-foreground text-primary placeholder-muted-foreground outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-primary"
 required
 />
 <button
 type="submit"
 className="px-6 py-3 rounded bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-colors whitespace-nowrap"
 >
 Subscribe
 </button>
 </form>

 {subscribed && <p className="text-sm mt-4 text-primary-foreground/80">Thank you for subscribing!</p>}
 </div>
 </section>
 )
}
