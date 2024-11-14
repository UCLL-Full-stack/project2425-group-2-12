[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/twPj_hbU)

# Brol.com - Digital Store

### \<Robbe Nevens\> / \<Senne Rosseel\>

With the Brol.com app we want customers to be able to register and
buy products digitally. Customers can add and remove products to the cart and order them. Admins can create and delete products.

Vereisten:

- [ ] De code van je project staat op GitHub classroom, in een repository die overeenkomt met je Toledo groep.
- [ ] De map “back-end/model” bevat je domeinmodel geschreven in Typescript.
- [ ] De map “back-end/test/model” bevat alle tests voor je domeinobjecten. Op dit moment kun je alleen het aanmaken van je objecten testen, validatie is voor de volgende les.
- [ ] Tests worden geschreven met Jest.

* [ ] Alle lagen worden geïmplementeerd volgens de principes van gelaagde architectuur:
* [ ] Domein
* [ ] Services
* [ ] Controllers
* [ ] Validatie:
* [ ] Controllers bevatten geen validatie.
* [ ] Services bevatten overkoepelende validatieregels.
* [ ] Domeinobjecten bevatten input validatie en business validatie die specifiek zijn voor dat domeinobject.
* [ ] Testen:
* [ ] Alle domeinobjecten zijn volledig getest met Jest, inclusief validatie.
* [ ] Alle services zijn volledig getest met Jest.
* [ ] Controllers worden getest via swagger (handmatig), geen aparte tests nodig.
* [ ] De gegevens die binnenkomen via requests in de router worden ingekapseld in Data Transfer Objects. Deze DTO's zijn gedefinieerd in een bestand **index.ts** in de map **types** .
* [ ] Alle routes zijn volledig gedocumenteerd en uitvoerbaar met Swagger via de url **/api-docs** .
* [ ] Voor elk type is er een volledig uitgewerkt componentenschema gedefinieerd bovenaan de controller zelf.
* [ ] Een Next.js front-end app is geïnstalleerd in de front-end directory.
* [ ] Alle pagina's die een route in Next.js nodig hebben worden in de map “pages” geplaatst.
* [ ] Pagina's worden opgebouwd uit verschillende herbruikbare componenten die in de map “components” worden geplaatst.
* [ ] Componenten worden niet rechtstreeks geïmplementeerd in een pagina.
* [ ] “Props” worden gebruikt om dynamische inhoud binnen componenten weer te geven.
* [ ] “State” wordt gebruikt om informatie op te slaan tussen verschillende renders van een component (geen lokale variabelen!).
* [ ] Callback functies worden gebruikt om hogerliggende componenten of pagina's op de hoogte te brengen van een gebeurtenis binnen de huidige component.
* [ ] Het aanroepen van een Rest API gebeurt in afzonderlijke, herbruikbare Services. Er wordt nooit fetch logica rechtstreeks in een component geschreven.
* [ ] Dynamische routing moet op de juiste plaatsen worden gebruikt.
* [ ] Je gebruikt events op verschillende plaatsen (onclick, onhover, ...).
