import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Characters } from "@/components/characters"
import { Features } from "@/components/features"
import { GamePreview } from "@/components/game-preview"
import { PlayButton } from "@/components/play-button"

export default function Home() {
  return (
    <main className="main" itemScope itemType="https://schema.org/WebPage">
      <meta itemProp="name" content="QuestVibe Games - Sosial Spillplattform" />
      <meta
        itemProp="description"
        content="En morsom sosial spillplattform for underholdning. Ingen ekte penger eller premier involvert."
      />

      <Hero />
      <About />
      <Characters />
      <Features />
      <GamePreview />
      <div className="play-section">
        <PlayButton />
      </div>
    </main>
  )
}
