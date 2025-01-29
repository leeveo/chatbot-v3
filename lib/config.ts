// src/lib/config.ts ou lib/config.ts (selon votre structure)
export const includeDomains: string[] = ['https://www.parcoursup.gouv.fr/'];
export const addwebpage: string[] = ['https://dossierappel.parcoursup.fr/Candidat/carte','https://www.onisep.fr/recherche?context=metier'];

export const eCommerceName: string = 'Parcoursup'; // Nom spécifique
export const personas: string = 'Vous êtes un assistant virtuel spécialisé dans l\'accompagnement des étudiants sur la plateforme Parcoursup. Vous aidez les étudiants à comprendre le fonctionnement de la plateforme, à formuler leurs vœux, à choisir leurs formations et à réussir leur orientation post-bac. Vous fournissez des informations détaillées sur les établissements d\'enseignement supérieur, les processus d\'admission et les ressources pour faciliter leur parcours. Vous êtes également là pour répondre à toutes les questions concernant les démarches via la plateforme parcoursup';
export const langue: string = 'français'; // Langue des réponses
export const style: string = 'avec un ton professionnel, informatif et motivant'; // Style de communication
export const productCategory: string = 'Accompagnement à l\'orientation post-bac'; // Catégorie principale
export const retour: string = 'https://www.parcoursup.gouv.fr/';
export const telephone: string = '01 70 72 39 39'; // Numéro de téléphone réel
export const email: string = 'contact@parcoursup.gouv.fr'; // Adresse email réelle

// Design
export const couleur: string = '#0073e6'; // Couleur associée à Parcoursup
export const icone: string = '/logo_parcoursup.png'; // Chemin vers le logo spécifique

// Page d'accueil
export const accueil: string = 'Bienvenue ! Je suis votre assistant virtuel pour vos recherches sur Parcoursup. 🎓';
export const soustitre: string = 'Votre guide pour réussir votre orientation et choix d\'études supérieures. 💡';
export const description: string = 'Je suis là pour vous aider à comprendre le fonctionnement de la plateforme Parcoursup, à formuler vos vœux, et à réussir votre orientation vers les meilleures formations. 🤝';
export const description2: string = '💬 Besoin d\'aide ? Posez votre question et obtenez des réponses instantanées sur les démarches, choix d\'écoles et formations ! 🚀';
export const disclaimer: string = 'En tant qu\'assistant virtuel, il se peut que je fasse des erreurs. N\'hésitez pas à vérifier les informations fournies.';

// Questions fréquentes
export const question1: string = 'Comment fonctionne la plateforme Parcoursup ?';
export const question2: string = 'Comment formuler mes vœux sur Parcoursup ?';
export const question3: string = 'Quelles formations puis-je choisir sur Parcoursup ?';
export const question4: string = 'Comment savoir si je suis admissible à une formation ?';

// Limitation du nombre de requêtes
export const messageLimit: number = 100; // Limite par défaut pour le nombre de messages

export const branch: string = 'url'; // Branche par défaut pour le traitement des messages
