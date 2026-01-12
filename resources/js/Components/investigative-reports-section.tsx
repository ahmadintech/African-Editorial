"use client"

import { MinimalNewsCard } from "./minimal-news-card"
import { MobileCarousel } from "./mobile-carousel"

const investigativeReports = [
 {
 id: 9,
 title: "Corruption Networks: Following the Money Across African Borders",
 image: "/corruption-investigation-files.jpg",
 },
 {
 id: 10,
 title: "Environmental Crime: The Illegal Wildlife Trade Exposed",
 image: "/wildlife-poaching-investigation.jpg",
 },
 {
 id: 11,
 title: "Labor Rights: Uncovering Exploitation in African Supply Chains",
 image: "/labor-rights-factory-workers.jpg",
 },
]

export function InvestigativeReportsSection() {
 return (
 <section className="py-12 border-t border-border bg-muted/30">
 <div className="mb-8">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Investigative Reports</h2>
 <p className="text-muted-foreground">Deep-dive journalism uncovering stories that matter</p>
 </div>

 <div className="hidden md:block">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {investigativeReports.map((story) => (
 <MinimalNewsCard key={story.id} {...story} />
 ))}
 </div>
 </div>

 <div className="md:hidden">
 <MobileCarousel>
 {investigativeReports.map((story) => (
 <div key={story.id} className="carousel-card">
 <MinimalNewsCard {...story} />
 </div>
 ))}
 </MobileCarousel>
 </div>
 </section>
 )
}
