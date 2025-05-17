"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function PlayButton() {
  const [showAgeVerification, setShowAgeVerification] = useState(false)
  const router = useRouter()

  const handlePlayClick = () => {
    setShowAgeVerification(true)
  }

  const handleConfirm = () => {
    // Redirect to game page
    router.push("/spill")
  }

  const handleCancel = () => {
    setShowAgeVerification(false)
  }

  return (
    <div className="play-button" itemScope itemType="https://schema.org/InteractionCounter">
      <button
        className="play-button__button"
        onClick={handlePlayClick}
        aria-label="Start spillet - Aldersbekreftelse kreves"
        aria-haspopup="dialog"
      >
        Spill QuestVibe
      </button>

      {showAgeVerification && (
        <div className="age-verification" role="dialog" aria-modal="true" aria-labelledby="age-verification-title">
          <div className="age-verification__content">
            <h3 className="age-verification__title" id="age-verification-title">
              Aldersbekreftelse
            </h3>
            <p className="age-verification__text">
              <strong>Viktig:</strong> Du må bekrefte at du er 18 år eller eldre for å spille QuestVibe.
            </p>
            <div
              className="age-verification__disclaimer"
              role="alert"
              aria-label="Viktig informasjon om at dette ikke er pengespill"
            >
              <p>
                <strong>VIKTIG INFORMASJON:</strong> QuestVibe er kun en sosial plattform for underholdningsformål.
                Dette er IKKE pengespill. Ingen ekte penger er involvert, ingen premier eller belønninger, og ingen
                virtuelle gjenstander har noen reell verdi.
              </p>
            </div>
            <div className="age-verification__buttons">
              <button
                className="age-verification__button age-verification__button--confirm"
                onClick={handleConfirm}
                aria-label="Jeg bekrefter at jeg er 18 år eller eldre"
              >
                Jeg bekrefter at jeg er 18 år eller eldre
              </button>
              <button
                className="age-verification__button age-verification__button--cancel"
                onClick={handleCancel}
                aria-label="Avbryt og gå tilbake"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
