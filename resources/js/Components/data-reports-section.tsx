"use client"

import { NewsCard } from "./news-card"

const dataReports = [
 {
 id: 21,
 title: "Data Dashboard: African Economic Indicators Q4 2024",
 summary: "Comprehensive analysis of GDP, inflation, and employment across the continent",
 category: "Data & Reports",
 author: "Dr. Zainab Okafor",
 date: "2024-01-10",
 image: "/economic-data-dashboard.jpg",
 readTime: "12 min",
 },
 {
 id: 22,
 title: "Population Growth: Demographic Shifts and Future Implications",
 summary: "Statistical analysis of Africa's youth population and economic opportunities",
 category: "Data & Reports",
 author: "Prof. Kofi Mensah",
 date: "2024-01-09",
 image: "/demographic-population-statistics.jpg",
 readTime: "10 min",
 },
 {
 id: 23,
 title: "Education Statistics: Progress Toward Universal Enrollment",
 summary: "Annual report on literacy rates and educational achievement across Africa",
 category: "Data & Reports",
 author: "Grace Mwangi",
 date: "2024-01-08",
 image: "/education-statistics-school.jpg",
 readTime: "9 min",
 },
]

export function DataReportsSection() {
 return (
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-muted/30">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Data & Research Reports</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {dataReports.map((story) => (
 <NewsCard key={story.id} {...story} />
 ))}
 </div>
 </section>
 )
}
