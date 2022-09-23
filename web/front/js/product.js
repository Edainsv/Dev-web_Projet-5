window.onload = function() {
	var _id = new URLSearchParams(window.location.search).get('id'); // Récupère la valeur de "id" depuis l'URL
	var element = document.getElementById('product');

	// Récupérer et stocker les éments du DOM nécessaires
	var product = {
		'img': document.querySelector('.item__img'),
		'title': document.getElementById('title'),
		'price': document.getElementById('price'),
		'desc': document.getElementById('description'),
		'colors': document.getElementById('colors')
	};


	// console.log(product);
	
	// Requête vers l'API suivante :
	fetch("http://localhost:3000/api/products/" + _id).then(function(result) {
		return result.json();
	})

	.then(function(value) {
		console.log(value.colors);
		product.img.innerHTML = `<img src="` + value.imageUrl + `" alt="` + value.altTxt + `">`;
		product.title.innerHTML = value.name;
		product.price.innerHTML = value.price;
		product.desc.innerHTML = value.description;

		// Boucler sur le nombre de couleur existantes pour créer autant d'options qu'il en existe.
		for (let i = 0; i < value.colors.length; i++) {
			let tmp = []; 

			tmp[i] = document.createElement('option');
			tmp[i].value = value.colors[i];
			tmp[i].innerHTML = value.colors[i];

			product.colors.appendChild(tmp[i]);
		}
	})

	.catch(function(e) {
		console.error(e);
		items.innerHTML = '<p><strong>Impossible de charger le produit<strong></p>';
	});
}