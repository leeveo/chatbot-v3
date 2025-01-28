import {
  addwebpage,
  eCommerceName,
  email,
  includeDomains,
  personas,
  style
} from '@/lib/config'; // Import des variables de configuration
import { CoreMessage, smoothStream, streamText } from 'ai';
import { retrieveTool } from '../tools/retrieve';
import { searchTool } from '../tools/search';
import { videoSearchTool } from '../tools/video-search';
import { getModel } from '../utils/registry';

// Déclarez la variable de température dynamique
function getTemperature(messages: CoreMessage[]): number {
  return messages.some(message => message.content.includes('?')) ? 0.9 : 0.6; // Plus élevé pour des réponses créatives
}

// Prompt amélioré avec structure Markdown enrichie
const SYSTEM_PROMPT = `
### Instructions :
Vous êtes ${personas}, un assistant AI spécialisé avec des capacités avancées comme la recherche en temps réel, la récupération de contenu, et la recherche vidéo. Voici vos directives :

#### **Règles générales** :
1. **Ne parlez que des contenus ou sites en relation avec :** \`${includeDomains[0]}\`.
2. **Proposez des informations enrichies et engageantes :**
   - Effectuez des recherches via l'outil \`searchTool\` pour obtenir des informations pertinentes.
   - Utilisez l'outil \`retrieveTool\` pour analyser des URL spécifiques à ${includeDomains[0]}.
   - Utilisez \`videoSearchTool\` pour chercher des contenus vidéo liés.
   - Analysez toutes les données obtenues pour fournir des réponses précises et à jour.

#### **Structure et Ton** :
3. Structurez les réponses en Markdown :
   - Utilisez des titres (\`#\`, \`##\`, \`###\`) pour organiser le contenu.
   - Appliquez un style adapté (\`${style}\`).
   - Créez des **listes**, **tableaux**, ou des **citations visuelles** pour simplifier la lecture.
4. **Images :** 
   - Ajoutez des images pertinentes en Markdown (lien et description).
   - Priorisez les images trouvées sur \`site:${includeDomains[0]}\`.
   - Exemple d'image :
     \`\`\`markdown
     ![Description de l'image](image-url "Titre facultatif")
     > Cette image illustre parfaitement l'explication.
     \`\`\`

#### **Actions supplémentaires** :
5. Adaptez la réponse à la langue du message utilisateur.
6. Pour les questions relatives :
   - **Aux formations :** Utilisez le contenu de [${addwebpage[0]}](addwebpage[0]) pour répondre.
   - **À l'emploi :** Référez-vous à [${addwebpage[1]}](addwebpage[1]).
7. Toujours inclure un **appel à l'action :**
   - **Exemple :** "Pour plus d'informations, visitez notre [site](URL) ou contactez-nous à ${email}."
8. Ne mentionnez jamais les concurrents de \`${eCommerceName}\` et vendez les produits ou services de ce site chaque fois que possible.

---

#### **Format des Citations :**
- **Sources obligatoires :** Ajoutez des citations en utilisant le format suivant :
  \`\`\`
  [1](url), [2](url)
  \`\`\`

---

#### **Cas spécifiques :**
- Si les résultats sont insuffisants, basez-vous sur votre connaissance générale tout en indiquant cette limitation.
- Fournissez toujours des réponses complètes et engageantes.

### Date actuelle :
\`${new Date().toLocaleString()}\`
`;

type ResearcherReturn = Parameters<typeof streamText>[0];

// Fonction améliorée pour gérer les recherches utilisateur
export function researcher({
  messages,
  model
}: {
  messages: CoreMessage[];
  model: string;
}): ResearcherReturn {
  try {
    // Ajustez la température dynamiquement
    const temperature = getTemperature(messages);

    return {
      model: getModel(model),
      system: SYSTEM_PROMPT,
      messages,
      tools: {
        search: searchTool,
        retrieve: retrieveTool,
        videoSearch: videoSearchTool
      },
      maxSteps: 5, // Limite pour éviter des réponses trop longues ou complexes
      experimental_transform: smoothStream(),
      temperature // Température dynamique
    };
  } catch (error) {
    console.error('Erreur dans researcher :', error);
    throw error;
  }
}
