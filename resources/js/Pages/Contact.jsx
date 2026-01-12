import { useState } from "react"
import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { Footer } from "@/Components/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Head } from "@inertiajs/react"

export default function Contact() {
 const [formData, setFormData] = useState({
 name: "",
 email: "",
 subject: "",
 message: "",
 })
 const [submitted, setSubmitted] = useState(false)

 const handleChange = (e) => {
 const { name, value } = e.target
 setFormData((prev) => ({
 ...prev,
 [name]: value,
 }))
 }

 const handleSubmit = (e) => {
 e.preventDefault()
 // In production, send to backend API
 console.log("Form submitted:", formData)
 setSubmitted(true)
 setFormData({ name: "", email: "", subject: "", message: "" })
 setTimeout(() => setSubmitted(false), 5000)
 }

 return (
 <>
 <Head title="Contact Us" />
 <BreakingNewsTicker />
 <Header />

 <main className="bg-background">
 {/* Hero section */}
 <div className="relative h-80 sm:h-96 w-full bg-gradient-to-r from-primary to-primary/80">
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="text-center px-4">
 <h1 className="editorial-headline text-white mb-4">Contact Us</h1>
 <p className="text-xl text-white/90">Get in touch with African Editorial</p>
 </div>
 </div>
 </div>

 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 {/* Contact information */}
 <div>
 <h2 className="section-title mb-8">Get In Touch</h2>

 <div className="space-y-8">
 <div className="flex gap-4">
 <div className="flex-shrink-0">
 <Mail className="w-6 h-6 text-primary mt-1" />
 </div>
 <div>
 <h3 className="font-bold text-foreground mb-2">Email</h3>
 <a href="mailto:info@africaneditorial.com" className="text-primary hover:underline">
 info@africaneditorial.com
 </a>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="flex-shrink-0">
 <Phone className="w-6 h-6 text-primary mt-1" />
 </div>
 <div>
 <h3 className="font-bold text-foreground mb-2">Phone</h3>
 <a href="tel:+256414252600" className="text-primary hover:underline">
 +256 (414) 252-600
 </a>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="flex-shrink-0">
 <MapPin className="w-6 h-6 text-primary mt-1" />
 </div>
 <div>
 <h3 className="font-bold text-foreground mb-2">Address</h3>
 <p className="text-foreground/80">
 Kampala, Uganda
 <br />
 East Africa
 </p>
 </div>
 </div>
 </div>

 <div className="mt-12 pt-8 border-t border-border">
 <h3 className="font-bold text-foreground mb-4">Departments</h3>
 <div className="space-y-3 text-sm">
 <div>
 <p className="font-semibold text-foreground">Editorial</p>
 <a href="mailto:editorial@africaneditorial.com" className="text-primary hover:underline text-xs">
 editorial@africaneditorial.com
 </a>
 </div>
 <div>
 <p className="font-semibold text-foreground">Investigations</p>
 <a
 href="mailto:investigations@africaneditorial.com"
 className="text-primary hover:underline text-xs"
 >
 investigations@africaneditorial.com
 </a>
 </div>
 <div>
 <p className="font-semibold text-foreground">Tips & Story Ideas</p>
 <a href="mailto:tips@africaneditorial.com" className="text-primary hover:underline text-xs">
 tips@africaneditorial.com
 </a>
 </div>
 </div>
 </div>
 </div>

 {/* Contact form */}
 <div>
 <h2 className="section-title mb-8">Send us a Message</h2>

 {submitted && (
 <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
 <p className="text-green-600 font-semibold">Thank you for your message! We'll be in touch soon.</p>
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
 Name
 </label>
 <input
 type="text"
 id="name"
 name="name"
 value={formData.name}
 onChange={handleChange}
 required
 className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
 placeholder="Your name"
 />
 </div>

 <div>
 <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
 Email
 </label>
 <input
 type="email"
 id="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 required
 className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
 placeholder="your@email.com"
 />
 </div>

 <div>
 <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
 Subject
 </label>
 <input
 type="text"
 id="subject"
 name="subject"
 value={formData.subject}
 onChange={handleChange}
 required
 className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
 placeholder="How can we help?"
 />
 </div>

 <div>
 <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
 Message
 </label>
 <textarea
 id="message"
 name="message"
 value={formData.message}
 onChange={handleChange}
 required
 rows={6}
 className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
 placeholder="Your message..."
 />
 </div>

 <button
 type="submit"
 className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
 >
 <Send className="w-4 h-4" />
 Send Message
 </button>
 </form>
 </div>
 </div>
 </div>
 </main>

 <Footer />
 </>
 )
}
