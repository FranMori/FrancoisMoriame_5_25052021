const section = document.getElementById('core');
const url = 'http://localhost:3000/api/furniture'

function createNode(element) {
  return document.createElement(element)
}
function append(parent, el) {
  return parent.appendChild(el)

}

fetch(url)
.then((response) => response.json())
.then(function(data) {
  let furnitures = data;
   furnitures.map(function(furniture) {
    let carte = createNode('div');
    let divOak = createNode('div');
    let oak = createNode('img');
    let titre = createNode('h2');
    let divDescription = createNode('div');
    let description = createNode('p');
    let prix = createNode('span');
    let lienProduit = createNode ('a');
    oak.src = furniture.imageUrl
    titre.innerHTML = furniture.name
    description.innerHTML = furniture.description
    prix.innerHTML = furniture.price
    carte.className = 'liste__carte'
    description.className = 'liste__carte__description'
    prix.className = 'liste__carte__prix'
    section.className = 'liste'
    divOak.className = 'liste__carte__image'

    let _id = furniture._id
    carte.id = _id
    lienProduit.href = "/produit.html?" + (_id)

    append(lienProduit, divOak)
    append(divOak, oak)
    append(lienProduit, titre)
    append(lienProduit, divDescription)
    append(divDescription, description)
    append(lienProduit, prix)
    append(section, carte)
    append(carte, lienProduit)
    

    })})

.catch(function(error) {
  console.log(error);
})
