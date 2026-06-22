"use client"
import { useState, useEffect,useRef} from "react";
import MobileMenu from "@/components/MobileMenu"
import Footer from "@/components/footer"
import { California_Paradise, HelveticaNeue, StardomRegular } from "../font";
import { Phone } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink";
export default function Evenements() {
     const [offset, setOffset] = useState(0)
      const headerRef = useRef(null)
       useEffect(() => {
        let ticking = false
      
        const update = () => {
          if (!headerRef.current) return
      
          const scrollY = window.scrollY
      
          // 👇 parallax fluide (pas de re-render React)
          headerRef.current.style.backgroundPosition = `center ${scrollY * 0.4}px`
      
          ticking = false
        }
      
        const onScroll = () => {
          if (!ticking) {
            requestAnimationFrame(update)
            ticking = true
          }
        }
      
        window.addEventListener("scroll", onScroll)
      
        return () => window.removeEventListener("scroll", onScroll)
      }, [])
    return(
         <main className="text-[#6d111c]">
     <header ref={headerRef} className="h-screen w-full relative"  style={{
            backgroundImage:
              "url(/img/devanture.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: `bottom ${offset * 0.5}px`, // 👈 effet parallax
            
          }}>
            <div className="bg-linear-to-t from-black to-transparent opacity-60 h-full w-full absolute"></div>
            <div className="bg-linear-to-b via-[#00000000] from-black to-transparent opacity-60 h-full w-full absolute"></div>
            <div
              className={`${HelveticaNeue.className} z-10 relative flex flex-col items-center justify-center h-full text-white`}
            >
              <div className="lg:w-40/100 w-auto ml-auto hidden md:block">
                <ul className="flex items-center justify-around w-full mt-5">
                  <li>
                    <AnimatedLink
                      color="white"
                      
                      rel="noopener noreferrer"
                      href="/"
                    >
                      Maison
                    </AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink
                      color="white"
                      
                      rel="noopener noreferrer"
                      href="/#histoire"
                    >
                      Notre histoire
                    </AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink
                      color="white"
                      target_on="_blank"
                      rel="noopener noreferrer"
                      href="/menu"
                    >
                      Menu
                    </AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink
                      color="white"
                      
                      rel="noopener noreferrer"
                      href="#reservation"
                    >
                      Réservation
                    </AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink
                      color="white"
                      
                      rel="noopener noreferrer"
                      href="/#lieu"
                    >
                      Lieu
                    </AnimatedLink>
                  </li>
                </ul>
              </div>
                {/* Nav mobile — burger */}
              <div className="md:hidden absolute top-1 right-1 z-50">
                <MobileMenu />
              </div>
              <div className="flex flex-col items-center justify-center mt-auto mb-auto">
                <p className="text-xl lg:text-base">Bienvenue à la crêperie</p>
                <h1
                  className={`${California_Paradise.className} text-white text-7xl lg:text-8xl text-center`}
                >
                  Pépouze
                </h1>
                <h3 className="text-xl lg:text-2xl">La crêperie du 12</h3>
                <h3 className="text-base lg:text-base">Galettes, Crêpes & Chill</h3>
                <div className="text-center lg:mt-16 lg:relative absolute lg:bottom-0 bottom-20">
                  <a
                    href="#reservation"
                    className="block p-[4px_11px] lg:p-[8px_22px] bg-transparent border-2 border-white rounded-4xl text-white text-[8px] lg:text-xs font-bold uppercase decoration-0 cursor-pointer transition-all duration-300 ease relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-350 before:ease before:-z-1 hover:text-black hover:before:scale-x-100"
                  >
                    Réservé dès maintenant
                  </a>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between w-full ">
                <p className="ml-2 mb-2 text-xs lg:text-base">Fait maison</p>
    
                <p className="flex gap-2 mr-2 mb-2 text-xs lg:text-base items-center justify-center">
                  <Phone size={"20"} className="scale-50 lg:scale-100 left-2 lg:left-0 relative" />
                  06 16 27 34 22
                </p>
              </div>
            </div>
          
          </header>
      
      
      <section
        className={`${HelveticaNeue.className} menu pt-10 pb-10 bg-[#f7f6f2] h-full w-full flex items-center justify-center flex-col`}
      >
      
       </section>
<Footer/>
       </main>

    )
}