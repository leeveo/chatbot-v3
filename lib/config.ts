// src/lib/config.ts ou lib/config.ts (selon votre structure)
export const includeDomains: string[] = ['https://www.oceanopolis.com/'];
export const addwebpage: string[]=['https://www.oceanopolis.com/decouvrir-le-parc/','https://www.oceanopolis.com/preparer-votre-visite/',''];

export const eCommerceName: string = 'Océanopolis'; // Nom spécifique
export const personas: string = 'Vous êtes un assistant virtuel dédié à la découverte des écosystèmes marins et à la promotion de la biodiversité océanique et en particulier du parc Oceanopolis. Vous aidez les utilisateurs à explorer les différentes espèces marines, à comprendre les enjeux de la préservation des océans, et à découvrir les expositions et activités proposées par Océanopolis. Vous fournissez des informations sur les programmes éducatifs, les événements à venir, et les opportunités de participation ou de soutien aux projets en cours.';
export const langue: string = 'français'; // Langue des réponses
export const style: string = 'avec un ton informatif, engageant et motivant'; // Style de communication
export const productCategory: string = 'Découverte des écosystèmes marins et promotion de la biodiversité océanique'; // Catégorie principale
export const retour: string = 'https://www.oceanopolis.com/';
export const telephone: string = '02 98 34 40 40'; // Numéro de téléphone réel
export const email: string = 'contact@oceanopolis.com'; // Adresse email réelle

// Design
export const couleur: string = '#192f4f'; // Couleur associée à l'océan
export const icone: string = '/logo_oceanopolis-act.jpg'; // Chemin vers le logo spécifique

// Page d'accueil
export const accueil: string = 'Bienvenue ! Je suis votre assistant virtuel pour découvrir et soutenir les actions d\'Océanopolis. 🌊';
export const soustitre: string = 'Votre guide pour comprendre, préserver et exploiter durablement l\'océan. 🌍';
export const description: string = 'Je suis là pour vous informer sur nos missions éducatives, nos projets de préservation des écosystèmes marins, et nos actions inclusives pour tous les publics. 🤝';
export const description2: string = '💬 Besoin d\'aide ? Posez votre question et obtenez des réponses instantanées sur nos programmes et événements ! 🚀';
export const disclaimer: string = 'En tant qu\'assistant virtuel, il se peut que je fasse des erreurs. N\'hésitez pas à vérifier les informations fournies.';

// Questions fréquentes
export const question1: string = 'Quelles sont les horaires d\'Océanopolis ?';
export const question2: string = 'Comment découvrir le parc Oceanopolis?';
export const question3: string = 'Quels programmes éducatifs proposez-vous pour sensibiliser à la préservation des océans ?';
export const question4: string = 'Quelles sont les animations de oceanopolis ?';

// Limitation du nombre de requêtes
export const messageLimit: number = 100; // Limite par défaut pour le nombre de messages

export const branch: string = 'url'; // Branche par défaut pour le traitement des messages
