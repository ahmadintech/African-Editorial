"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
 const [theme, setTheme] = useState<"light" | "dark">("light")
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 // Check system preference or saved preference
 const saved = localStorage.getItem("theme") as "light" | "dark" | null
 const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

 const initialTheme = saved || (prefersDark ? "dark" : "light")
 setTheme(initialTheme)
 applyTheme(initialTheme)
 }, [])

 const applyTheme = (newTheme: "light" | "dark") => {
 const html = document.documentElement
 if (newTheme === "dark") {
 html.classList.add("dark")
 } else {
 html.classList.remove("dark")
 }
 localStorage.setItem("theme", newTheme)
 }

 const toggleTheme = () => {
 const newTheme = theme === "light" ? "dark" : "light"
 setTheme(newTheme)
 applyTheme(newTheme)
 }

 if (!mounted) return null

 return (
 <button
 onClick={toggleTheme}
 className="p-2 text-foreground hover:bg-muted rounded-full transition-colors"
 title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
 >
 {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
 </button>
 )
}
