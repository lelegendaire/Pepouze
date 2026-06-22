import { California_Paradise, HelveticaNeue, StardomRegular } from "../../app/font";
import Image from "next/image";
export default function Menu(){
    return (
       <>
        <h1 className={`${StardomRegular.className} text-4xl`}>Notre Menu</h1>
        <div className=" justify-center items-center w-full hidden">
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
           
          </div>

          <div className="w-1/2 h-100 overflow-hidden mr-10 flex items-center justify-center">
            <div className="w-70/100 h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={"/galette5.webp"}
              ></Image>
            </div>
          </div>
        </div>
        <div className=" justify-center items-center w-full hidden">
          <div className="w-1/2 h-100 overflow-hidden mr-10 flex items-center justify-center">
            <div className="w-70/100 h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={"/galette6.webp"}
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

        <div className="flex justify-center items-center w-full flex-col lg:flex-row ">
          <div className="menu_gauche lg:w-1/2 w-auto ml-10">
            <h2 className="text-2xl font-bold">Galette de sarrasin</h2>
            <p className="italic">
              Nos galettes sont produites à partir de la farine de
              sarrasin IGP breton issue du moulin Carouge, naturellement sans gluten
            </p>
            <p className="mb-5 text-xl">Les classiques:</p>

            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <p>Beurre</p>
                <p className="mr-3">3.50€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>Andouille de Guéméné, fromage bio</p>
                <p className="mr-3">7.50€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <p>2 ingrédients: oeuf bio ou jambon ou fromage bio ou comté AOP </p>
                <p className="mr-3">6.50€</p>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">Complète</p>
                  <p>oeuf bio, jambon, fromage bio</p>
                </div>
                <div>
                  <p className="mr-3">7.50€</p>
                </div>
              </li>
               <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">Super complète</p>
                  <p>oeuf bio, jambon, fromage bio, champignons</p>
                </div>
                <div>
                  <p className="mr-3">8.70€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                <p className="font-bold">La Pépinière (VG)</p>
                <p>Œuf bio, fromage bio, champignons</p>
               </div>
                <p className="mr-3">7.60€</p>
              </li>
            </ul>
           
          </div>
          <div className="w-auto h-60 lg:w-1/2 lg:h-100 overflow-hidden lg:mr-10 flex items-center justify-center">
            <div className="h-50 w-75 lg:w-70/100 lg:h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={"/galette5.webp"}
              ></Image>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full flex-col-reverse lg:flex-row">
          <div className="w-auto h-60 lg:w-1/2 lg:h-100 overflow-hidden lg:mr-10 flex items-center justify-center">
            <div className="h-50 w-75 lg:w-70/100 lg:h-100 relative">
              <Image
                alt="restaurant2"
                fill={true}
                className="object-cover"
                src={"/galette6.webp"}
              ></Image>
            </div>
          </div>
          <div className="menu_droit lg:w-1/2 w-auto ml-10">
            <p className="text-xl">Les spéciales:</p>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Bossardière</p>
                  <p>fromage bio, champignons, lardons fumés, crème</p>
                </div>
                <div>
                  <p className="mr-3">10.00€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Rouesnais</p>
                  <p>
                    pommes de terre, raclette, oignons confits, lardons
                    fumés, crème
                  </p>
                </div>
                <div>
                  <p className="mr-3">12.50€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Bezirais</p>
                  <p>fromage bio, saumon fumé, crème, ciboulette, citron</p>
                </div>
                <div>
                  <p className="mr-3">12.20€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Feutelais</p>
                  <p>pommes de terre, comté AOP, oignons confits, jambon sec, ciboulette</p>
                </div>
                <div>
                  <p className="mr-3">12.00€</p>
                </div>
              </li>
              <li className="flex justify-between items-center border-b p-3">
                <div>
                  <p className="font-bold">La Margatière</p>
                  <p>pommes, andouille de Guéméné, crème moutarde</p>
                </div>
                <div>
                  <p className="mr-3">10.90€</p>
                </div>
              </li>
            </ul>

            
          </div>
        </div>
      
       
    </>
    )
}