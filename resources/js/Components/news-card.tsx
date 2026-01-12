
import { Link } from "@inertiajs/react"
import { Clock, User } from "lucide-react"

interface NewsCardProps {
 id: number
 title: string
 summary: string
 category: string
 author: string
 date: string
 image: string
 readTime: string
 featured?: boolean
}

export function NewsCard({
 id,
 title,
 summary,
 category,
 author,
 date,
 image,
 readTime,
 featured = false,
}: NewsCardProps) {
 return (
 <Link href={`/article/${id}`}>
 <article
 className={`news-card group overflow-hidden transition-all hover:shadow-lg ${featured ? "lg:col-span-2" : ""}`}
 >
 <div className="relative w-full pt-[56.25%] bg-muted overflow-hidden">
 <img src={image || "/placeholder.svg"} alt={title} className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full absolute inset-0" />
 </div>

 <div className="p-5 sm:p-6">
 <div className="inline-block mb-3">
 <span className="news-badge text-xs">{category}</span>
 </div>

 <h3
 className={`font-bold text-card-foreground leading-tight text-balance mb-2 group-hover:text-primary transition-colors line-clamp-3 ${featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}
 >
 {title}
 </h3>

 <p className={`text-muted-foreground mb-4 line-clamp-2 ${featured ? "text-sm" : "text-xs sm:text-sm"}`}>
 {summary}
 </p>

 <div
 className={`flex flex-wrap items-center gap-3 text-muted-foreground line-clamp-2 ${featured ? "text-xs sm:text-sm" : "text-xs"}`}
 >
 <div className="flex items-center gap-1">
 <User className="w-3 h-3" />
 <span>{author}</span>
 </div>
 <span>•</span>
 <span>{date}</span>
 <span>•</span>
 <div className="flex items-center gap-1">
 <Clock className="w-3 h-3" />
 <span>{readTime}</span>
 </div>
 </div>
 </div>
 </article>
 </Link>
 )
}
