import { ParrotIcon } from "@/components/animated-icons/parrot-icon"
import { BananaIcon } from "@/components/animated-icons/banana-icon"
import { MonkeyIcon } from "@/components/animated-icons/monkey-icon"
import { CoconutIcon } from "@/components/animated-icons/coconut-icon"
import { StarIcon } from "@/components/animated-icons/star-icon"

export function Features() {
  return (
    <section className="features">
      <div className="features__container">
        <h2 className="features__title">FLYGENDE EVENTYR I JUNGELEN</h2>
        <p className="features__description">
          I "Papegøyens Flukt" styrer du den fargerike papegøyen Pelle gjennom en frodig og levende jungel. Ditt mål er
          å samle så mange frukter som mulig mens du unngår hindringer og oppdager skjulte skatter. Med intuitive
          kontroller og vakker grafikk blir du raskt oppslukt i dette engasjerende eventyret. Utforsk ulike
          jungelområder, møt vennlige dyr, og oppdag hemmelige stier som kan lede til ekstra belønninger og spennende
          utfordringer.
        </p>
        <div className="features__image-container">
          <div className="features__animated-icons">
            <div className="features__animated-icon features__animated-icon--monkey">
              <MonkeyIcon size={150} isAnimated={true} />
            </div>
            <div className="features__animated-icon features__animated-icon--banana">
              <BananaIcon size={120} isAnimated={true} />
            </div>
            <div className="features__animated-icon features__animated-icon--parrot">
              <ParrotIcon size={140} isAnimated={true} />
            </div>
            <div className="features__animated-icon features__animated-icon--coconut">
              <CoconutIcon size={130} isAnimated={true} />
            </div>
            <div className="features__animated-icon features__animated-icon--star">
              <StarIcon size={100} isAnimated={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
