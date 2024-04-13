export interface metaGlobalClass {
  titleKnowledgesIndex?: String,
  titleKnowledgesNew?: String,
  titleKnowledgesEdit?: String,
  titleExperiencesIndex?: String,
  titleExperiencesNew?: String,
  titleExperiencesEdit?: String,
  titleTrainingsIndex?: String,
  titleTrainingsNew?: String,
  titleTrainingsEdit?: String,
  titleLinksIndex?: String,
  titleLinksNew?: String,
  titleLinksEdit?: String,
  titleDownloadsIndex?: String,
  titleDownloadsNew?: String,
  titleDownloadsEdit?: String,
  titleObliqueStrategiesIndex?: String,
  titleSigninIndex?: string,
  titleSignupIndex?: string,
  description?: String,
  robots?: string,
  keywords?: string,
  author?: string,
  ogType?: string,
  ogUrl?: string,
  ogImage?: string,
}

const titleBase = "Pierre-Henri Bord";

const metaGlobal: metaGlobalClass = {
  titleKnowledgesIndex: `${titleBase} - Accueil`,
  titleKnowledgesNew: `${titleBase} - Nouvelle compétence`,
  titleKnowledgesEdit: `${titleBase} - Edition d'une compétence`,
  titleExperiencesIndex: `${titleBase} - Expérience`,
  titleExperiencesNew: `${titleBase} - Nouvelle expérience`,
  titleExperiencesEdit: `${titleBase} - Edition d'une expérience`,
  titleTrainingsIndex: `${titleBase} - Formations`,
  titleTrainingsNew: `${titleBase} - Nouvelle formation`,
  titleTrainingsEdit: `${titleBase} - Edition d'une formation`,
  titleLinksIndex: `${titleBase} - Projets`,
  titleLinksNew: `${titleBase} - Nouveau projet`,
  titleLinksEdit: `${titleBase} - Edition d'un projet`,
  titleDownloadsIndex: `${titleBase} - Téléchargement`,
  titleDownloadsNew: `${titleBase} - Nouveau téléchargement`,
  titleDownloadsEdit: `${titleBase} - Edition d'un téléchargement`,
  titleObliqueStrategiesIndex: `${titleBase} - Stratégies obliques`,
  titleSigninIndex: `${titleBase} - Connexion`,
  titleSignupIndex: `${titleBase} - Inscription`,
};

export default metaGlobal;