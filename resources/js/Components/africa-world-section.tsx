"use client"

import { NewsCard } from "./news-card"

const africaWorldStories = [
 {
 id: 15,
 title: "Continental Integration: The AfCFTA Effect",
 summary: "Analysis of how the African Continental Free Trade Area is reshaping business",
 category: "Africa",
 author: "Nandi Mthembu",
 date: "2024-01-10",
 image: "/afcfta-trade-agreement.jpg",
 readTime: "10 min",
 featured: true,
 },
 {
 id: 16,
 title: "Global Partnerships: African Influence on World Stage",
 summary: "How the continent is building strategic relationships with major world powers",
 category: "World",
 author: "Charles Andile",
 date: "2024-01-09",
 image: "/african-global-diplomacy.jpg",
 readTime: "9 min",
 },
 {
 id: 17,
 title: "Migration Crisis: Understanding African Diaspora",
 summary: "Exploring the economic and social impacts of African migration patterns",
 category: "World",
 author: "Amina Suleiman",
 date: "2024-01-08",
 image: "/african-migration-diaspora.jpg",
 readTime: "11 min",
 },
]

export function AfricaWorldSection() {
 return (
 <section className="w-full px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-muted/30">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Africa & World</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {africaWorldStories.map((story) => (
 <NewsCard key={story.id} {...story} />
 ))}
 </div>
 </section>
 )
}
