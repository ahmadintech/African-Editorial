import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { Footer } from "@/Components/footer"
import { Head } from "@inertiajs/react"

export default function About() {
 return (
 <>
 <Head title="About Us" />
 <BreakingNewsTicker />
 <Header />

 <main className="bg-background">
 {/* Hero section */}
 <div className="relative h-80 sm:h-96 w-full bg-gradient-to-r from-primary to-primary/80">
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="text-center px-4">
 <h1 className="editorial-headline text-white mb-4">About African Editorial</h1>
 <p className="text-xl text-white/90 max-w-2xl mx-auto">
 Independent journalism telling Africa's stories with depth, integrity, and impact
 </p>
 </div>
 </div>
 </div>

 {/* Mission section */}
 <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="section-title mb-8">Our Mission</h2>
 <p className="text-lg text-foreground leading-relaxed mb-6">
 African Editorial is committed to delivering authoritative, in-depth journalism that illuminates the
 continent's most pressing issues. We believe that Africa's stories deserve to be told by those who
 understand the complexity, nuance, and humanity at their core.
 </p>
 <p className="text-lg text-foreground leading-relaxed">
 From investigative reports on corruption and inequality to deep dives into innovation and development, we
 provide the context and analysis necessary for understanding Africa in the 21st century.
 </p>
 </section>

 {/* Values section */}
 <section className="bg-muted/30 py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="section-title mb-12">Our Values</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div>
 <h3 className="text-xl font-bold text-foreground mb-3">Integrity</h3>
 <p className="text-foreground/80">
 We uphold the highest standards of journalistic ethics, fact-checking, and accountability in all our
 reporting.
 </p>
 </div>
 <div>
 <h3 className="text-xl font-bold text-foreground mb-3">Independence</h3>
 <p className="text-foreground/80">
 Our editorial decisions are guided solely by the public interest, free from political or commercial
 pressure.
 </p>
 </div>
 <div>
 <h3 className="text-xl font-bold text-foreground mb-3">Impact</h3>
 <p className="text-foreground/80">
 We strive to produce journalism that drives meaningful change and informs public discourse across the
 continent.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Team section */}
 <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="section-title mb-12">Our Team</h2>
 <p className="text-lg text-foreground leading-relaxed mb-8">
 African Editorial is staffed by experienced journalists, researchers, and editors with deep connections
 across Africa and the world. Our team includes award-winning investigative reporters, data journalists, and
 editorial experts dedicated to telling Africa's stories with rigor and nuance.
 </p>
 <p className="text-lg text-foreground leading-relaxed">
 We collaborate with networks of freelance journalists, analysts, and contributors across Africa, ensuring
 that our reporting reflects diverse perspectives and on-the-ground expertise.
 </p>
 </section>

 {/* Recognition section */}
 <section className="bg-muted/30 py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="section-title mb-8">Recognition</h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
 {[
 "International Press Awards 2023",
 "Excellence in Investigative Journalism",
 "African Media Excellence Prize",
 "Digital Innovation Award",
 ].map((award) => (
 <div key={award} className="bg-background p-6 rounded-lg text-center">
 <p className="font-bold text-foreground text-sm">{award}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 </main>

 <Footer />
 </>
 )
}
