const url = 'http://localhost:3000/api/furniture/'
const section = document.getElementById('core')
const carte = document.getElementById('carte')
const divImg = document.getElementById('divImg')
const img = document.getElementById('img')
const divDescription = document.getElementById('divDescription')
const divTitre = document.getElementById('divTitre')
const divTexte = document.getElementById('divTexte')
const divPrix = document.getElementById('divPrix')

  function createNode(element) {
    return document.createElement(element)
  }
  function append(parent, el) {
    return parent.appendChild(el)
  
  }
  function innerHTML(element) {
    return element.innerHTML
  }  

// Récupération de l'id dans l'url

const queryString_url_id = window.location.search;

const justId = queryString_url_id.slice(1)

const endPoint = (url) + (justId)



// Fetch


fetch(endPoint)
    .then((response) => response.json())
    .then(function (furniture) {

        img.src = furniture.imageUrl
        divTexte.innerHTML = furniture.description
        divTitre.innerHTML = furniture.name
        divPrix.innerHTML = furniture.price
        let divVernis = createNode ('div')
        let selectVernis = createNode ('select')
        selectVernis.name = 'vernis'
        selectVernis.id = 'vernisSelect'
        divVernis.className = "produit__carte__vernis"
        let varnish = furniture.varnish
        append(divVernis, selectVernis)
        append(divDescription, divVernis)
        for (let i = 0; i < varnish.length; i++) {
            let optionVernis = createNode ('option')
            append (selectVernis, optionVernis)
            optionVernis.innerHTML = varnish[i]
            optionVernis.value = varnish[i]

           
        }
       // Sélection ID vernis
      const idVernis = document.getElementById('vernisSelect')
      

    

      // Sélection du bouton panier

      const btnPanier = document.getElementById('btnPanier')
      

      // Event listener 
      btnPanier.addEventListener("click", (event) => {
      event.preventDefault();

      // Mettre le choix dans une variable

      const choixVernis = idVernis.value
      console.log(choixVernis)

       // Récupérer infos du panier

       let infosPanier = {
        nomProduit : furniture.name,
        idProduit : justId,
        choixVernis : choixVernis,
        prix : furniture.price,
        description : furniture.description,
        imgUrl : furniture.imageUrl
    
      }
      console.log(infosPanier)
      console.log(localStorage)
       // LocalStorage
      
      let produitLocalStorage = JSON.parse(localStorage.getItem("objet"))
      console.log(produitLocalStorage)

      const popupConfirmation = () => {
        window.confirm ("Votre produit a bien été ajouté au panier. Vous allez être redirigé à l'accueil")
        window.location.href = "index.html"
      }
      console.log(produitLocalStorage)

      if (produitLocalStorage) {
        produitLocalStorage.push(infosPanier)
        localStorage.setItem("objet", JSON.stringify(produitLocalStorage))
        popupConfirmation()
      }

      else {
        produitLocalStorage = []
        produitLocalStorage.push(infosPanier)
        localStorage.setItem("objet", JSON.stringify(produitLocalStorage))
        popupConfirmation()

      }
      
      })    

  
    
    })









