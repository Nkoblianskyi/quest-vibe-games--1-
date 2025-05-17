export default function DisclaimerPage() {
  return (
    <main
      className="disclaimer-page"
      itemScope
      itemType="https://schema.org/WebPage"
      aria-labelledby="disclaimer-title"
    >
      <meta itemProp="name" content="Ansvarsfraskrivelse - QuestVibe Games" />
      <div className="disclaimer-page__container">
        <h1 className="disclaimer-page__title" id="disclaimer-title">
          Ansvarsfraskrivelse
        </h1>

        <div className="disclaimer-page__alert" role="alert" aria-label="Viktig advarsel om aldersgrense">
          <h2 className="disclaimer-page__alert-title">18+ ALDERSGRENSE</h2>
          <p className="disclaimer-page__alert-text">
            <strong>QuestVibe er kun for personer som er 18 år eller eldre.</strong> Hvis du er under 18 år, har du ikke
            tillatelse til å bruke denne plattformen.
          </p>
        </div>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-1">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-1">
            1. Underholdningsformål
          </h2>
          <p className="disclaimer-page__text">
            <strong>QuestVibe er utelukkende utviklet for underholdningsformål.</strong> Det er en sosial spillplattform
            og involverer ikke ekte penger, premier eller belønninger av noen slag. Dette er IKKE pengespill.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-2">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-2">
            2. Ingen pengespill
          </h2>
          <p className="disclaimer-page__text">
            <strong>Vi tilbyr ikke pengespill eller muligheter til å få premier eller belønninger.</strong> Alle
            aktiviteter på plattformen er fiktive og har ingen verdi i den virkelige verden. Dette er KUN for
            underholdning.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-3">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-3">
            3. Ansvarlig bruk
          </h2>
          <p className="disclaimer-page__text">
            Vi oppfordrer alle brukere til å bruke vår plattform på en ansvarlig måte. Hvis aktivitetene på vår
            plattform begynner å påvirke ditt daglige liv negativt, anbefaler vi at du tar en pause og vurderer å søke
            hjelp.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-4">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-4">
            4. Ressurser for støtte
          </h2>
          <p className="disclaimer-page__text">
            Hvis du eller noen du kjenner har problemer relatert til overdreven spilling eller lignende aktiviteter, er
            støtte tilgjengelig gjennom organisasjoner som{" "}
            <a
              href="https://hjelpelinjen.no"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besøk Hjelpelinjen - Åpnes i nytt vindu"
            >
              Hjelpelinjen
            </a>{" "}
            (hjelpelinjen.no),{" "}
            <a
              href="https://gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besøk GamCare - Åpnes i nytt vindu"
            >
              GamCare
            </a>{" "}
            (gamcare.org.uk) og{" "}
            <a
              href="https://gambleware.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besøk GambleAware - Åpnes i nytt vindu"
            >
              GambleAware
            </a>{" "}
            (gambleware.org).
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-5">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-5">
            5. Ansvarsfraskrivelse for innhold
          </h2>
          <p className="disclaimer-page__text">
            Vi gjør vårt beste for å sikre at innhold på QuestVibe er passende og skaper en positiv brukeropplevelse. Vi
            påtar oss imidlertid ikke ansvar for eventuelle misforståelser eller feiltolkninger av innholdet.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-6">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-6">
            6. Tekniske problemer
          </h2>
          <p className="disclaimer-page__text">
            Vi streber etter å opprettholde en stabil og feilfri plattform, men vi kan ikke garantere kontinuerlig,
            uavbrutt tilgang til tjenesten. Vi er ikke ansvarlige for eventuelle tap eller skader som følge av tekniske
            problemer.
          </p>
        </section>
      </div>
    </main>
  )
}
