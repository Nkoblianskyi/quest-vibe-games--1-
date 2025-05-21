"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { MonkeyIcon } from "@/components/animated-icons/monkey-icon"
import { BananaIcon } from "@/components/animated-icons/banana-icon"
import { ParrotIcon } from "@/components/animated-icons/parrot-icon"
import { CoconutIcon } from "@/components/animated-icons/coconut-icon"
import { StarIcon } from "@/components/animated-icons/star-icon"
import { RotatingAnimation } from "@/components/animated-icons/rotating-animation"

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
  const [rotating, setRotating] = useState(false)
  const [matches, setMatches] = useState<{ symbol: string; count: number; multiplier: number; points: number }[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [rotatingColumns, setRotatingColumns] = useState<boolean[]>([false, false, false, false, false])
  const [revealedGrid, setRevealedGrid] = useState<string[][]>([])

  // Animation timing references
  const animationDurations = [1000, 1400, 1800, 2200, 2600] // Different durations for each column
  const animationTimers = useRef<NodeJS.Timeout[]>([])

  // Initialize grid
  useEffect(() => {
    if (grid.length === 0) {
      const initialGrid = generateGrid()
      setGrid(initialGrid)
      setRevealedGrid(initialGrid)
    }

    // Cleanup timers on unmount
    return () => {
      animationTimers.current.forEach((timer) => clearTimeout(timer))
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

  const play = () => {
    if (rotating || score < energy) return

    // Clear any existing timers
    animationTimers.current.forEach((timer) => clearTimeout(timer))
    animationTimers.current = []

    setRotating(true)
    setMatches([])
    setTotalPoints(0)
    setScore((prev) => prev - energy)

    // Set all columns to rotating state
    setRotatingColumns([true, true, true, true, true])

    // Generate new grid but don't show it yet
    const newGrid = generateGrid()
    setGrid(newGrid)

    // Stop columns one by one with delays
    animationDurations.forEach((duration, colIndex) => {
      const timer = setTimeout(() => {
        setRotatingColumns((prev) => {
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
        if (colIndex === animationDurations.length - 1) {
          setTimeout(() => {
            calculateMatches(newGrid)
            setRotating(false)
          }, 500) // Small delay after last column stops
        }
      }, duration)

      animationTimers.current.push(timer)
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
      <IconComponent size={size} isAnimated={!rotating && isMatching} className={isMatching ? "matching-symbol" : ""} />
    )
  }

  return (
    <main className="game-page" itemScope itemType="https://schema.org/SoftwareApplication">
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

      <div className="treasure-hunt" role="application" aria-label="Spillautomat - Sosialt spill uten pengepremier">
        <div className="treasure-hunt__header">
          <div className="treasure-hunt__score" aria-live="polite" aria-atomic="true">
            <div className="treasure-hunt__score-label" id="score-label">
              POENG
            </div>
            <div className="treasure-hunt__score-value" aria-labelledby="score-label">
              {score}
            </div>
          </div>

          <div className="treasure-hunt__bet-controls" role="group" aria-label="Energikontroller">
            <button
              className="treasure-hunt__bet-button treasure-hunt__bet-button--decrease"
              onClick={decreaseEnergy}
              disabled={rotating}
              aria-label="Reduser energi"
              aria-disabled={rotating}
            >
              -
            </button>
            <div
              className="treasure-hunt__bet-value"
              aria-live="polite"
              aria-atomic="true"
              aria-label="Nåværende energi"
            >
              {energy}
            </div>
            <button
              className="treasure-hunt__bet-button treasure-hunt__bet-button--increase"
              onClick={increaseEnergy}
              disabled={rotating}
              aria-label="Øk energi"
              aria-disabled={rotating}
            >
              +
            </button>
          </div>

          <button
            className={`treasure-hunt__play-button ${rotating ? "treasure-hunt__play-button--rotating" : ""}`}
            onClick={play}
            disabled={rotating || score < energy}
            aria-label={rotating ? "Roterer..." : "Start spillet"}
            aria-disabled={rotating || score < energy}
          >
            {rotating ? "..." : "SPILL"}
          </button>
        </div>

        <div className="treasure-hunt__grid" role="grid" aria-label="Spillautomat-hjul" aria-live="polite">
          {revealedGrid.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="treasure-hunt__row" role="row" aria-label={`Rad ${rowIndex + 1}`}>
              {row.map((symbol, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`treasure-hunt__cell ${rotatingColumns[colIndex] ? "treasure-hunt__cell--rotating" : ""}`}
                  role="gridcell"
                  aria-label={rotatingColumns[colIndex] ? "Roterer" : `Symbol: ${symbol}`}
                >
                  <div className="treasure-hunt__symbol">
                    {rotatingColumns[colIndex] ? (
                      <RotatingAnimation size={80} />
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
            className="treasure-hunt__match-message"
            role="alert"
            aria-live="assertive"
            aria-label="Poeng informasjon - Kun for underholdning, ingen reell verdi"
          >
            <div className="treasure-hunt__match-title">Poeng: {totalPoints}</div>
            <div className="treasure-hunt__match-details">
              {matches.map((match, index) => (
                <div key={`match-${index}`} className="treasure-hunt__match-item">
                  <div className="treasure-hunt__match-symbol">{renderSymbol(match.symbol, true, 30)}</div>
                  {match.count}x (x{match.multiplier}) = {match.points}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="treasure-hunt__paytable" aria-label="Poengtabell - Viser symboler og deres verdier">
          <h3 className="treasure-hunt__paytable-title" id="paytable-title">
            POENGTABELL
          </h3>
          <div className="treasure-hunt__paytable-items" aria-labelledby="paytable-title">
            {symbols.map((symbol) => (
              <div
                key={symbol.id}
                className="treasure-hunt__paytable-item"
                aria-label={`${symbol.id} symbol gir ${symbol.value} ganger energi i poeng`}
              >
                <div className="treasure-hunt__paytable-symbol">{renderSymbol(symbol.id, false, 40)}</div>
                <div className="treasure-hunt__paytable-multiplier">x{symbol.value}</div>
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
