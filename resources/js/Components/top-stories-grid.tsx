"use client"

import { NewsCard } from "./news-card"
import { MobileCarousel } from "./mobile-carousel"

const topStories = [
 {
 id: 2,
 title: "Political Tensions Rise Over Border Disputes",
 summary: "Regional leaders meet to discuss long-standing territorial issues",
 category: "Politics",
 author: "Amina Hassan",
 date: "2024-01-07",
 image: "/african-political-meeting.jpg",
 readTime: "7 min",
 },
 {
 id: 3,
 title: "Inflation Crisis: Central Banks Take Action",
 summary: "Economic policy shifts aim to stabilize currencies across the continent",
 category: "Economy",
 author: "David Kwesi",
 date: "2024-01-06",
 image: "/african-economy-finance.jpg",
 readTime: "9 min",
 },
 {
 id: 4,
 title: "Education Reform Initiatives Show Early Success",
 summary: "New policies in South Africa and Rwanda demonstrate promising results",
 category: "Education",
 author: "Grace Mwangi",
 date: "2024-01-05",
 image: "/africa-education-classroom.jpg",
 readTime: "6 min",
 },
 {
 id: 5,
 title: "Health Crisis: Mpox Outbreak Updates",
 summary: "WHO coordinates response as cases increase in multiple regions",
 category: "Health",
 author: "Dr. Kofi Mensah",
 date: "2024-01-04",
 image: "/health-crisis-medical.jpg",
 readTime: "8 min",
 },
 {
 id: 6,
 title: "Tech Innovation: AI Research Centers Launch",
 summary: "African universities establish hubs for artificial intelligence development",
 category: "Technology",
 author: "Samuel Okafor",
 date: "2024-01-03",
 image: "/nigeria-tech-startup-innovation.jpg",
 readTime: "7 min",
 },
 {
 id: 7,
 title: "Trade Summit: New Regional Markets Emerge",
 summary: "Continental partnerships create fresh economic opportunities",
 category: "Business",
 author: "Naledi Sibiya",
 date: "2024-01-02",
 image: "/african-trade-investigation.jpg",
 readTime: "8 min",
 },
]

export function TopStoriesGrid() {
 return (
 <section className="py-12">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Top Stories</h2>

 <div className="hidden md:block">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {topStories.map((story) => (
 <NewsCard key={story.id} {...story} />
 ))}
 </div>
 </div>

 <div className="md:hidden">
 <MobileCarousel>
 {topStories.map((story) => (
 <div key={story.id} className="carousel-card">
 <NewsCard {...story} />
 </div>
 ))}
 </MobileCarousel>
 </div>
 </section>
 )
}
