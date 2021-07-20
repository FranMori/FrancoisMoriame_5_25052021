let produitLocalStorage = (localStorage.getItem('objet'))
console.log(localStorage)
console.log(produitLocalStorage)

const section = document.getElementById('core')
const resume = document.getElementById('resume')
const core2 = document.getElementById('core2')

function createNode(element) {
  return document.createElement(element)
}
function append(parent, el) {
  return parent.appendChild(el)

}

if(produitLocalStorage === null) {
  let panierVide = createNode ("div")
  panierVide.className = "panier__vide"
  panierVide.innerHTML = "Le panier est vide"
  append (section, panierVide)
}
else {
  for (j = 0; j < produitLocalStorage.length; j++) {
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
    let btnSupprimer = createNode ('button')

    titreArticle.innerHTML = "Article"
    imgArticle.src = produitLocalStorage[j].imgUrl
    titreDescription.innerHTML = produitLocalStorage[j].nomProduit
    paraDescription.innerHTML = produitLocalStorage[j].description
    titreVernis.innerHTML = "Vernis"
    paraVernis.innerHTML = produitLocalStorage[j].choixVernis
    titreQuantite.innerHTML = "Quantité"
    btnQuantite.type = "number"
    btnQuantite.min = "1"  
    btnQuantite.placeholder = "1"
    titrePrix.innerHTML = "Prix"
    paraPrix.innerHTML = (produitLocalStorage[j].prix)
    btnSupprimer.innerHTML = "Supprimer"
    btnSupprimer.id = (produitLocalStorage[j].idProduit)

    console.log(btnSupprimer.id)

    
    

    append (section, carte)
    append (carte, divArticle)
    append (carte, divDescription)
    append (carte, divQuantite)
    append (carte, divPrix)
    append (carte, divVernis)
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
    append (carte, btnSupprimer)

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
    btnSupprimer.className = "panier__carte__supprimer"

    // Bouton supprimer
    let idPanier = produitLocalStorage[j].idProduit
    console.log(idPanier)
    console.log(btnSupprimer)

  //  for (let l = 0; l < btnSupprimer.length; l++) {
     btnSupprimer.addEventListener("click", (event) => {
       event.preventDefault();
       console.log(event)
       console.log(event.target.id)
      // let idSuppression = produitLocalStorage[l].idPanier
      
      // console.log(idSuppression)


      produitLocalStorage = produitLocalStorage.filter(el => el.idPanier !== idSuppression )
      console.log(produitLocalStorage)
     })
  //  }

  }
}

    
let container = createNode('div')
let articlePrix = createNode('span')
    
    append (section, core2)
    append (core2, resume)
    append (resume, container)
    append (container, articlePrix)
   

    let prixTotalTableau = []

for (let k = 0; k < produitLocalStorage.length; k++) {
  let prixPanier = produitLocalStorage[k].prix
  prixTotalTableau.push(prixPanier)
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
let prixTotal = prixTotalTableau.reduce(reducer);

articlePrix.innerHTML = "Prix total : " + prixTotal
articlePrix.className = "panier__prixTotal"


 