window.onload = function() {
	var ls = localStorage; // Récupère le nombre d'article dans le panier
	var tmp = [];
	var result = [];
	var total = 0;

	// console.log(ls.length)

	for (let i = 0; i < ls.length; i++) {
		tmp[i] = localStorage.key(i); // Récupère les clé
		tmp[i] = localStorage.getItem(tmp[i]); // Récupère la valeur des clés

		result[i] = JSON.parse(tmp[i]); // Convert to JSON

		total += result[i].price; // Somme des prix
	}

	console.log(total)

}