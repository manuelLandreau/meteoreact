# Projet "La princesse et les 2 moustachus"

### Choix des technologies

**Meteor.js** : Framework javascript (back), il contient son propre environnement de developpement et une base de donnée MongoDb dirrectement lancé avec l'application.

Exemple du CLI: 

pour céer un projet 

`meteor create mon_projet`

et pour le démarrer 

`cd mon_projet && meteor`

Il contient aussi toute sorte de librairie comme un router (flowRouter), un système d'authentification, de validation de formulaire, evironnement de test...

en conclusion il est parfait pour éviter la "js fatigue" donc éviter de se perdre les bafonds de npm.

**React.js**: Librairie javascript (front)

Meteor propose un integration ultra simplifié de React, ici utilisé plus comme un moteur de template,
L'avantage qu'a React c'est la virtualisation du dom et donc pouvoir integrer du javascript directement dans le dom.

Une de ses philosophies est aussi de créer des Components pour chaque petite partie de l'application, ce qui permetera des les tester plus facilement.

Pour une application authonome React j'aurai utilisé des librairies comme React-router (remplacé par flowRouter) ou react-redux (remplacé par le systeme de Session de Meteor)  
mais étant épaulé par Meteor, j'ai preferé utiliser le router de celui-ci ainsi que son système de Model (les appels à MongoDb sont dirrectement integrés dans React).


