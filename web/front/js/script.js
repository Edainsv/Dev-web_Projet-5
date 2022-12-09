window.onload = function() {
	var items = document.getElementById('items');
	var item = [];
	
	// Requête vers l'API suivante :
	fetch("http://localhost:3000/api/products").then(function(result) {
		return result.json();
	})

	.then(function(value) {
		// Boucle sur autant d'item qu'il en existe
		for (let i= 0; i < value.length; i++) {
			item[i] = document.createElement('a');
			item[i].href = "./product.html?id=" + value[i]._id;
			item[i].innerHTML = `
				<article>
					<img src="` + value[i].imageUrl + `" alt="` + value[i].altTxt + `">
						<h3 class="productName">` + value[i].name + `</h3>
						<p class="productDescription">` + value[i].description + `</p>
				</article>
			`;

			// Ajoute les éléments dans la section ayant pour ID: "items"
			items.appendChild(item[i]);
		}
	})

	.catch(function(e) {
		console.error(e);
		items.innerHTML = '<p><strong>Impossible de charger les éléments</strong></p>';
	});
}