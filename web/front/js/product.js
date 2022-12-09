window.onload = function() {
	var erreur_message = document.getElementById('erreur');
	var _id = new URLSearchParams(window.location.search).get('id'); // Récupère la valeur de "id" dans l'URL
	var element = document.getElementById('product');
	var btn_addToCart = document.getElementById('addToCart');
	var ls = localStorage;
	var tmp = [], result = [];
	var need_update = false;

	// Récupérer et stocke les éléments du DOM nécessaires
	var product = {
		'img': document.querySelector('.item__img'),
		'title': document.getElementById('title'),
		'price': document.getElementById('price'),
		'desc': document.getElementById('description'),
		'colors': document.getElementById('colors'),
		'quantity': document.getElementById('quantity')
	};
	
	// Requête vers l'API suivante :
	fetch("http://localhost:3000/api/products/" + _id).then(function(result) {
		return result.json();
	})

	.then(function(value) {
		product.img.innerHTML = `<img src="` + value.imageUrl + `" alt="` + value.altTxt + `">`;
		product.title.innerHTML = value.name;
		product.price.innerHTML = value.price;
		product.desc.innerHTML = value.description;

		// Affiche les couleurs existantes
		for (let i = 0; i < value.colors.length; i++) {
			let tmp = [];

			tmp[i] = document.createElement('option');
			tmp[i].value = value.colors[i];
			tmp[i].innerHTML = value.colors[i];

			product.colors.appendChild(tmp[i]);
		}

		// Event pour ajouter au panier
		btn_addToCart.addEventListener('click', function() {
			// Récupère et stock les données de l'article en cours dans l'objet "datas"
			let data_form = {
				id : _id,
			    name : product.title.innerHTML,
			    color: product.colors.value,
			    quantity : parseInt(product.quantity.value)
			}

			// Vérifie que la quantité est un nombre entier valide et qu'une couleur a bien été selectionnée
			if (data_form.quantity >= 1 && data_form.quantity <= 100 && Number.isInteger(data_form.quantity) && data_form.color) {
				var ls_id = value._id + data_form.color;
				var ls = localStorage;
				data_form = JSON.stringify(data_form);

				if (!keyExiste(ls_id)) {
					ls.setItem(ls_id, data_form);

					// console.log("Clé créée !")
				} else {
					data_form = JSON.parse(data_form)
					updateData(ls_id, data_form);
					// console.log("Modification effectuée");
				}

				erreur_message.innerHTML = '';
				location.reload();
			} else {
				erreur_message.innerHTML = 'Veuillez bien remplir les champs !';
			}
		});	
	})

	.catch(function(e) {
		console.error(e);
		items.innerHTML = '<p><strong>Impossible de charger le produit<strong></p>';
	});
}

function keyExiste(ls_id) {
	if (localStorage.getItem(ls_id)) {
		return true;
	} else {
		return false;
	}
}

function updateData(id, value) {
	var ls = localStorage.getItem(id);
	var ls_data = JSON.parse(ls);
	var result = 0;

	result += ls_data.quantity + value.quantity;

	ls_data.quantity = parseInt(result);

	send_data = JSON.stringify(ls_data);
	localStorage.setItem(id, send_data);
}