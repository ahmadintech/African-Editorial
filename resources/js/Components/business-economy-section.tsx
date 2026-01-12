"use client"

import { NewsCard } from "./news-card"

const businessEconomyStories = [
 {
 id: 18,
 title: "Tech Unicorns: African Startups Reaching New Heights",
 summary: "Venture capital flows surge into promising African technology companies",
 category: "Business",
 author: "Obi Okoro",
 date: "2024-01-10",
 image: "/african-startup-unicorn.jpg",
 readTime: "8 min",
 },
 {
 id: 19,
 title: "Energy Transition: Renewable Power Projects Transform Infrastructure",
 summary: "Investment in solar and wind energy reshaping the continent's power sector",
 category: "Economy",
 author: "Lerato Makhanya",
 date: "2024-01-09",
 image: "/renewable-energy-solar-africa.jpg",
 readTime: "9 min",
 },
 {
 id: 20,
 title: "Financial Inclusion: Banking the Unbanked Population",
 summary: "Mobile money and digital services are expanding access to financial services",
 category: "Economy",
 author: "Ibrahim Hassan",
 date: "2024-01-08",
 image: "/mobile-banking-financial-inclusion.jpg",
 readTime: "7 min",
 },
]

export function BusinessEconomySection() {
 return (
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Business & Economy</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {businessEconomyStories.map((story) => (
 <NewsCard key={story.id} {...story} />
 ))}
 </div>
 </section>
 )
}
