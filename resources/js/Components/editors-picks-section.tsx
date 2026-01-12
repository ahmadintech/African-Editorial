"use client"

import { NewsCard } from "./news-card"
import { MobileCarousel } from "./mobile-carousel"

const editorsPicks = [
 {
 id: 6,
 title: "Behind the Scenes: How African Journalists Cover Breaking News",
 summary: "An intimate look at the challenges and triumphs of investigative reporting on the continent",
 category: "Features",
 author: "Isabel Munhuirire",
 date: "2024-01-03",
 image: "/african-journalist-newsroom.jpg",
 readTime: "11 min",
 },
 {
 id: 7,
 title: "Cultural Renaissance: Art and Music Shape African Identity",
 summary: "Emerging artists are redefining what it means to create contemporary African culture",
 category: "Culture",
 author: "Thierry Ngandu",
 date: "2024-01-02",
 image: "/african-art-culture-music.jpg",
 readTime: "9 min",
 },
 {
 id: 8,
 title: "Infrastructure Development: Building the Future Africa",
 summary: "Major projects across the continent aim to transform connectivity and commerce",
 category: "Development",
 author: "Adeyemi Olakunle",
 date: "2024-01-01",
 image: "/african-infrastructure-construction.jpg",
 readTime: "10 min",
 },
]

export function EditorsPicksSection() {
 return (
 <section className="py-12 border-t border-border">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Editor's Picks</h2>

 <div className="hidden md:block">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {editorsPicks.map((story) => (
 <NewsCard key={story.id} {...story} />
 ))}
 </div>
 </div>

 <div className="md:hidden">
 <MobileCarousel>
 {editorsPicks.map((story) => (
 <div key={story.id} className="carousel-card">
 <NewsCard {...story} />
 </div>
 ))}
 </MobileCarousel>
 </div>
 </section>
 )
}
