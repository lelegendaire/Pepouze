"use client"
import Image from "next/image";
import { California_Paradise, HelveticaNeue, StardomRegular } from "../font";
import { Phone } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink";
import { FaInstagram,FaFacebookSquare  } from "react-icons/fa";
import { useState, useEffect,useRef} from "react";
import MobileMenu from "@/components/MobileMenu"
import Footer from "@/components/footer"
import ReservationSection from "@/components/reservation"
export default function Home() {
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
  return (
    <main className="text-[#6d111c]">
     <header ref={headerRef} className="h-screen w-full relative"  style={{
            backgroundImage:
              "url(/Hero.jpg)",
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
        <h1 className={`${StardomRegular.className} text-4xl`}>Notre Menu</h1>
      

        <div className="flex justify-center items-center w-full">
          <div className="menu_gauche w-1/2 ml-10">
            <h2 className="text-2xl font-bold">Galette de sarrasin</h2>
            <p className="italic">
              Toutes nos galettes sont produites à partir de la farine de
              sarrasin IGP breton issue du moulin Carouge
            </p>
            <p className="mb-5 text-xl">Les classiques:</p>

            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <p>Beurre</p>
                <p className="mr-3">3.50€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">Complète</p>
                  <p>beurre, ceuf miroir, jambon, fromage</p>
                </div>
                <div>
                  <p className="mr-3">7.50€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Andouille de Guéméné, fromage</p>
                <p className="mr-3">7.00€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Œuf jambon</p>
                <p className="mr-3">6.50€</p>
              </li>
            </ul>
            <p className="mb-5 text-xl mt-10">Les variantes:</p>

            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <p>Œuf comté AOP ou comté AOP jambon</p>
                <p className="mr-3">6.50€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p>Super complète</p>
                  <p>complète+ champignons</p>
                </div>
                <div>
                  <p className="mr-3">9.40€</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-1/2 h-100 overflow-hidden mr-10 flex items-center justify-center">
            <div className="w-70/100 h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={
                  "/galette5.webp"
                }
              ></Image>
            </div>
          </div>
        </div>
        <div className=" justify-center items-center w-full flex">
          <div className="w-1/2 h-100 overflow-hidden mr-10 flex items-center justify-center">
            <div className="w-70/100 h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={
                  "/galette6.webp"
                }
              ></Image>
            </div>
          </div>
          <div className="menu_droit w-1/2 ml-10">
            <p className="text-xl">Les spéciales:</p>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Bossardière</p>
                  <p>fromage, champignons, crème, lardons fumés</p>
                </div>
                <div>
                  <p className="mr-3">10.00€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Pépinière</p>
                  <p>œuf, fromage, champignons</p>
                </div>
                <div>
                  <p className="mr-3">7.00€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Rouesnais</p>
                  <p>
                    pommes de terre, fromage raclette, oignons confits, lardons
                    fumés, crème
                  </p>
                </div>
                <div>
                  <p className="mr-3">13.90€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Bezirais</p>
                  <p>fromage, saumon fumé, crème fraîche, ciboulette, citron</p>
                </div>
                <div>
                  <p className="mr-3">12.40€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Feutelais</p>
                  <p>pommes de terre, oignons confits, comté AOP, jambon sec</p>
                </div>
                <div>
                  <p className="mr-3">13.00€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Margatière</p>
                  <p>pommes, andouille de Guéméné, crème moutarde</p>
                </div>
                <div>
                  <p className="mr-3">9.80€</p>
                </div>
              </li>
            </ul>

            <div className="flex justify-between items-center w-full mt-5 text-[14px]">
              <p className="">Bol de salade verte</p>
              <p className="mr-3">2.00€</p>
            </div>
            <div className="flex justify-between items-center w-full mt-5 text-[14px]">
              <p className="">
                Supplément par ingrédient (oignons, champignons, pommes de
                terre)
              </p>
              <p className="mr-3">1.90€</p>
            </div>
          </div>
        </div>
       
       
         <div className=" justify-center items-center w-full flex">
          <div className="menu_droit w-1/2 ml-10">
            <h2 className="text-2xl font-bold">Les crêpes du moments</h2>
            <p className="mb-5 text-xl">Les classiques:</p>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <p>Beurre</p>
                <p className="mr-3">2.80€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Sucre</p>
                <p className="mr-3">2.80€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Beurre sucre</p>
                <p className="mr-3">3.60€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Beurre sucre citron</p>
                <p className="mr-3">4.60€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Confiture(fraise,abricot)</p>
                <p className="mr-3">4.30€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Chocolat maison</p>
                <p className="mr-3">4.60€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Caramel au beurre salé maison</p>
                <p className="mr-3">4.80€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Pâte à tartiner au chocolat</p>
                <p className="mr-3">4.30€</p>
              </li>
            </ul>
            <div className="flex justify-between items-center w-full mt-5 text-[14px]">
              <p className="">Supplément chantilly, une boule de glace</p>
              <p className="mr-3">1.90€</p>
            </div>
          </div>

          <div className="w-1/2 h-100 overflow-hidden mr-10 flex items-center justify-center">
            <div className="w-70/100 h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={
                  "/crepe1.jpg"
                }
              ></Image>
            </div>
          </div>
        </div>
        <div className=" justify-center items-center w-full flex">
          <div className="w-1/2 h-100 overflow-hidden mr-10 flex items-center justify-center">
            <div className="w-70/100 h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={
                  "/crepe1.jpg"
                }
              ></Image>
            </div>
          </div>
          <div className="menu_droit w-1/2 ml-10">
            <p className="text-xl">Les spéciales:</p>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Caliorne</p>
                  <p>crème d'amandes maison, chantilly, éclats d'amandes</p>
                </div>
                <div>
                  <p className="mr-3">2.80€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Gautrais</p>
                  <p>
                    crème de coco maison, chantilly, copeaux de noix de coco
                  </p>
                </div>
                <div>
                  <p className="mr-3">2.80€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Miaudière</p>
                  <p>
                    caramel au beurre salé maison, boule de glace vanille,
                    chantilly
                  </p>
                </div>
                <div>
                  <p className="mr-3">3.60€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Besnardais</p>
                  <p>poire, chocolat, éclats d'amandes, chantilly</p>
                </div>
                <div>
                  <p className="mr-3">4.60€</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
         <div className="menu_droit w-1/2 ml-10 flex flex-col mt-5">
          <p className="text-xl">Formules:</p>
          <ul className="text-base border p-5 border-dashed">
            <li>
              Rapides (uniquement le midi): galette complète, crêpe beurre
              sucre, bol de salade{" "}
            </li>
            <li>
              Enfant (jusqu'à 12 ans): galette jambon fromage, crêpe chocolat,
              verre de jus de pomme ou sirop à l'eau
            </li>
          </ul>
        </div>
       
      </section>
      
      
      
   <ReservationSection/>
      
     <Footer/>
    </main>
  );
}
