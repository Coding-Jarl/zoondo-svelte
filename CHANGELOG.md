# Review list

``prisma\seed.ts``
- Utilisation de la méthode du ``signup`` pour la création des comptes initiaux. Ca permet donc de pouvoir les connecter sans avoir besoin de créer d'autres comptes
- Correction du type

``src\lib\components\Chat.svelte``
- Correction de quelques problèmes de css

``src\lib\data\mock.ts``
- Suppression de ``cardsOnBoard``
- Création d'un schema zod pour les cards
  - ``+`` Ca permet de facilement récupérer les slugs pour en faire un type.
  ```ts
  // typeof availableCards = Record<string, Game.Card>
  type Keys = keyof availableCards; // string
  // Comme on définie le type des keys à string, il nous retourne string
  ```
  - ``+`` On peut mettre des valeurs par défaut. Par exemple, si y'a pas de resolver, on peut faire en sorte que ca ajoute une fonction par défaut, ce qui permet d'avoir des tests en moins par la suite
  - ``-`` Rajoute une couche, ca qui peut rendre le code plus complexe. L'utilisation de méthode permet de contrecarrer en partie
  - ``-`` On sait au lancement de l'app si le type est bon ou pas, et non quand on écrit l'objet.
- Création d'une méthode pour valider le mock
- Modification des types pour les lier au schema
- Correction des slugs
- Ajout d'une prop image (car le slug n'est pas valable car pour les cas où on a `:1`)
- Ajout de l'extension dans le path de l'image

``src\lib\server\websocket\playAction.ts``
- applyAction :
  - Prise en compte du double resolver => Egalité
  - Simplification du code et meilleure fragmentation du if

``src\lib\stores\game.ts``
- Transformation du Array en Map (Un des gros changement que j'avais fait)
  - ``+`` Plus rapide qu'un array
  - ``+`` Recherche bien plus facile quand on a la position
    ```js
    // Avant
    board.find((sq) => sq.x === x && sq.y === y)?.card ?? null;
    // Après
    board.get('1:3');
    ```
  - ``-`` On ne peut pas envoyer de Map par les Sockets. On peut toutefois les envoyer sous forme d'Array.
- Pour cela j'avais donc ajouter 2 méthodes au Map : ``reverse()`` et ``toArray()`` que j'importais à partir du layout. Avec du recule, une classe qui extends Map serait plus appropriée. Par exemple :
  ```ts
  export class Board<K, V> extends Map<K, V> {
    generate() {}

    toArray(): Array<[K, V]> {
      return Array.from(this.entries());
    }
    reverse(): Board<K, V> {
      return new Board(this.toArray().reverse());
    }

    applyAction() {}
  }
  ```

``src\routes\(protected)\games\[id]\+page.svelte``
``src\routes\(protected)\games\[id]\(components)\CardSample.svelte``
- Correction du CSS pour que le board et le chat tiennent dans la page (pas de scroll)

``src\lib\types``
- Vérification de chacun des types

``tailwind.config.js``
- Ajout de classes dans tailwind config pour les height

> Je reste disponible pour coder tout cela avec toi si tu as du temps. Pas forcement la motivation de tout refaire dans mon coin.