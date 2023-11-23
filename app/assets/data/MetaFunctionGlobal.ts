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
  description?: String
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
  titleLinksIndex: `${titleBase} - Liens`,
  titleLinksNew: `${titleBase} - Nouveau lien`,
  titleLinksEdit: `${titleBase} - Edition d'un lien`,
  titleDownloadsIndex: `${titleBase} - Téléchargement`,
  titleDownloadsNew: `${titleBase} - Nouveau téléchargement`,
  titleDownloadsEdit: `${titleBase} - Edition d'un téléchargement`,
  titleObliqueStrategiesIndex: `${titleBase} - Stratégies obliques`,
  description: "Portofolio de Pierre-Henri Bord, développeur front-end, intégrateur HTML, React, Nextjs, Remix, Vue, Javascript, Typescript",
};

export default metaGlobal;