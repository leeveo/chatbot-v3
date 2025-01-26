// src/lib/config.ts ou lib/config.ts (selon votre structure)
export const includeDomains: string[] = ['https://www.prosimu.com/'];
export const eCommerceName: string = 'Prosimu'; // Nom spécifique
export const personas: string = 'Vous êtes un expert en fabrication et innovation technologique pour les utilisateurs du site Prosimu. Vous vous appelé Patrick, Âgé de 45 ans, vous êtes passionné par le réalisme du mouvement et spécialisé dans les simulateurs automobiles et aéronautiques, ainsi que dans les vérins PRS. Vous accompagnez les utilisateurs pour découvrir les produits et services de Prosimu, qu’il s’agisse de simulateurs de haute précision ou de solutions dédiées à des secteurs de pointe comme le militaire, ou la recherche universitaire. Vous communiquez avec professionnalisme et clarté, toujours prêt(e) à guider les utilisateurs vers des solutions adaptées à leurs projets. Votre objectif est de rendre leur expérience sur Prosimu fluide, inspirante et enrichissante. Vous devez indiquer aux utiliisateurs le meilleurs simulateurs à acheter en fonction de leur besoin et de leur budget et les accompagner dans leur processus d\'achat.'; // Personas spécifiques
export const langue: string = 'français'; // Langue des réponses
export const style: string = 'avec un ton professionnel, clair et passionné'; // Style de communication
export const productCategory: string = 'Simulateurs automobiles et aéronautiques, solutions technologiques de pointe'; // Catégorie principale
export const retour: string = 'https://www.prosimu.com/';
export const telephone: string = '+33 (0)6-62-33-24-50'; // Exemple, remplacez par le contact réel
export const email: string = 'info@prosimu.com'; // Exemple, remplacez par le contact réel

// Design
export const couleur: string = '#b3001b'; // Couleur associée au branding de Prosimu
export const icone: string = '/logo_prosimu.png'; // Chemin vers le logo spécifique

// Page d'accueil
export const accueil: string = 'Bienvenue ! Je suis votre assistant virtuel pour vos recherches sur prosimu.com. 🚀';
export const soustitre: string = 'Votre guide pour découvrir les simulateurs et solutions technologiques avancées de Prosimu. 💡';
export const description: string = 'Nous sommes là pour répondre à toutes vos questions. Profitez de mes conseils pour explorer nos produits innovants et nos solutions de pointe pour divers secteurs comme l’aéronautique, le nucléaire ou la recherche universitaire. 🤝';
export const description2: string = '💬 Besoin d\'aide ? Posez votre question et obtenez des réponses instantanées avec des informations adaptées à vos besoins techniques et professionnels ! 🚀';
export const disclaimer: string = 'En tant qu\'intelligence artificielle, il se peut que je fasse des erreurs. N\'hésitez pas à vérifier les informations fournies.';

// Questions fréquentes
export const question1: string = 'Quels types de simulateurs propose Prosimu pour les secteurs automobile et aéronautique ?';
export const question2: string = 'Comment Prosimu utilise-t-il les vérins PRS pour améliorer le réalisme du mouvement ?';
export const question3: string = 'Quelles solutions technologiques Prosimu propose-t-il pour les secteurs militaires, médicaux ou universitaires ?';
export const question4: string = 'Quel est le simulateur le plus vendu sur prosimu.com?';

// Limitation du nombre de requêtes
export const messageLimit: number = 100; // Limite par défaut pour le nombre de messages

export const branch: string = 'url'; // Branche par défaut pour le traitement des messages
