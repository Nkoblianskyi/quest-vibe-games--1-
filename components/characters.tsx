import { ParrotIcon } from "@/components/animated-icons/parrot-icon"
import { BananaIcon } from "@/components/animated-icons/banana-icon"
import { CoconutIcon } from "@/components/animated-icons/coconut-icon"

export function Characters() {
  return (
    <section className="characters">
      <div className="characters__container">
        <h2 className="characters__title">JUNGELEVENTYR MED PAPEGØYEN PELLE</h2>
        <p className="characters__description">
          Bli med på et spennende eventyr med den fargerike papegøyen Pelle som flyr gjennom den frodige jungelen. Hjelp
          Pelle med å samle deilige frukter mens han navigerer mellom trær, lianer og andre hindringer. Dette er en
          reise full av fart, ferdighet og moro - perfekt for alle som ønsker å oppleve jungelens magi.
        </p>
        <div className="characters__grid">
          <div className="characters__card">
            <div className="characters__image-container">
              <div className="characters__animated-icon">
                <ParrotIcon size={200} isAnimated={true} />
              </div>
            </div>
            <h3 className="characters__name">PAPEGØYEN PELLE</h3>
            <p className="characters__trait">Rask. Fargerik. Eventyrlysten.</p>
            <p className="characters__description">
              Pelle er en modig og livlig papegøye med en forkjærlighet for eksotiske frukter. Med sine sterke vinger og
              skarpe øyne kan han navigere gjennom selv de tetteste jungelområder på jakt etter godbiter.
            </p>
          </div>
          <div className="characters__card">
            <div className="characters__image-container">
              <div className="characters__animated-icon">
                <BananaIcon size={200} isAnimated={true} />
              </div>
            </div>
            <h3 className="characters__name">SAFTIGE BANANER</h3>
            <p className="characters__trait">Energigivende. Verdifulle.</p>
            <p className="characters__description">
              Bananene i jungelen er ikke bare deilige, de gir også Pelle ekstra energi til å fly lengre og raskere. Jo
              flere bananer han samler, desto bedre blir hans evner til å utforske nye områder.
            </p>
          </div>
          <div className="characters__card">
            <div className="characters__image-container">
              <div className="characters__animated-icon">
                <CoconutIcon size={200} isAnimated={true} />
              </div>
            </div>
            <h3 className="characters__name">KOKOS-BONUS</h3>
            <p className="characters__trait">Sjelden. Kraftfull. Verdifull.</p>
            <p className="characters__description">
              Kokosnøtter er sjeldne skatter i jungelen. Når Pelle fanger en kokosnøtt, får han spesielle krefter som
              hjelper ham å overvinne utfordringer og oppdage hemmelige stier gjennom det tette jungellandskapet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
