import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  return (
    <Accordion
      type="single"
      
      defaultValue="shipping"
      className="max-w-lg"
      
    >
      <AccordionItem value="shipping">
        <AccordionTrigger className={"text-2xl"}>Proposez-vous des options végétariennes?</AccordionTrigger>
        <AccordionContent className={"text-xl"}>
         Oui, nous proposons des galettes végétariennes, et certaines recettes évoluent selon les produits de saison.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger className={"text-2xl"}>Vos galettes sont-elles sans gluten?</AccordionTrigger>
        <AccordionContent className={"text-xl"}>
         Nos galettes sont réalisées à base de farine de blé noir (sarrasin), naturellement sans gluten.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger className={"text-2xl"}>D’où viennent vos ingrédients?</AccordionTrigger>
        <AccordionContent className={"text-xl"}>
          Nous utilisons des ingrédients frais et sélectionnés avec soin, avec une farine de blé noir 100 % IGP bretonne et une cuisine entièrement faite maison.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support1">
        <AccordionTrigger className={"text-2xl"}>Peut-on réserver une table en ligne?</AccordionTrigger>
        <AccordionContent className={"text-xl"}>
          Oui, vous pouvez réserver via nos réseaux sociaux (Instagram ou Facebook) ou directement par téléphone et récemment sur notre site internet
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support2">
        <AccordionTrigger className={"text-2xl"}>Faites-vous des plats à emporter?</AccordionTrigger>
        <AccordionContent className={"text-xl"}>
          Oui, certaines galettes et crêpes peuvent être proposées à emporter selon l’affluence.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support3">
        <AccordionTrigger className={"text-2xl"}>Quels sont vos horaires d’ouverture?</AccordionTrigger>
        <AccordionContent className={"text-xl"}>
          Nous sommes ouverts : du mercredi au samedi le midi et le vendredi & samedi soir. Les horaires peuvent varier, pensez à vérifier avant de venir.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
