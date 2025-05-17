import { ParrotIcon } from "@/components/animated-icons/parrot-icon"

export function About() {
  return (
    <section className="about">
      <div className="about__container">
        <h2 className="about__title">OM QUESTVIBE</h2>
        <div className="about__content">
          <div className="about__text">
            <p className="about__paragraph">
              QuestVibe er skapt for å gi deg en unik og fargerik opplevelse i en virtuell jungel. Vår plattform
              kombinerer spennende eventyr med sosial moro, der du kan utforske eksotiske omgivelser og teste dine
              ferdigheter i et trygt miljø.
            </p>
            <p className="about__paragraph">
              Vårt dedikerte team av kreative designere har bygget en verden der farger, lyder og bevegelser skaper en
              levende jungel-atmosfære. Hver detalj er nøye utformet for å gi deg en oppslukende og engasjerende
              opplevelse som stimulerer sansene.
            </p>
            <p className="about__paragraph">
              I QuestVibe handler det om ren underholdning og glede. Her finner du ingen kompliserte regler eller
              stressende elementer - bare en avslappende flukt inn i en fantasiverden der du kan være deg selv og nyte
              øyeblikket i ditt eget tempo.
            </p>
          </div>
          <div className="about__image-container">
            <div className="about__animated-icon">
              <ParrotIcon size={400} isAnimated={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
