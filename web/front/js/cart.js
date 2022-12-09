window.onload = function() {
	var items = document.getElementById('cart__items'); // Contient les articles
	var ls = localStorage; // Récupère le nombre d'article dans le panier
	var articles = new Array();
	var tmp = [];
	var tmp_url = [];
	var result = [];
	var panier = {
		'totalPrice' : 0,
		'totalQuantity' : 0
	};

	// Si aucun article dans le panier.
	if (ls.length == 0) {
		items.innerHTML = `
			<p class="text-center">Pas d'article dans le panier</p>
		`;
	}
	
	// Requête vers l'API suivante :
	fetch("http://localhost:3000/api/products/").then(function(result) {
		return result.json();
	}).then(function(value) {
		var tmp_quantity = [];
		var tmp_price = [];
		var tmp_id = [];

		for (let i = 0; i < ls.length; i++) {
			tmp[i] = localStorage.key(i); // Récupère le nom de la clé
			tmp[i] = localStorage.getItem(tmp[i]); // Récupère la valeur de la clé

			result[i] = JSON.parse(tmp[i]); // Convertie les données du panier en JSON

			// Création de l'élément
			articles[i] = document.createElement('article');
			articles[i].classList.add('cart__item');
			articles[i].innerHTML = `
				<div class="cart__item__img">
					<img src="${ getImage(result[i].id, value) }" alt="Photographie d'un canapé">
				</div>

				<div class="cart__item__content">
					<div class="cart__item__content__description">
						<h2>${result[i].name}</h2>
						<p>${result[i].color}</p>
						<p>${ getPrice(result[i].id, value) } €</p>
					</div>

					<div class="cart__item__content__settings">
						<div class="cart__item__content__settings__quantity">
							<p>Qté : </p>
							<input type="number" class="itemQuantity" min="1" max="100" value="${result[i].quantity}" onchange="updateData(${i}, this.value)">
						</div>

						<div class="cart__item__content__settings__delete">
							<p class="deleteItem" onclick="deleteItem(${i})">Supprimer</p>
						</div>
					</div>
				</div>
			`;
			items.appendChild(articles[i]);

			tmp_price[i] = getPrice(result[i].id, value) * result[i].quantity
			panier.totalQuantity += result[i].quantity // Quantité
		}

		for (let i = 0; i < tmp_price.length; i++) {
			panier.totalPrice +=  tmp_price[i];
		}

		document.getElementById('totalQuantity').innerHTML = panier.totalQuantity;
		document.getElementById('totalPrice').innerHTML = deuxApresVirgule(panier.totalPrice);
	});
}

// Update les changements
function updateData(id, value) {
	let key = localStorage.key(id);
	let tmp = localStorage.getItem(key);
	var datas = JSON.parse(tmp);

	datas.quantity = parseInt(value);
	datas = JSON.stringify(datas);
	localStorage.setItem(key, datas);
	location.reload();
}

function deleteItem(elm) {
	ls = localStorage.key(elm);
	localStorage.removeItem(ls);
	location.reload();
}

// Retourne la bonne image à afficher
function getImage(id, value) {
	for (let i = 0; i < value.length; i++) {
		if (value[i]._id == id) {
			return value[i].imageUrl;
		}
	}
}

function getPrice(id, value) {
	for (let i = 0; i < value.length; i++) {
		if (value[i]._id == id) {
			return value[i].price;
		}
	}
}

// Arrondie 2 chiffres après la virgule
function deuxApresVirgule(float) {
	parseFloat(float)
	return Math.round(float * 100) / 100;
}
