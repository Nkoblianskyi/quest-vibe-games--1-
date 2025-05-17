import Image from "next/image"

export function Hero() {
  return (
    <section className="hero" itemScope itemType="https://schema.org/Thing" aria-labelledby="hero-title">
      <div className="hero__content">
        <h1 className="hero__title" id="hero-title" itemProp="name">
          QUESTVIBE
        </h1>
        <p className="hero__subtitle" itemProp="description">
          En Eventyrlig Sosial Spillplattform
        </p>
        <p className="hero__disclaimer">
          <strong>KUN FOR UNDERHOLDNING</strong> - Ingen ekte penger, ingen premier
        </p>
      </div>
      <div className="hero__image-container">
        <Image
          src="/jungle-treasure-adventure.png"
          alt="Eventyrlig jungel scene"
          width={1200}
          height={600}
          className="hero__image"
          priority
        />
      </div>
    </section>
  )
}
