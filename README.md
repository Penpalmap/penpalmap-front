# Penpalmap-front
L'app front de Penpalmap

## Installation
1. Cloner le dépôt localement 
```
git clone https://github.com/Penpalmap/penpalmap-front.git
```

2. Installer les dépendances
```
npm install
```

3. Démarrer l'application en développement
```
npm run dev
```  

Le serveur de développement démarrera sur http://localhost:3000.  

## Configuration
1. Renommez le .env.example en .env
2. Les variables du .env correspondent à :  
- NEXT_PUBLIC_API_URL: L'URL de l'API  
- ENVIRONMENT: Environnement sur lequel on se trouve
- NEXT_PUBLIC_GOOGLE_CLIENT_ID: client ID Google
- NEXT_PUBLIC_GOOGLE_SECRET_ID: Secret ID Google
- NEXT_PUBLIC_JWT_SECRET: Mot de passe secret pour JWT


## Structure du projet
  
- pages/: Chaque fichier et dossier represente une route de l'application
- components/: Tous les composants de l'application
- styles/: Styles liés à Openlayer et custom theme pour Chakra UI
- public : Répertoire contenant les fichiers statiques (images, polices, etc.) accessibles publiquement.
- utils/ : Répertoire contenant les utilitaires et les fonctions réutilisables.
- api/: Répertoire contenant les fichiers avec des fonctions d'appel à l'API
- context/: Répertoire contenant les fichiers de contexte (pour avoir des variables accessibles sur toute l'app)
- hooks/ : Répertoire contenant les hooks personnalisés utilisés dans l'application.
- types/: Répertoire contenant les fichiers avec les types (TS)

## Outils principaux
- **Next.js**
- **Chakra UI** pour le stylage de l'application
- **React Hook Form** pour la gestion des formulaires
- **React** 18.2.0  
- **Next Auth** pour l'authentification
- **Openlayer** pour la gestion de la Map
- **Socket.IO** pour le chat
- **Typescript** est utilisé pour le typage
- **ESLint** pour trouver et fixer les erreurs
- **Prettier** pour le formatage du code
- **FontAwesome** pour les icons

## Contribuer
Si vous souhaitez contribuer directement au code, nous vous encourageons à soumettre une pull request sur GitHub. Assurez-vous de suivre ces étapes pour faciliter l'examen et l'acceptation de votre contribution :  

- Créez une branche distincte pour votre fonctionnalité ou correction de bug.  
- Effectuez vos modifications sur cette branche.
- Créer une pull request en fournissant une description de ce que fait votre contribution.
- Votre pull request sera accepté après relecture du code
