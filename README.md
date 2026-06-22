# NeuroFlash - SEG3525 (Devoir 3)

NeuroFlash est un prototype de jeu de mémoire (matching pairs) développé en React pour le cours de Conception d'Interfaces Utilisateur à l'Université d'Ottawa.

**[Voir le déploiement en direct sur Netlify](https://neuro-flash.netlify.app)**

## Contexte du projet

Habituellement plus concentré sur le développement back-end, les API et la gestion d'infrastructures DevOps, ce projet m'a permis d'explorer le côté client et l'expérience utilisateur (UX). L'objectif n'était pas seulement de faire fonctionner le jeu, mais de gérer la charge cognitive de l'utilisateur à travers l'interface.

## Approche technique et UX

L'application a été construite pour être fonctionnelle et robuste, avec une séparation stricte entre la logique d'état (React) et le rendu visuel (CSS pur).

- **Gestion d'état (State Management) :** Utilisation de `useState` et `useEffect` pour gérer les 3 flux distincts de l'application (Configuration, Jeu, Résultat) sans rechargement de page. La validation des paires est gérée de manière asynchrone avec un délai (`setTimeout`) pour permettre la mémorisation.
- **Conception Anti-Scroll :** La grille de jeu utilise des unités relatives (`vh`, `vmin`) combinées à `overflow: hidden` sur le `body`. Cela force l'interface à s'adapter à l'écran de l'utilisateur sans jamais nécessiter de défilement, ce qui briserait l'immersion.
- **Application de la Gestalt :** \* _Proximité et Similarité :_ Grille CSS stricte (`gap`) pour grouper les cartes.
  - _Clôture :_ Utilisation systématique de `border-radius` pour adoucir les éléments interactifs.
  - _Contraste :_ Espace négatif maximisé et palette de couleurs restreinte pour mettre en valeur les symboles au moment du clic.

## Exécution locale

Le projet utilise Create React App. Pour tester en local :

```bash
git clone [https://github.com/Biran644/neuroflash.git](https://github.com/Biran644/neuroflash.git)

cd neuroflash
npm install
npm start
```
