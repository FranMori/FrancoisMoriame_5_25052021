// Récupération des variables et des fonctions

const section = document.getElementById('core')
const resume = document.getElementById('resume')
const core2 = document.getElementById('core2')

function createNode(element) {
  return document.createElement(element)
}
function append(parent, el) {
  return parent.appendChild(el)
}

let itemsPanier = 'itemsPanier'

let panierLocalStorage = JSON.parse(localStorage.getItem(itemsPanier))

let prixTotalTableau = []
let prixTotal = 0

// Création interface panier vide

const displayPanierVide = () => {
  let panierVide = document.getElementById('panierVide')
  panierVide.innerHTML = "Le panier est vide"
}

if((Object.keys(panierLocalStorage)).length === 0) {
  displayPanierVide()
}

// Boucle pour afficher le panier

else {
  for (const item in panierLocalStorage) {
    let carte = createNode("div")
    let divArticle = createNode ('div')
    let divDescription = createNode ('div')
    let divVernis = createNode('div')
    let divQuantite = createNode ('div')
    let divPrix = createNode ('div')
    let titreArticle = createNode ('h3')
    let imgArticle = createNode ('img')
    let titreDescription = createNode ('h3')
    let paraDescription = createNode ('p')
    let titreVernis = createNode ('h3')
    let paraVernis = createNode ('span')
    let titreQuantite = createNode ('h3')
    let btnQuantite = createNode ('input')
    let titrePrix = createNode ('h3')
    let paraPrix = createNode ('span')
    let divBtnSupprimer = createNode('div')
    let btnSupprimer = createNode ('button')
    let divPanierResponsive = createNode ('div')

    titreArticle.innerHTML = "Article"
    imgArticle.src = panierLocalStorage[item].imgUrl
    titreDescription.innerHTML = panierLocalStorage[item].nomProduit
    paraDescription.innerHTML = panierLocalStorage[item].description
    titreVernis.innerHTML = "Vernis"
    paraVernis.innerHTML = panierLocalStorage[item].choixVernis
    titreQuantite.innerHTML = "Quantité"
    btnQuantite.type = "number"
    btnQuantite.min = "1"  
    btnQuantite.placeholder = "1"
    titrePrix.innerHTML = "Prix"
    paraPrix.innerHTML = ((panierLocalStorage[item]).prix)/100
    prixTotal = prixTotal + (panierLocalStorage[item]).prix/100
    btnSupprimer.innerHTML = "Supprimer"
    btnSupprimer.id = (panierLocalStorage[item]).idProduit
    let vernisChoisi = (panierLocalStorage[item]).choixVernis

    append (section, carte)
    append (carte, divArticle)
    append (carte, divPanierResponsive)
    append (divArticle, titreArticle)
    append (divArticle, imgArticle)
    append (divDescription, titreDescription)
    append (divDescription, paraDescription)
    append (divVernis, titreVernis)
    append (divVernis, paraVernis)
    append (divQuantite, titreQuantite)
    append (divQuantite, btnQuantite)
    append (divPrix, titrePrix)
    append (divPrix, paraPrix)
    append (divBtnSupprimer, btnSupprimer)
    append (carte, divBtnSupprimer)
    append (divPanierResponsive, divDescription)
    append (divPanierResponsive, divQuantite)
    append (divPanierResponsive, divPrix)
    append (divPanierResponsive, divVernis)
    append (divPanierResponsive, divBtnSupprimer)

    carte.className = "panier__carte"
    divArticle.className = "panier__carte__article"
    imgArticle.alt ="Image d'un meuble en chêne"
    divDescription.className = "panier__carte__description"
    divVernis.className = "panier__carte__vernis"
    paraVernis.className = "panier__carte__vernis__choix"
    divQuantite.className = "panier__carte__quantite"
    divPrix.className = "panier__carte__prix"
    btnQuantite.className = "panier__carte__quantite__input"
    paraPrix.className = "panier__carte__prix__somme"
    divBtnSupprimer.className = "panier__carte__supprimer"
    divPanierResponsive.className = "panier__responsive"
    btnSupprimer.setAttribute("vernis", vernisChoisi)

    // Mise en fonction du bouton supprimer

     btnSupprimer.addEventListener("click", (event) => {
       event.preventDefault();   
      
      const popupSuppression = () => {
        window.confirm ("Ce produit sera enlevé de votre panier.")
        window.location.href = "panier.html"
      }

      const deleteLocalStorage = () => {
        delete panierLocalStorage[item]
        localStorage.setItem(itemsPanier, JSON.stringify(panierLocalStorage))
      }

    let varSuppression = btnSupprimer.id + '_' + btnSupprimer.getAttribute("vernis")
       if (varSuppression === item) {
         deleteLocalStorage()
         popupSuppression()
      }
      
      // Mise en place du prix total

     })
     let articlePrix = document.getElementById('articlePrix')
         
         append (section, core2)
         append (core2, resume)
         append (resume, articlePrix)
        prixTotalTableau.push(prixTotal)
        let prixTotalFinal = prixTotalTableau[prixTotalTableau.length -1]
         articlePrix.innerHTML = "Prix total : " + prixTotalFinal
         articlePrix.className = "panier__prixTotal"    
}}

// Mise en fonction du formulaire de confirmation

const btnCommander = document.getElementById('btnCommander')
const form = document.getElementById('form')
const nom = form.elements['lastName']
const prenom = form.elements['firstName']
const ville = form.elements['city']
const adresse = form.elements['adress']
const mail = form.elements['email']
const lienFormulaire = document.getElementById('lienFormulaire')

function validateForm() {
  if ((document.forms["formulaire"]["prenom"].value == "") || 
  (document.forms["formulaire"]["nom"].value == "") ||
  (document.forms["formulaire"]["email"].value == "") ||
   (document.forms["formulaire"]["adresse"].value == "") || 
   (document.forms["formulaire"]["ville"].value == "")) {
    window.confirm ("Vous devez remplir le formulaire complètement")
    return false
  }
  else {
    lienFormulaire.href = "confirmation.html"
  }
}


const urlPost = 'http://localhost:3000/api/furniture/order'

// Ajout de l'event listener pour l'envoie des données

btnCommander.addEventListener("click", (event) => {
  validateForm()
for (const item in panierLocalStorage) {
  products = panierLocalStorage[item].idProduit

    let objectForm = {
      "contact": {
        "firstName": prenom.value, 
        "lastName": nom.value, 
        "address": adresse.value, 
        "city": ville.value, 
        "email": mail.value
      },
      "products": [
        products
      ]
  }

  // Requête post

  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify(objectForm),
  redirect: 'follow'
};
  
 fetch("http://localhost:3000/api/furniture/order", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}})
  
