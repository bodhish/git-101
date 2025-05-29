"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Terminal,
  Users,
  BookOpen,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Code,
  Zap,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Star,
  Clock,
  Target,
  Lightbulb,
  Shield,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react"

const slides = [
  {
    id: 1,
    type: "title",
    title: "Git 101 & Collaborative Coding",
    subtitle: "Contributing Successfully to Open-Source Projects",
    presenter: "Bodhish Thomas, GitHub Star, Founder & Maintainer, Open Healthcare Network",
  },
  {
    id: 2,
    type: "agenda",
    title: "Session Roadmap",
    items: [
      { icon: Github, text: "Why Git + GitHub matter for open source", time: "5 min", color: "bg-blue-500" },
      { icon: GitBranch, text: "Core Git fundamentals in 10 minutes", time: "10 min", color: "bg-green-500" },
      {
        icon: GitPullRequest,
        text: "Collaboration best practices (branches → PR → review)",
        time: "8 min",
        color: "bg-purple-500",
      },
      { icon: Terminal, text: "Essential GitHub tools & resources", time: "7 min", color: "bg-orange-500" },
      { icon: Users, text: "Next steps + Q&A", time: "15 min", color: "bg-pink-500" },
    ],
  },
  {
    id: 3,
    type: "concepts",
    title: "Version Control in a Nutshell",
    concepts: [
      {
        icon: "📁",
        term: "Repository (repo)",
        definition: "project + full change history",
        color: "bg-blue-50 border-blue-200",
      },
      {
        icon: "📸",
        term: "Commit",
        definition: "snapshot of changes with message & author",
        color: "bg-green-50 border-green-200",
      },
      {
        icon: "🌿",
        term: "Branch",
        definition: "parallel line of development",
        color: "bg-purple-50 border-purple-200",
      },
      {
        icon: "📋",
        term: "Clone / Fork",
        definition: "copy repo locally (clone) or to your acct (fork)",
        color: "bg-orange-50 border-orange-200",
      },
      {
        icon: "🔄",
        term: "Push / Pull",
        definition: "sync changes between local & remote",
        color: "bg-pink-50 border-pink-200",
      },
    ],
  },
  {
    id: 4,
    type: "workflow",
    title: "Typical First Contribution Flow",
    steps: [
      {
        icon: GitBranch,
        text: "Fork the upstream repo on GitHub",
        detail: "Creates your own copy",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: Terminal,
        text: "Clone your fork locally",
        detail: "git clone <your-fork-url>",
        color: "from-green-500 to-green-600",
      },
      {
        icon: GitBranch,
        text: "Create a feature branch",
        detail: "git checkout -b feature/xyz",
        color: "from-purple-500 to-purple-600",
      },
      {
        icon: Code,
        text: "Code → git add → git commit",
        detail: "Small, atomic commits",
        color: "from-orange-500 to-orange-600",
      },
      {
        icon: TrendingUp,
        text: "Push branch to your fork",
        detail: "git push origin feature/xyz",
        color: "from-pink-500 to-pink-600",
      },
      {
        icon: GitPullRequest,
        text: "Open a Pull Request (PR)",
        detail: "Against upstream main",
        color: "from-indigo-500 to-indigo-600",
      },
      {
        icon: CheckCircle,
        text: "Address review comments, merge",
        detail: "🎉 Contribution complete!",
        color: "from-emerald-500 to-emerald-600",
      },
    ],
  },
  {
    id: 5,
    type: "content",
    title: "Branching Strategy",
    bullets: [
      { text: "One branch = one logical change", icon: Target },
      { text: "Keep `main` (or `master`) always deployable", icon: Shield },
      { text: "Sync often: `git fetch upstream` + `git rebase` or `merge`", icon: "🔄" },
      { text: "Delete branch after merge to keep repo tidy", icon: "🧹" },
    ],
    visual: "branching-diagram",
  },
  {
    id: 6,
    type: "best-practices",
    title: "Commit Hygiene",
    practices: [
      {
        icon: "⚛️",
        title: "Atomic",
        description: "Each commit does a single thing",
        color: "from-blue-400 to-blue-600",
      },
      {
        icon: "📝",
        title: "Descriptive message",
        description: "50-char subject, optional body",
        color: "from-green-400 to-green-600",
      },
      {
        icon: "⏰",
        title: "Present tense",
        description: '"Fix overflow", not "Fixed"',
        color: "from-purple-400 to-purple-600",
      },
      {
        icon: "🔗",
        title: "Reference issues",
        description: 'git commit -m "Add retry logic (fixes #42)"',
        color: "from-orange-400 to-orange-600",
      },
    ],
  },
  {
    id: 7,
    type: "comparison",
    title: "Rebase vs Merge",
    comparison: {
      headers: ["Aspect", "Merge", "Rebase"],
      rows: [
        ["History", "Preserves branch graph", "Creates linear history"],
        ["Workflow", "Default on GitHub PRs", "Great for cleaning up before PR"],
        ["Caution", "Extra merge commits", "Never rebase already-pushed shared branches"],
      ],
    },
    icons: { merge: GitMerge, rebase: "🔄" },
  },
  {
    id: 8,
    type: "content",
    title: "Writing an Effective Pull Request",
    bullets: [
      { text: 'Clear title & description ("Add two-factor login", not "Updates")', icon: "📝" },
      { text: "Link relevant issue(s) — auto-close with Closes #123", icon: "🔗" },
      { text: "Explain why and any design decisions", icon: Lightbulb },
      { text: "Keep PR focused & small; attach screenshots/GIFs for UI changes", icon: "📸" },
      { text: "Follow the repo's PR template", icon: "📋" },
    ],
    icon: GitPullRequest,
  },
  {
    id: 9,
    type: "content",
    title: "Issue & Discussion Etiquette",
    bullets: [
      { text: "Search existing issues first", icon: "🔍" },
      { text: "Provide reproducible steps / context", icon: "📋" },
      { text: "Keep conversation professional & on topic", icon: Heart },
      { text: "Use Discussions for open questions or brainstorming", icon: "💭" },
    ],
    icon: Users,
  },
  {
    id: 10,
    type: "content",
    title: "Code Review Best Practices",
    bullets: [
      { text: "As author: respond graciously, iterate promptly", icon: "🤝" },
      { text: 'As reviewer: be specific & constructive ("Nit: rename for clarity")', icon: "💬" },
      { text: "Focus on code, not the coder", icon: "👨‍💻" },
      { text: "Tests & linters should pass before asking for merge", icon: CheckCircle },
    ],
    icon: CheckCircle,
  },
  {
    id: 11,
    type: "tool",
    title: "GitHub CLI (`gh`)",
    description: "Manage PRs, issues, checks from terminal",
    examples: [
      { command: "gh pr create", description: "open a PR from your branch" },
      { command: "gh issue list", description: "see project back-log" },
      { command: "gh pr checkout 123", description: "fetch & review a PR locally" },
    ],
  },
  {
    id: 12,
    type: "feature",
    title: "GitHub Codespaces",
    features: [
      "One-click cloud dev environment (VS Code in the browser)",
      'Consistent tooling; no "works on my machine"',
      "Free monthly hours with GitHub Pro / Student Pack",
    ],
    icon: Code,
    image: "https://images.ctfassets.net/8aevphvgewt8/301u29BCKZVbXYLhQR1hu3/16eb65f687a079d79a0255d3ebabfdbb/features-codespaces-hero.webp",
  },
  {
    id: 13,
    type: "feature",
    title: "GitHub Actions (CI/CD)",
    features: [
      "Automates tests, linting, builds on every PR",
      "Understand required checks before requesting review",
      "You can also add workflow badges in README for status",
    ],
    icon: Zap,
    image: "https://images.ctfassets.net/8aevphvgewt8/KiQBgcnMQg6dALaS6erGk/f8d49c0cc5a461b903e52d08c3c3b8f6/actions-hero.webp",
  },
  {
    id: 14,
    type: "feature",
    title: "GitHub Projects & Boards",
    features: [
      "Kanban-style or table views for issues/PRs",
      "Track what's To Do / In Progress / Done",
      "Find good first issues to contribute to",
    ],
    icon: "📋",
    image: "https://images.ctfassets.net/8aevphvgewt8/pO9gtZMPDI4UdfrSa5U3c/b3315064cc4f62dd85c5b4954d124c30/features-issues-hero.webp",
  },
  {
    id: 15,
    type: "feature",
    title: "GitHub Student Developer Pack",
    features: [
      "Free GitHub Pro + 100+ partner offers (cloud, IDEs, domains)",
      "Extra Codespaces hours & Actions minutes",
      "Apply with student email or proof of enrollment",
    ],
    icon: "🎓",
    image: "https://techcrunch.com/wp-content/uploads/2019/08/GitHub-Education.png",
  },
  {
    id: 16,
    type: "pitfalls",
    title: "Common Pitfalls to Avoid",
    pitfalls: [
      { icon: AlertTriangle, text: 'Huge "mega-PRs" touching unrelated areas', severity: "high" },
      { icon: AlertTriangle, text: "Committing generated files (`node_modules`, build artifacts)", severity: "medium" },
      { icon: AlertTriangle, text: "Rebasing public branches after others pulled", severity: "high" },
      { icon: AlertTriangle, text: "Ignoring failing CI checks", severity: "medium" },
    ],
  },
  {
    id: 17,
    type: "resources",
    title: "Quick Links & Learning Resources",
    resources: [
      { name: "Introduction to GitHub", url: "https://github.com/skills/introduction-to-github", icon: "🌍", category: "tutorial" },
      { name: "Pro Git Book (free)", url: "https://git-scm.com/book", icon: BookOpen, category: "book" },
      { name: "GitHub Skills Courses", url: "https://github.com/skills", icon: "🎯", category: "course" },
      { name: "Open Source Guides", url: "https://opensource.guide/how-to-contribute", icon: "📖", category: "guide" },
      { name: "Git Cheat Sheet (PDF)", url: "https://education.github.com/git-cheat-sheet-education.pdf", icon: "📄", category: "reference" },
    ],
  },
  {
    id: 18,
    type: "next-steps",
    title: "Next Steps",
    steps: [
      { icon: Terminal, text: "Set up GitHub CLI & try a Codespace", priority: "high", difficulty: "easy" },
      { icon: "🔍", text: 'Pick a "good first issue" in a repo you like', priority: "high", difficulty: "medium" },
      {
        icon: GitPullRequest,
        text: "Make one small PR this week – learn by doing",
        priority: "medium",
        difficulty: "medium",
      },
      { icon: Users, text: "Join community forums & stay curious", priority: "medium", difficulty: "easy" },
    ],
  },
  {
    id: 19,
    type: "qa",
    title: "Q & A",
    subtitle: "Thank you for your attention!",
    contact: {
      github: "@bodhish",
      email: "hey@bodhish.in",
    },
  },
]

