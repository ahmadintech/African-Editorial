"use client"

import { Share2, Twitter, Linkedin } from "lucide-react"

interface SocialShareButtonsProps {
 title: string
 url: string
}

export function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
 const shareLinks = {
 twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
 linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
 facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
 }

 return (
 <div className="flex items-center gap-3">
 <Share2 className="w-5 h-5 text-muted-foreground" />
 <div className="flex gap-2">
 <a
 href={shareLinks.twitter}
 target="_blank"
 rel="noopener noreferrer"
 className="p-2 hover:bg-muted rounded-full transition-colors"
 title="Share on Twitter"
 >
 <Twitter className="w-5 h-5 text-foreground" />
 </a>
 <a
 href={shareLinks.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 className="p-2 hover:bg-muted rounded-full transition-colors"
 title="Share on LinkedIn"
 >
 <Linkedin className="w-5 h-5 text-foreground" />
 </a>
 </div>
 </div>
 )
}
