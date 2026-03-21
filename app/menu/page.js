import Image from "next/image";
import { California_Paradise, HelveticaNeue, StardomRegular } from "../font";
import { Phone } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink";
import { FaInstagram,FaFacebookSquare  } from "react-icons/fa";
export default function Home() {
  return (
    <main className="text-[#6d111c]">
      <header className="h-screen bg-[url(https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center w-full ">
        <div className="bg-linear-to-t from-black to-transparent opacity-60 h-full w-full absolute"></div>
        <div className="bg-linear-to-b via-[#00000000] from-black to-transparent opacity-60 h-full w-full absolute"></div>
        <div
          className={`${HelveticaNeue.className} z-10 relative flex flex-col items-center justify-center h-full text-white`}
        >
          <div className="ml-auto w-1/3">
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
                                href="#histoire"
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
                                href="#lieu"
                              >
                                Lieu
                              </AnimatedLink>
                            </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center mt-auto mb-auto">
            <p>Bienvenue à la crêperie</p>
            <h1
              className={`${California_Paradise.className} text-white text-8xl text-center`}
            >
              Pépouze
            </h1>
            <h3 className="text-2xl">La crêperie du 12</h3>
            <h3>Galettes, Crêpes & Chill</h3>
            <div className="text-center mt-16">
              <a
                href="#menu"
                className="block p-[8px_22px] bg-transparent border-2 border-white rounded-4xl text-white text-xs font-bold uppercase decoration-0 cursor-pointer transition-all duration-300 ease relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-350 before:ease before:-z-1 hover:text-black hover:before:scale-x-100"
              >
                Réservé dès maintenant
              </a>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between w-full ">
            <p className="ml-2 mb-2">Fait maison</p>

            <p className="flex gap-2 mr-2 mb-2">
              <Phone size={"20"} />
              +06 16 27 34 22
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
                  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        <div className="menu_droit w-1/2 ml-10 hidden">
          <h2 className="text-xl font-bold">Les crêpes du moments</h2>
          <p className="text-[14px]">Formules:</p>
          <ul className="text-[14px]">
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
                  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
         <div className="flex flex-col items-center justify-center mt-auto mb-auto relative">
          <div className="text-center mt-16 relative flex z-1">
            <a
              href="#menu"
              className="block p-[8px_22px] bg-transparent border-2 border-black rounded-4xl text-black text-xs font-bold uppercase decoration-0 cursor-pointer transition-all duration-300 ease relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-350 before:ease before:-z-1 hover:text-white hover:before:scale-x-100"
            >
              Voir tout le menu
            </a>
          </div>
        </div> 
      </section>
      
      
      
      <section
        className={`${HelveticaNeue.className} Réservation text-white flex flex-col justify-center items-center bg-[url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen`}
      >
        <div className="bg-black opacity-60 h-full w-full absolute"></div>
        <div className="z-2 flex flex-col justify-center items-center w-full gap-4">
          <h1 className="text-3xl font-bold">Réservation</h1>
          <p className="text-2xl">Réserver votre table</p>
          <div className="flex flex-col w-155">
            <label>Votre nom</label>
            <input className="border-b focus:outline-0"></input>
          </div>
          <div className="flex flex-col w-155">
            <label>Le nombre de personne</label>
            <input
              className="border-b focus:outline-0"
              type="number"
              min="0"
              max="24"
            ></input>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col w-100">
              <label>Votre mail</label>
              <input className="border-b focus:outline-0" type="mail"></input>
            </div>
            <div className="flex flex-col w-50">
              <label>Votre numéro de téléphone</label>
              <input
                className="border-b focus:outline-0"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              ></input>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col  w-100">
              <label>La date</label>
              <input className="border-b focus:outline-0" type="date"></input>
            </div>
            <div className="flex flex-col w-50">
              <label>L'heure</label>
              <input className="border-b focus:outline-0" type="time"></input>
            </div>
          </div>
          <div className="flex flex-col w-155">
            <label>Votre message</label>
            <textarea className="border-b"></textarea>
          </div>
          <div className="text-center mt-16">
            <a
              href="#menu"
              className="block p-[8px_22px] bg-transparent border-2 border-white rounded-4xl text-white text-xs font-bold uppercase decoration-0 cursor-pointer transition-all duration-300 ease relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-350 before:ease before:-z-1 hover:text-black hover:before:scale-x-100"
            >
              Réservé dès maintenant
            </a>
          </div>
        </div>
      </section>
      
      <footer className="w-full h-screen bg-[#6d111c] flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center w-full mb-auto mt-auto">
          {" "}
          <h1
            className={`${California_Paradise.className} text-white text-8xl text-center`}
          >
            Pépouze
          </h1>
          <h3>Galettes, Crêpes & Chill</h3>
          <ul className="flex items-center justify-around w-50/100 mt-5">
            <li>
              <AnimatedLink
                color="white"
                target_on="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/thefabstudio2/"
              >
                Maison
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink
                color="white"
                target_on="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/thefabstudio2/"
              >
                Notre histoire
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink
                color="white"
                target_on="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/thefabstudio2/"
              >
                Menu
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink
                color="white"
                target_on="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/thefabstudio2/"
              >
                Réservation
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink
                color="white"
                target_on="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/thefabstudio2/"
              >
                Lieu
              </AnimatedLink>
            </li>
          </ul>
        </div>
        <div className="w-90/100 bg-gray-50 rounded-2xl h-[0.1px] mb-auto"></div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col w-1/3 m-5 gap-3">
            <h2>Adresse</h2>
            <p>12 rue du Point du Jour, Laillé, 35890</p>
            <ul className="flex">
              <li className="flex items-center justify-center p-2 bg-white rounded-full text-black"><FaInstagram /></li>
              <li className="flex items-center justify-center p-2 bg-white rounded-full text-black"><FaFacebookSquare /></li>
            </ul>
          </div>
          <div className="flex flex-col w-1/3 m-5 gap-3">
            <h2>Contact</h2>
            <p className="flex"><Phone/>06.16.27.34.22</p>
           
          </div>
          <div className="flex flex-col w-1/3 m-5 gap-3">
            <h2>Horaire</h2>
            <p>Dimanche lundi, mardi : fermé</p>
            <p>Mercredi – Jeudi : 12h – 14h </p>
            <p>Vendredi - Samedi:  12h – 14h/ 19h – 21h00</p>
            <button></button>
          </div>
        </div>
        <div className="w-90/100 bg-gray-50 rounded-2xl h-[0.1px] mb-auto"></div>
        <div className="flex justify-between w-full mb-5">
          <p className="ml-5">
            © 2026 Pépouze la crêperie du 12. Tous droits réservés
          </p>
          <p className="mr-5">
            Conditions générales & Politique de confidentialité
          </p>
        </div>
      </footer>
    </main>
  );
}
