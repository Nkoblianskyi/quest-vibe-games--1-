"use client"

import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header" role="banner" aria-label="Hovednavigasjon">
      <div className="header__container" itemScope itemType="https://schema.org/SiteNavigationElement">
        <Link href="/" className="header__logo" aria-label="QuestVibe - Gå til hjemmesiden">
          QUESTVIBE
        </Link>
        <button
          className="header__menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
        >
          <span className="header__menu-icon"></span>
        </button>
        <nav
          className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}
          aria-hidden={!isMenuOpen}
          id="main-menu"
        >
          <ul className="header__nav-list" role="menu">
            <li className="header__nav-item" role="none">
              <Link
                href="/spill"
                className="header__nav-link"
                role="menuitem"
                aria-label="Spill"
                onClick={() => setIsMenuOpen(false)}
              >
                Spill
              </Link>
            </li>
            <li className="header__nav-item" role="none">
              <Link
                href="/vilkar"
                className="header__nav-link"
                role="menuitem"
                aria-label="Vilkår for bruk"
                onClick={() => setIsMenuOpen(false)}
              >
                Vilkår
              </Link>
            </li>
            <li className="header__nav-item" role="none">
              <Link
                href="/personvern"
                className="header__nav-link"
                role="menuitem"
                aria-label="Personvernpolicy"
                onClick={() => setIsMenuOpen(false)}
              >
                Personvern
              </Link>
            </li>
            <li className="header__nav-item" role="none">
              <Link
                href="/ansvarsfraskrivelse"
                className="header__nav-link"
                role="menuitem"
                aria-label="Ansvarsfraskrivelse"
                onClick={() => setIsMenuOpen(false)}
              >
                Ansvarsfraskrivelse
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
