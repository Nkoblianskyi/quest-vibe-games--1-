import { ParrotIcon } from "@/components/animated-icons/parrot-icon"
import { BananaIcon } from "@/components/animated-icons/banana-icon"
import { CoconutIcon } from "@/components/animated-icons/coconut-icon"
import { StarIcon } from "@/components/animated-icons/star-icon"

export function GamePreview() {
  return (
    <section className="game-preview">
      <div className="game-preview__container">
        <div className="game-preview__image-container">
          <div className="game-preview__jungle-scene">
            <div className="game-preview__scene-title">
              <h3>Papegøyens Flukt</h3>
              <p>Fly gjennom jungelen og samle frukter</p>
            </div>
            <div className="game-preview__flying-parrot">
              <ParrotIcon size={100} isAnimated={true} className="game-preview__parrot" />
              <div className="game-preview__flight-path">
                <BananaIcon size={50} isAnimated={true} className="game-preview__fruit game-preview__fruit--banana-1" />
                <CoconutIcon size={60} isAnimated={true} className="game-preview__fruit game-preview__fruit--coconut" />
                <BananaIcon size={50} isAnimated={true} className="game-preview__fruit game-preview__fruit--banana-2" />
                <StarIcon size={40} isAnimated={true} className="game-preview__fruit game-preview__fruit--star" />
                <BananaIcon size={50} isAnimated={true} className="game-preview__fruit game-preview__fruit--banana-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
