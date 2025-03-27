import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const  startDriverIntro  = () => {
  const isIntroShownInSession = sessionStorage.getItem("introShown");
  const isIntroShown = localStorage.getItem("introShown");

  if (!isIntroShownInSession) {
    const driverObj = driver({
      showProgress: true,
      steps: [
        { popover: { title: "Bienvenue cher administrateur!", description: `Vous êtes dans la page d'acceuil de votre application!` } },
        { element: ".menu > li:nth-child(1)", popover: { title: "Dashboard", description: "Vous êtes actuelement sur le dashboard de l'application .", side: "left", align: "start" }},
        { element: ".menu > li:nth-child(2)", popover: { title: "Liste des utilisateurs", description: "Ceci est la section des employés utilisateurs .", side: "left", align: "start" }},
        { element: ".menu > li:nth-child(3)", popover: { title: "Liste des gestionnaires", description: "Ceci est la section des gestionnaires utilisateurs .", side: "bottom", align: "start" }},
        { element: ".menu > li:nth-child(5)", popover: { title: "Les demandes d'achats", description: "Ceci est la section des demandes d'achats.", side: "bottom", align: "start" }},
        { element: ".menu > li:nth-child(6)", popover: { title: "Section des inventaires", description: "Vous pouvez vous les inventaires dans cette partie.", side: "bottom", align: "start" }},
        { element: ".Toggle-menu", popover: { title: "Mutli-thème", description: "Vous pouvez switchez votre thème si vous voulez.", side: "bottom", align: "start" }},
        { element: ".user-actions", popover: { title: "Compte", description: "Les notifications , votre compte et aussi la déconnexion", side: "bottom", align: "start" }},
        { element: ".language-selector", popover: { title: "Sélecteur de langue", description: "Ceci est le sélecteur de langue.", side: "bottom", align: "start" }},
      ],
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm("Voulez-vous zapper l'intro?")) {
          driverObj.destroy();
        }
      },
    });

    driverObj.drive();
    sessionStorage.setItem("introShown", "true");
  }

  if (!isIntroShown) {
    localStorage.setItem("introShown", "true");
  }
};
