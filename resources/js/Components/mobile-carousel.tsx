"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MobileCarouselProps {
 children: React.ReactNode
 title?: string
}

export function MobileCarousel({ children, title }: MobileCarouselProps) {
 const scrollContainerRef = useRef<HTMLDivElement>(null)
 const [showLeftArrow, setShowLeftArrow] = useState(false)
 const [showRightArrow, setShowRightArrow] = useState(true)

 useEffect(() => {
 const container = scrollContainerRef.current
 if (!container) return

 const checkScroll = () => {
 setShowLeftArrow(container.scrollLeft > 0)
 setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
 }

 checkScroll()
 container.addEventListener("scroll", checkScroll)
 window.addEventListener("resize", checkScroll)

 return () => {
 container.removeEventListener("scroll", checkScroll)
 window.removeEventListener("resize", checkScroll)
 }
 }, [])

 const scroll = (direction: "left" | "right") => {
 const container = scrollContainerRef.current
 if (!container) return

 const scrollAmount = 320
 const newScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
 container.scrollTo({ left: newScroll, behavior: "smooth" })
 }

 return (
 <div className="relative">
 {title && <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 px-4">{title}</h2>}

 <div className="relative group">
 <div
 ref={scrollContainerRef}
 className="flex overflow-x-auto gap-4 px-4 pb-4 md:px-6 lg:px-8 scroll-smooth snap-x snap-mandatory hide-scrollbar will-change-scroll"
 >
 {children}
 </div>

 {/* Left scroll button */}
 {showLeftArrow && (
 <button
 onClick={() => scroll("left")}
 className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
 aria-label="Scroll left"
 >
 <ChevronLeft className="w-5 h-5" />
 </button>
 )}

 {/* Right scroll button */}
 {showRightArrow && (
 <button
 onClick={() => scroll("right")}
 className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
 aria-label="Scroll right"
 >
 <ChevronRight className="w-5 h-5" />
 </button>
 )}
 </div>
 </div>
 )
}
