import mainKeywordsEn from "~/assets/data/mainData/mainKeywordsEn";
import mainKeywordsFr from "~/assets/data/mainData/mainKeywordsFr";
import socialNetwork from "~/assets/data/mainData/socialNetwork";
import strategiesObliquesEn from "~/assets/data/mainData/strategiesObliquesEn";
import strategiesObliquesFr from "~/assets/data/mainData/strategiesObliquesFr";
import technologiesUsed from "~/assets/data/mainData/technologiesUsed";
import headerEn from "~/assets/data/mainData/headerEn";
import headerFr from "~/assets/data/mainData/headerFr";
import authentificationEn from "~/assets/data/mainData/authentificationEn";
import authentificationFr from "~/assets/data/mainData/authentificationFr";


const mainData = {
  // /////////////////////////////////////////
  // F R A N C A I S  ////////////////////////
  fr: {
    translation: {
      firstName: 'Pierre-henri',
      lastName: 'Bord',
      position: 'Intégrateur / Développeur front-end',
      email: 'phbord@gmail.com',
      linkedin: 'https://www.linkedin.com/in/phbord/',
      logoHeaderText: 'Logo de Pierre-Henri Bord',
      logoProfileText: 'Logo de profil de Pierre-Henri Bord',
      logoBurgerText: 'Logo burger menu',
      noDataText: 'Pas de données',
      header: headerFr,
      authentification: authentificationFr,
      socialNetwork: socialNetwork,
      mainKeywords: mainKeywordsFr,
      technologiesUsed: technologiesUsed,
      strategiesObliques: strategiesObliquesFr,
    }
  },
  // /////////////////////////////////////////
  // A N G L A I S  //////////////////////////
  en: {
    translation: {
      firstName: 'Pierre-henri',
      lastName: 'Bord',
      position: 'Integrator / Front-end developer',
      email: 'phbord@gmail.com',
      linkedin: 'https://www.linkedin.com/in/phbord/',
      logoHeaderText: 'Logo of Pierre-Henri Bord',
      logoProfileText: 'Logo of Pierre-Henri Bord profile',
      logoBurgerText: 'Burger menu logo',
      noDataText: 'No data',
      header: headerEn,
      authentification: authentificationEn,
      socialNetwork: socialNetwork,
      mainKeywords: mainKeywordsEn,
      technologiesUsed: technologiesUsed,
      strategiesObliques: strategiesObliquesEn,
    }
  }
};

export default mainData;