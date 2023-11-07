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
  // /////////////////////////////////////////
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
      topPageText: 'Haut de page',
      signupText: 'Inscription',
      signinText: 'Connexion',
      profileText: 'Mon compte',
      notFoundText: 'Page non trouvée',
      notFoundDescText: 'Désolé, nous n’avons pas trouvé la page que vous recherchez.',
      errorText: 'Erreur',
      statusText: 'Statut',
      submitText: 'Envoyer',
      submittingText: 'Soumission',
      passwordText: 'Mot de passe',
      passwordConfirmationText: 'Confirmation du mot de passe',
      inputWrongEntries: 'Saisie des champs invalide !',
      inputTextWrongEntry: 'Champ non valide !',
      inputEmailWrongEntry: 'Email non valide !',
      inputPasswordWrongEntry: 'Mot de passe non valide !',
      strategiesObliquesChapo: 'Le jeu de cartes qui stimule votre créativité',
      strategiesObliquesParagraph: "A la fin des années 1960, Brian Eno, tête chercheuse de Roxy Music, et le peintre berlinois Peter Schmidt, ont mis au point un système de phrases et d’axiomes sensés décadenasser l’imaginaire.",
      strategiesObliquesButton: 'Citation suivante',
      noDataText: 'Pas de données',
      header: headerFr,
      authentification: authentificationFr,
      socialNetwork: socialNetwork,
      mainKeywords: mainKeywordsFr,
      technologiesUsed: technologiesUsed,
      strategiesObliques: strategiesObliquesFr,
      savedSnackbarText: 'Succès de l\'enregistrement',
      savedSnackbarErrorText: 'Erreur d\'enregistrement',
      signupSnackbarText: 'Bravo, vous allez recevoir un email comprenant un lien de corfirmation.',
      signupSnackbarErrorText: 'Désolé, l\'inscription n\'a pas fonctionnée.',
      signinSnackbarText: 'Bravo, vous êtes connecté.',
      signinSnackbarErrorText: 'Désolé, vous n\'êtes pas connecté.',
      signoutSnackbarText: 'Bravo, vous êtes bien déconnecté.',
      signoutSnackbarErrorText: 'Désolé, vous n\'êtes pas déconnecté.',
      deleteDataText: 'Bravo, vous avez supprimé l\'enregistrement.',
      deleteDataErrorText: 'Désolé, vous n\'avez pas supprimé l\'enregistrement.',
      buttonText: 'Bouton',
      buttonNewText: 'Créer',
      buttonEditText: 'Editer',
      buttonDeleteText: 'Supprimer',
      buttonCancelText: 'Annuler',
      orderText: 'Ordre',
      titleFrText: 'Titre (en français)',
      titleEnText: 'Titre (en anglais)',
      iconListText: 'Liste des icônes',
      firstnameText: 'Prénom',
      lastnameText: 'Nom',
      editKnowledgesText: 'Edition d\'une compétence technique',
      createKnowledgesText: 'Création d\'une compétence technique',
      modalDeleteRowTitleText: 'Supprimer un élément',
      modalDeleteRowText: 'Etes-vous sûr de vouloir supprimer définitivement cette élément ?',
      modalCloseText: 'Fermer la modal',
    }
  },
  // /////////////////////////////////////////
  // A N G L A I S  //////////////////////////
  // /////////////////////////////////////////
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
      topPageText: 'Top of page',
      signupText: 'Registration',
      signinText: 'Sign in',
      profileText: 'My account',
      notFoundText: 'Page not found',
      notFoundDescText: 'Sorry, we couldn\'t find the page you were looking for.',
      errorText: 'Error',
      statusText: 'Status',
      submitText: 'Submit',
      submittingText: 'Submitting',
      passwordText: 'Password',
      passwordConfirmationText: 'Password Confirmation',
      inputWrongEntries: 'Invalid field entry!',
      inputTextWrongEntry: 'Invalid input!',
      inputEmailWrongEntry: 'Invalid email!',
      inputPasswordWrongEntry: 'Invalid password!',
      strategiesObliquesChapo: 'The card game that stimulates your creativity',
      strategiesObliquesParagraph: "At the end of the 1960s, Brian Eno, head researcher at Roxy Music, and the Berlin painter Peter Schmidt, developed a system of sentences and axioms intended to decadentize the imagination.",
      strategiesObliquesButton: 'Next quote',
      noDataText: 'No data',
      header: headerEn,
      authentification: authentificationEn,
      socialNetwork: socialNetwork,
      mainKeywords: mainKeywordsEn,
      technologiesUsed: technologiesUsed,
      strategiesObliques: strategiesObliquesEn,
      savedSnackbarText: 'Registration success',
      savedSnackbarErrorText: 'Registration error',
      signupSnackbarText: 'Well done, you will receive an email including a confirmation link.',
      signupSnackbarErrorText: 'Sorry, registration did not work.',
      signinSnackbarText: 'Well done, you are connected.',
      signinSnackbarErrorText: 'Sorry, you are not connected.',
      signoutSnackbarText: 'Well done, you are disconnected.',
      signoutSnackbarErrorText: 'Sorry, you are not logged out.',
      deleteDataText: 'Well done, you deleted the recording.',
      deleteDataErrorText: 'Sorry, you did not delete the recording.',
      buttonText: 'Button',
      buttonNewText: 'Create',
      buttonEditText: 'Edit',
      buttonDeleteText: 'Delete',
      buttonCancelText: 'Cancel',
      orderText: 'Order',
      titleFrText: 'Title (in french)',
      titleEnText: 'Title (in english)',
      iconListText: 'Icon list',
      firstnameText: 'Firstname',
      lastnameText: 'Name',
      editKnowledgesText: 'Editing a technical skill',
      createKnowledgesText: 'Creation of a technical skill',
      modalDeleteRowTitleText: 'Delete a row',
      modalDeleteRowText: 'Are you sure you want to permanently delete this item?',
      modalCloseText: 'Close modal',
    }
  }
};

export default mainData;