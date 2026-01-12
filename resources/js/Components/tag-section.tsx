"use client"

import { TagCloud } from "./tag-cloud"

export function TagSection() {
 return (
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">Explore by Tag</h2>
 <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
 Discover articles across popular topics. Click on any tag to see all related coverage.
 </p>
 <TagCloud />
 </section>
 )
}
