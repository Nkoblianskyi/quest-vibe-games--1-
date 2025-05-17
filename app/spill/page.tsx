"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { MonkeyIcon } from "@/components/animated-icons/monkey-icon"
import { BananaIcon } from "@/components/animated-icons/banana-icon"
import { ParrotIcon } from "@/components/animated-icons/parrot-icon"
import { CoconutIcon } from "@/components/animated-icons/coconut-icon"
import { StarIcon } from "@/components/animated-icons/star-icon"
import { SpinningAnimation } from "@/components/animated-icons/spinning-animation"

// Game symbols
const symbols = [
  { id: "monkey", value: 4, component: MonkeyIcon },
  { id: "banana", value: 5, component: BananaIcon },
  { id: "parrot", value: 3, component: ParrotIcon },
  { id: "coconut", value: 2, component: CoconutIcon },
  { id: "star", value: 1.5, component: StarIcon },
]

export default function GamePage() {
  const [score, setScore] = useState(5000)
  const [energy, setEnergy] = useState(50)
  const [grid, setGrid] = useState<string[][]>([])
  const [spinning, setSpinning] = useState(false)
  const [matches, setMatches] = useState<{ symbol: string; count: number; multiplier: number; points: number }[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [spinningColumns, setSpinningColumns] = useState<boolean[]>([false, false, false, false, false])
  const [revealedGrid, setRevealedGrid] = useState<string[][]>([])

  // Animation timing references
  const spinDurations = [1000, 1400, 1800, 2200, 2600] // Different durations for each column
  const spinTimers = useRef<NodeJS.Timeout[]>([])

  // Initialize grid
  useEffect(() => {
    if (grid.length === 0) {
      const initialGrid = generateGrid()
      setGrid(initialGrid)
      setRevealedGrid(initialGrid)
    }

    // Cleanup timers on unmount
    return () => {
      spinTimers.current.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  const generateGrid = () => {
    const newGrid: string[][] = []
    for (let row = 0; row < 3; row++) {
      const newRow: string[] = []
      for (let col = 0; col < 5; col++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        newRow.push(randomSymbol.id)
      }
      newGrid.push(newRow)
    }
    return newGrid
  }

  const spin = () => {
    if (spinning || score < energy) return

    // Clear any existing timers
    spinTimers.current.forEach((timer) => clearTimeout(timer))
    spinTimers.current = []

    setSpinning(true)
    setMatches([])
    setTotalPoints(0)
    setScore((prev) => prev - energy)

    // Set all columns to spinning state
    setSpinningColumns([true, true, true, true, true])

    // Generate new grid but don't show it yet
    const newGrid = generateGrid()
    setGrid(newGrid)

    // Stop columns one by one with delays
    spinDurations.forEach((duration, colIndex) => {
      const timer = setTimeout(() => {
        setSpinningColumns((prev) => {
          const updated = [...prev]
          updated[colIndex] = false
          return updated
        })

        // Update revealed grid column by column
        setRevealedGrid((prev) => {
          const updated = JSON.parse(JSON.stringify(prev))
          for (let row = 0; row < 3; row++) {
            updated[row][colIndex] = newGrid[row][colIndex]
          }
          return updated
        })

        // When last column stops, calculate matches
        if (colIndex === spinDurations.length - 1) {
          setTimeout(() => {
            calculateMatches(newGrid)
            setSpinning(false)
          }, 500) // Small delay after last column stops
        }
      }, duration)

      spinTimers.current.push(timer)
    })
  }

  const calculateMatches = (grid: string[][]) => {
    const symbolCounts: Record<string, number> = {}

    // Count symbols
    grid.forEach((row) => {
      row.forEach((symbol) => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1
      })
    })

    // Calculate matches
    const newMatches: { symbol: string; count: number; multiplier: number; points: number }[] = []
    let newTotalPoints = 0

    Object.entries(symbolCounts).forEach(([symbol, count]) => {
      if (count >= 3) {
        const symbolData = symbols.find((s) => s.id === symbol)
        if (symbolData) {
          const multiplier = symbolData.value
          const points = Math.round(energy * multiplier * (count / 3))
          newMatches.push({
            symbol,
            count,
            multiplier,
            points,
          })
          newTotalPoints += points
        }
      }
    })

    if (newTotalPoints > 0) {
      setScore((prev) => prev + newTotalPoints)
      setMatches(newMatches)
      setTotalPoints(newTotalPoints)
    }
  }

  const decreaseEnergy = () => {
    if (energy > 10) {
      setEnergy((prev) => prev - 10)
    }
  }

  const increaseEnergy = () => {
    if (energy < 500) {
      setEnergy((prev) => prev + 10)
    }
  }

  const renderSymbol = (symbolId: string, isMatching: boolean, size = 80) => {
    const symbolData = symbols.find((s) => s.id === symbolId)
    if (!symbolData) return null

    const IconComponent = symbolData.component
    return (
      <IconComponent size={size} isAnimated={!spinning && isMatching} className={isMatching ? "matching-symbol" : ""} />
    )
  }

  return (
    <main className="game-page" itemScope itemType="https://schema.org/SoftwareApplication">
      <meta itemProp="applicationCategory" content="Game" />
      <meta itemProp="operatingSystem" content="Web Browser" />
      <meta itemProp="name" content="QuestVibe Games - Sosial Spillplattform" />
      <meta itemProp="offers" itemScope itemType="https://schema.org/Offer" />
      <meta itemProp="price" content="0" />
      <meta itemProp="priceCurrency" content="NOK" />

      <div
        className="game-page__warning"
        role="alert"
        aria-label="Advarsel om aldersgrense og at dette ikke er pengespill"
      >
        <p>
          <strong>ADVARSEL:</strong> Dette er kun et sosialt spill for underholdningsformål.
          <strong> Ingen ekte penger, ingen premier eller belønninger.</strong> Dette er IKKE pengespill.
          <span> Du må være 18 år for å spille.</span> Ved problemer, besøk{" "}
          <a
            href="https://hjelpelinjen.no"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Besøk Hjelpelinjen - Åpnes i nytt vindu"
          >
            Hjelpelinjen.no
          </a>
          .
        </p>
      </div>

      <div className="slot-machine" role="application" aria-label="Spillautomat - Sosialt spill uten pengepremier">
        <div className="slot-machine__header">
          <div className="slot-machine__score" aria-live="polite" aria-atomic="true">
            <div className="slot-machine__score-label" id="score-label">
              POENG
            </div>
            <div className="slot-machine__score-value" aria-labelledby="score-label">
              {score}
            </div>
          </div>

          <div className="slot-machine__bet-controls" role="group" aria-label="Energikontroller">
            <button
              className="slot-machine__bet-button slot-machine__bet-button--decrease"
              onClick={decreaseEnergy}
              disabled={spinning}
              aria-label="Reduser energi"
              aria-disabled={spinning}
            >
              -
            </button>
            <div
              className="slot-machine__bet-value"
              aria-live="polite"
              aria-atomic="true"
              aria-label="Nåværende energi"
            >
              {energy}
            </div>
            <button
              className="slot-machine__bet-button slot-machine__bet-button--increase"
              onClick={increaseEnergy}
              disabled={spinning}
              aria-label="Øk energi"
              aria-disabled={spinning}
            >
              +
            </button>
          </div>

          <button
            className={`slot-machine__spin-button ${spinning ? "slot-machine__spin-button--spinning" : ""}`}
            onClick={spin}
            disabled={spinning || score < energy}
            aria-label={spinning ? "Spinner..." : "Spinn hjulene"}
            aria-disabled={spinning || score < energy}
          >
            {spinning ? "..." : "SPILL"}
          </button>
        </div>

        <div className="slot-machine__grid" role="grid" aria-label="Spillautomat-hjul" aria-live="polite">
          {revealedGrid.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="slot-machine__row" role="row" aria-label={`Rad ${rowIndex + 1}`}>
              {row.map((symbol, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`slot-machine__cell ${spinningColumns[colIndex] ? "slot-machine__cell--spinning" : ""}`}
                  role="gridcell"
                  aria-label={spinningColumns[colIndex] ? "Spinner" : `Symbol: ${symbol}`}
                >
                  <div className="slot-machine__symbol">
                    {spinningColumns[colIndex] ? (
                      <SpinningAnimation size={80} />
                    ) : (
                      renderSymbol(
                        symbol,
                        matches.some((match) => match.symbol === symbol),
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {totalPoints > 0 && (
          <div
            className="slot-machine__match-message"
            role="alert"
            aria-live="assertive"
            aria-label="Poeng informasjon - Kun for underholdning, ingen reell verdi"
          >
            <div className="slot-machine__match-title">Poeng: {totalPoints}</div>
            <div className="slot-machine__match-details">
              {matches.map((match, index) => (
                <div key={`match-${index}`} className="slot-machine__match-item">
                  <div className="slot-machine__match-symbol">{renderSymbol(match.symbol, true, 30)}</div>
                  {match.count}x (x{match.multiplier}) = {match.points}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="slot-machine__paytable" aria-label="Poengtabell - Viser symboler og deres verdier">
          <h3 className="slot-machine__paytable-title" id="paytable-title">
            POENGTABELL
          </h3>
          <div className="slot-machine__paytable-items" aria-labelledby="paytable-title">
            {symbols.map((symbol) => (
              <div
                key={symbol.id}
                className="slot-machine__paytable-item"
                aria-label={`${symbol.id} symbol gir ${symbol.value} ganger energi i poeng`}
              >
                <div className="slot-machine__paytable-symbol">{renderSymbol(symbol.id, false, 40)}</div>
                <div className="slot-machine__paytable-multiplier">x{symbol.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="game-page__disclaimer"
        role="alert"
        aria-label="Viktig informasjon om at dette ikke er pengespill"
      >
        <p>
          <strong>VIKTIG INFORMASJON:</strong> Dette er kun en sosial spillplattform for underholdningsformål. Ingen
          ekte penger er involvert, ingen premier eller belønninger, og ingen virtuelle gjenstander har noen reell
          monetær verdi. Dette er IKKE pengespill.
        </p>
      </div>

      <div className="game-page__back">
        <Link href="/" className="game-page__back-link" aria-label="Tilbake til hovedsiden">
          Tilbake til hovedsiden
        </Link>
      </div>
    </main>
  )
}
