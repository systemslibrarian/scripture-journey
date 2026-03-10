import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quiz — Scripture Journey",
  description: "Test your knowledge of messianic prophecy with 10 randomized questions from 211 Scripture Journey lessons.",
  openGraph: {
    title: "Quiz — Scripture Journey",
    description: "Test your knowledge of messianic prophecy with 10 questions drawn from the lessons.",
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