export default function SlideDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slide = slides[currentSlide]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 150)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsAnimating(false)
      }, 150)
    }
  }

  const goToSlide = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsAnimating(false)
      }, 150)
    }
  }

  const renderIcon = (
    icon: React.ComponentType<{ className?: string }> | string | undefined, 
    className = "w-6 h-6"
  ) => {
    if (!icon) {
      return null;
    }
    if (typeof icon === "string") {
      return <span className="text-2xl">{icon}</span>
    }
    const IconComponent = icon
    return <IconComponent className={className} />
  }

  const renderSlideContent = () => {
    switch (slide.type) {
      case "title":
        return (
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-slate-300 rounded-full"></div>
              <div className="absolute top-32 right-20 w-24 h-24 border-2 border-blue-300 rounded-full"></div>
              <div className="absolute bottom-20 left-32 w-20 h-20 border-2 border-green-300 rounded-full"></div>
            </div>

            <div className="relative text-center space-y-12 py-16">
              <div className="space-y-8">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-3xl border border-slate-300">
                      <Github className="w-32 h-32 text-slate-700" />
                    </div>
                  </div>
                </div>

                <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-4xl text-slate-600 font-medium max-w-5xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </h2>
              </div>

              <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 max-w-3xl mx-auto border border-blue-200">
                
                <p className="text-2xl text-slate-700 font-semibold">{slide.presenter}</p>
              </div>
            </div>
          </div>
        )

      case "agenda":
        return (
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-6 h-6 text-slate-500" />
                <span className="text-xl text-slate-500">Total: 45 minutes</span>
              </div>
            </div>

            <div className="grid gap-6">
              {slide.items?.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex items-center space-x-6 p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl font-bold text-slate-400">{String(index + 1).padStart(2, "0")}</div>
                      <div className={`${item.color} p-4 rounded-xl shadow-lg`}>
                        {renderIcon(item.icon, "w-8 h-8 text-white")}
                      </div>
                    </div>

                    <div className="flex-1">
                      <span className="text-2xl font-semibold text-slate-800">{item.text}</span>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-lg text-slate-600 font-medium">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "concepts":
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-600 mt-4">Essential building blocks of Git</p>
            </div>

            <div className="grid gap-6">
              {slide.concepts?.map((concept, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden ${concept.color} rounded-2xl border-2 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

                  <div className="relative flex items-center space-x-6 p-6">
                    <div className="text-5xl">{concept.icon}</div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-3xl font-bold text-slate-900">{concept.term}</h3>
                      <p className="text-xl text-slate-700 leading-relaxed">{concept.definition}</p>
                    </div>
                    <div className="text-4xl font-bold text-slate-300 group-hover:text-slate-400 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "workflow":
        return (
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-600">Your journey from fork to merge</p>
            </div>

            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute left-8 top-16 bottom-16 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 rounded-full"></div>

              <div className="space-y-6">
                {slide.steps?.map((step, index) => {
                  // Determine the color to use
                  const colorClass = "color" in step ? step.color : "from-blue-500 to-blue-600";
                  // Determine the detail text to show
                  const detailText = "detail" in step ? step.detail : "";
                  
                  return (
                    <div key={index} className="relative flex items-center space-x-6">
                      <div
                        className={`relative z-10 bg-gradient-to-r ${colorClass} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="bg-slate-100 p-2 rounded-lg">
                            {renderIcon(step.icon, "w-6 h-6 text-slate-700")}
                          </div>
                          <span className="text-2xl font-semibold text-slate-800">{step.text}</span>
                        </div>
                        <p className="text-lg text-slate-600 ml-12">{detailText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )

      case "content":
        return (
          <div className="space-y-12">
            <div className="flex items-center justify-center space-x-6">
              {slide.icon && (
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg">
                  {renderIcon(slide.icon, "w-12 h-12 text-white")}
                </div>
              )}
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
            </div>

            <ul className="space-y-6">
              {slide.bullets?.map((bullet, index) => (
                <li
                  key={index}
                  className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                    {typeof bullet.icon === "string" ? (
                      <span className="text-2xl">{bullet.icon}</span>
                    ) : (
                      renderIcon(bullet.icon, "w-6 h-6 text-blue-700")
                    )}
                  </div>
                  <span className="text-2xl text-slate-800 leading-relaxed flex-1">
                    {typeof bullet === "string" ? bullet : bullet.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )

      case "best-practices":
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-600 mt-4">Write commits that tell a story</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {slide.practices?.map((practice, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${practice.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{practice.icon}</div>
                      <h3 className="text-3xl font-bold text-slate-900">{practice.title}</h3>
                    </div>
                    <p className="text-xl text-slate-700 leading-relaxed">{practice.description}</p>

                    <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Award className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "comparison":
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-600 mt-4">Choose your integration strategy</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 via-blue-50 to-slate-100">
                  <tr>
                    {slide.comparison?.headers.map((header, index) => (
                      <th key={index} className="px-8 py-8 text-left text-3xl font-bold text-slate-900">
                        {index === 1 && <GitMerge className="inline w-8 h-8 mr-3 text-blue-600" />}
                        {index === 2 && <span className="inline-block w-8 h-8 mr-3 text-2xl">🔄</span>}
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {slide.comparison?.rows.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors group">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-8 py-6 text-xl text-slate-800">
                          {cellIndex === 0 && (
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="font-semibold">{cell}</span>
                            </div>
                          )}
                          {cellIndex !== 0 && cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "tool":
        return (
          <div className="space-y-12">
            <div className="flex items-center justify-center space-x-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl">
                <Terminal className="w-16 h-16 text-green-400" />
              </div>
              <div className="text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
                <p className="text-2xl text-slate-600 mt-4">{slide.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 text-center">Examples:</h3>
              <div className="space-y-4">
                {slide.examples?.map((example, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative p-8">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-500/20 p-2 rounded-lg">
                          <Terminal className="w-6 h-6 text-green-400" />
                        </div>
                        <code className="text-2xl text-green-400 font-mono font-bold">{example.command}</code>
                        <span className="text-slate-400 text-xl">–</span>
                        <span className="text-xl text-slate-300">{example.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "feature":
        return (
          <div className="space-y-12">
            <div className="flex items-center justify-center space-x-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-2xl">
                {renderIcon(slide.icon, "w-16 h-16 text-white")}
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
            </div>

            {slide.image && (
              <div className="relative">
                <div className="absolute "></div>
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="relative w-full object-cover rounded-3xl border"
                />
                <div className="absolute inset-0 rounded-3xl">
                  <div className="absolute bottom-0 mt-4 p-8 space-y-4">
                    
                      {slide.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-black/60 transition-all duration-300"
                        >
                          <div className="bg-green-500 p-2 rounded-full">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-2xl text-white leading-relaxed">{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "pitfalls":
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-600 mt-4">Learn from common mistakes</p>
            </div>

            <div className="space-y-6">
              {slide.pitfalls?.map((pitfall, index) => (
                <div
                  key={index}
                  className={`group flex items-start space-x-6 p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                    pitfall.severity === "high"
                      ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-300 hover:border-red-400"
                      : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 hover:border-yellow-400"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${pitfall.severity === "high" ? "bg-red-100" : "bg-yellow-100"}`}>
                    <AlertTriangle
                      className={`w-8 h-8 ${pitfall.severity === "high" ? "text-red-600" : "text-yellow-600"}`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          pitfall.severity === "high" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {pitfall.severity?.toUpperCase()} RISK
                      </span>
                    </div>
                    <span className="text-2xl text-slate-800 leading-relaxed">{pitfall.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "resources":
        return (
          <div className="space-y-10">
            <div className="flex items-center justify-center space-x-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-3xl shadow-2xl">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
            </div>

            <div className="grid gap-6">
              {slide.resources?.map((resource, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex items-center space-x-6 p-6">
                    <div
                      className={`p-4 rounded-xl shadow-lg ${
                        resource.category === "tutorial"
                          ? "bg-green-500"
                          : resource.category === "book"
                            ? "bg-blue-500"
                            : resource.category === "course"
                              ? "bg-purple-500"
                              : resource.category === "guide"
                                ? "bg-orange-500"
                                : "bg-slate-500"
                      }`}
                    >
                      <div className="text-3xl text-white">
                        {typeof resource.icon === "string" ? resource.icon : renderIcon(resource.icon, "w-8 h-8")}
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-2xl font-bold text-slate-900">{resource.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            resource.category === "tutorial"
                              ? "bg-green-100 text-green-800"
                              : resource.category === "book"
                                ? "bg-blue-100 text-blue-800"
                                : resource.category === "course"
                                  ? "bg-purple-100 text-purple-800"
                                  : resource.category === "guide"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {resource.category?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-lg text-blue-600 font-mono">{resource.url}</p>
                    </div>

                    <a className="bg-slate-100 p-3 rounded-xl group-hover:bg-blue-100 transition-colors" href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "next-steps":
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 to-green-900 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-600 mt-4">Your action plan for Git mastery</p>
            </div>

            <div className="space-y-6">
              {slide.steps?.map((step, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] ${
                    step.priority === "high"
                      ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-300 hover:border-green-400 hover:shadow-xl"
                      : "bg-gradient-to-r from-slate-50 to-blue-50 border-slate-300 hover:border-blue-400 hover:shadow-lg"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>

                  <div className="relative flex items-center space-x-6 p-8">
                    <div
                      className={`p-6 rounded-2xl shadow-lg ${
                        step.priority === "high"
                          ? "bg-gradient-to-br from-green-500 to-green-600"
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                      }`}
                    >
                      {renderIcon(step.icon, "w-10 h-10 text-white")}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl font-semibold text-slate-800">{step.text}</span>
                        {step.priority === "high" && (
                          <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            step.difficulty === "easy"
                              ? "bg-green-100 text-green-700"
                              : step.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {step.difficulty?.toUpperCase()} DIFFICULTY
                        </span>
                      </div>
                    </div>

                    <div className="text-6xl font-bold text-slate-200 group-hover:text-slate-300 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "qa":
        return (
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-300 rounded-full"></div>
              <div className="absolute top-32 right-20 w-24 h-24 border-2 border-green-300 rounded-full"></div>
              <div className="absolute bottom-20 left-32 w-20 h-20 border-2 border-purple-300 rounded-full"></div>
            </div>

            <div className="relative text-center space-y-12 py-16">
              <div className="space-y-8">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-3xl border border-blue-300">
                      <Users className="w-32 h-32 text-slate-700" />
                    </div>
                  </div>
                </div>

                <h1 className="text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
                <h2 className="text-4xl text-slate-600 font-medium">{slide.subtitle}</h2>
              </div>

              {slide.contact && (
                <div className="space-y-6">
                  <p className="text-2xl text-slate-600 font-semibold">
                    Let&apos;s connect and keep the conversation going:
                  </p>
                  <div className="flex justify-center space-x-8">
                    <div className="group flex items-center space-x-4 bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                      <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <Github className="w-8 h-8 text-slate-600 group-hover:text-blue-600" />
                      </div>
                      <span className="text-2xl font-mono text-slate-700 font-semibold">{slide.contact.github}</span>
                    </div>

                    <div className="group flex items-center space-x-4 bg-white p-6 rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                      <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-green-100 transition-colors">
                        <span className="text-2xl">📧</span>
                      </div>
                      <span className="text-2xl text-slate-700 font-semibold">{slide.contact.email}</span>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 max-w-2xl mx-auto">
                    <p className="text-lg text-slate-700">
                      <strong>Remember:</strong> The best way to learn Git is by doing. Start small, be consistent, and
                      don&apos;t be afraid to make mistakes!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return <div>Slide content not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Slide Content */}
      <div className="container mx-auto px-8 py-8">
        <Card
          className={`min-h-[93vh] max-h-[93vh] shadow-2xl border-0 transition-all duration-300 bg-white/80 backdrop-blur-sm ${isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
        >
          <CardContent className="p-12 overflow-y-auto">{renderSlideContent()}</CardContent>
        </Card>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex justify-center py-6">
        <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 border border-slate-200">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="rounded-full w-10 h-10 p-0 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-slate-700">{currentSlide + 1}</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-500">{slides.length}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="rounded-full w-10 h-10 p-0 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="fixed top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-slate-200">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <span>Use</span>
          <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">←</kbd>
          <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">→</kbd>
          <span>to navigate</span>
        </div>
      </div>

      {/* GitHub Branding */}
      <div className="fixed bottom-6 left-6">
        <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-slate-200">
          <Github className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-600">Git 101 by Bodhish</span>
        </div>
      </div>
    </div>
  )
}
