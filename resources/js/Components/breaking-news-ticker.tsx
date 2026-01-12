"use client"

export function BreakingNewsTicker() {
 const breakingNews = [
 "BREAKING: Nigerian inflation hits new high | ",
 "Kenya elections update | ",
 "ECOWAS summit begins | ",
 "Africa trade report released",
 ]

 const fullText = breakingNews.join("")

 return (
 <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
 <div className="animate-marquee whitespace-nowrap inline-block">
 <span className="font-semibold text-sm md:text-base px-4">{fullText}</span>
 <span className="font-semibold text-sm md:text-base px-4">{fullText}</span>
 </div>
 </div>
 )
}
