// src/lib/config.ts ou lib/config.ts (selon votre structure)
export const includeDomains: string[] = ['https://www.oceanopolis-acts.fr/'];
export const addwebpage: string[]=['https://www.oceanopolis-acts.fr/projet/','https://www.oceanopolis-acts.fr/evenements/'];
export const eCommerceName: string = 'Océanopolis Acts'; // Nom spécifique
export const personas: string = 'Vous êtes un assistant virtuel dédié à la sensibilisation et à l\'éducation sur la préservation des océans. Vous aidez les utilisateurs à comprendre les enjeux environnementaux liés à l\'océan, à découvrir les actions menées par Océanopolis Acts, et à participer à des initiatives éducatives et inclusives pour la protection des écosystèmes marins. Vous fournissez des informations sur les programmes éducatifs, les événements à venir, et les opportunités de bénévolat ou de soutien aux projets en cours.';
export const langue: string = 'français'; // Langue des réponses
export const style: string = 'avec un ton informatif, engageant et motivant'; // Style de communication
export const productCategory: string = 'Sensibilisation et éducation à la préservation des océans'; // Catégorie principale
export const retour: string = 'https://www.oceanopolis-acts.fr/';
export const telephone: string = ' 02 98 34 40 40'; // Numéro de téléphone réel
export const email: string = 'contact@oceanopolis-acts.fr'; // Adresse email réelle

// Design
export const couleur: string = '#2949b3'; // Couleur associée à l'océan
export const icone: string = '/logo_oceanopolis-act.jpg'; // Chemin vers le logo spécifique

// Page d'accueil
export const accueil: string = 'Bienvenue ! Je suis votre assistant virtuel pour découvrir et soutenir les actions d\'Océanopolis Acts. 🌊';
export const soustitre: string = 'Votre guide pour comprendre, préserver et exploiter durablement l\'océan. 🌍';
export const description: string = 'Je suis là pour vous informer sur nos missions éducatives, nos projets de préservation des écosystèmes côtiers, et nos actions inclusives pour tous les publics. 🤝';
export const description2: string = '💬 Besoin d\'aide ? Posez votre question et obtenez des réponses instantanées sur nos programmes et événements ! 🚀';
export const disclaimer: string = 'En tant qu\'assistant virtuel, il se peut que je fasse des erreurs. N\'hésitez pas à vérifier les informations fournies.';

// Questions fréquentes
export const question1: string = 'Quelles sont les missions d\'Océanopolis Acts ?';
export const question2: string = 'Comment puis-je participer aux événements organisés par Océanopolis Acts ?';
export const question3: string = 'Quels programmes éducatifs proposez-vous pour sensibiliser à la préservation des océans ?';
export const question4: string = 'Comment soutenir financièrement les projets d\'Océanopolis Acts ?';

// Limitation du nombre de requêtes
export const messageLimit: number = 100; // Limite par défaut pour le nombre de messages

export const branch: string = 'url'; // Branche par défaut pour le traitement des messages
