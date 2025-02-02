// src/lib/config.ts ou lib/config.ts (selon votre structure)
export const includeDomains: string[] = ['https://www.linkedin.com/'];
export const eCommerceName: string = 'Super Assistant LinkedIn'; // Nom spécifique
export const personas: string = 'Vous êtes un assistant virtuel spécialisé dans l\'optimisation de l\'utilisation de LinkedIn et du Profil suivant https://www.linkedin.com/in/marco-leevea/. Vous aidez les utilisateurs à analyser des profils LinkedIn, à rédiger des posts convaincants et engageants, et à utiliser pleinement les fonctionnalités de la plateforme pour améliorer leur visibilité professionnelle. Vous êtes un expert en stratégie de contenu sur LinkedIn, en rédaction de posts percutants et en optimisation de profils pour augmenter l\'engagement et le réseau professionnel. Vous fournissez également des conseils personnalisés pour améliorer la présentation des profils et atteindre des objectifs professionnels spécifiques. votre profil linkedin est le suivant https://www.linkedin.com/in/marco-leevea/';
export const langue: string = 'français'; // Langue des réponses
export const style: string = 'avec un ton professionnel, engageant et motivant'; // Style de communication
export const productCategory: string = 'Optimisation de profils LinkedIn et création de contenu engageant'; // Catégorie principale
export const retour: string = 'https://www.linkedin.com/';
export const telephone: string = '01 23 45 67 89'; // Numéro de téléphone réel
export const email: string = 'contact@superassistantlinkedin.com'; // Adresse email réelle

// Design
export const couleur: string = '#0077b5'; // Couleur associée à LinkedIn
export const icone: string = '/logo_marco.jpg'; // Chemin vers le logo spécifique

// Page d'accueil
export const accueil: string = 'Bienvenue ! Je suis votre assistant virtuel pour optimiser votre présence sur LinkedIn. 🌐';
export const soustitre: string = 'Votre guide pour analyser des profils et rédiger des posts engageants. ✍️';
export const description: string = 'Je suis là pour répondre à toutes vos questions sur LinkedIn. Découvrez comment analyser un profil, optimiser le vôtre, et rédiger des posts qui suscitent l\'engagement. 🤝';
export const description2: string = '💬 Besoin d\'aide ? Posez votre question et obtenez des réponses instantanées sur vos profils et posts LinkedIn ! 🚀';
export const disclaimer: string = 'En tant qu\'intelligence artificielle, il se peut que je fasse des erreurs. N\'hésitez pas à vérifier les informations fournies.';

// Questions fréquentes
export const question1: string = 'Comment analyser un profil LinkedIn pour optimiser son réseau professionnel ?';
export const question2: string = 'Comment rédiger un post LinkedIn engageant et pertinent ?';
export const question3: string = 'Comment améliorer mon profil LinkedIn pour attirer l\'attention des recruteurs ?';
export const question4: string = 'Comment utiliser LinkedIn pour développer mon réseau professionnel efficacement ?';

// Limitation du nombre de requêtes
export const messageLimit: number = 100; // Limite par défaut pour le nombre de messages

export const branch: string = 'url'; // Branche par défaut pour le traitement des messages
