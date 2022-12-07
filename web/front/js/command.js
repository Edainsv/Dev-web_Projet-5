var input = {
	'firstName': document.getElementById('firstName'),
	'lastName': document.getElementById('lastName'),
	'address': document.getElementById('address'),
	'city': document.getElementById('city'),
	'email': document.getElementById('email')
};

var is_ok = {
	'firstName' : false,
	'lastName' : false,
	'address' : false,
	'city' : false,
	'email' : false
};

var submit_order = document.getElementById('order');
submit_order.addEventListener('click', function(e){
	e.preventDefault(); // Ne rafraîchi pas la page !

	for (item in input) {
		// Teste du remplissage
		if (input[item].value == '') {
			erreurMessage('fill', item);
		} else {
			var ok = false;
			erreurMessage(0, item);

			// On teste la validité des champs saisis
			ok = tryForRegex(item, input[item].value); // Pour tester tout les champs

			if (!ok) {
				erreurMessage('regex', item)
				return;
			} else {
				erreurMessage(0, item);
				is_ok[item] = true;

				// Si tout est OK, on peut POST pour récupérer un numéro de commande
				if (is_ok.firstName && is_ok.lastName && is_ok.address && is_ok.city && is_ok.email) {
					postForm();
					return;

					order = getRandomInt();

					document.getElementsByClassName('cart__order__form')[0].innerHTML = `
						<div class="order">
							<p>Votre demande a bien été prise en compte</p>
							<p>Voici votre numéro de commande : <strong>${order}</strong></p>
						</div>
					`;
					return;
				}
			}
		}
	}
});

function getRandomInt() {
  return Math.floor(Math.random(10000000000000) * 99999999999999);
}

function tryForRegex(item, value) {
	switch (item) {
		case 'firstName':
			return validateOnlyLetter(value);
		break;
		
		case 'lastName':
			return validateOnlyLetter(value);
		break;
		
		case 'address':
			return validateText(value);
		break;

		case 'city':
			return validateText(value);
		break;

		case 'email':
			return validateEmail(value);
		break;
	}
}

// Affiche l'erreur en cours
function erreurMessage(errorType, item) {
	var elm = document.getElementById(item+'ErrorMsg');

	switch (errorType) {
		case 'fill': // Champ saisi
			elm.innerHTML = 'Le champ ' + fieldName(item) + ' est obligatoire';
			break;

		case 'regex':
			elm.innerHTML = 'Le champ '  + fieldName(item) + ' n\'est pas valide';
			break;

		default:
			elm.innerHTML = '';
			return;
	}	
}

// Format texte (lettres uniquement : nom, prénom, etc..)
function validateOnlyLetter(item) {
	var regex = new RegExp(/^[a-zA-Z\-îï]{3,}$/);
    var valid = regex.test(item);

    if(!valid) {
        return false;
    } else {
        return true;
    }
}

// Format adresse
function validateText(address) {
	var regex = RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
	var valid = regex.test(address);

	if(!valid) {
        return false;
    } else {
        return true;
    }
}

// Format demail
function validateEmail(email){
    var regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    var valid = regex.test(email);

    if(!valid) {
        return false;
    } else {
        return true;
    }
}

function fieldName(item) {
	switch (item) {
		case 'firstName':
			return 'prénom';
		case 'lastName':
			return 'nom';
		case 'address':
			return 'adresse';
		case 'city':
			return 'ville';
		case 'email':
			return 'email';
		default:
			return;
	}
}



// Pour valider la commande
function postForm() {
    let products = [];
    var tmp = [];
    let result = [];
    let ls = localStorage;
			
    for (let i = 0; i < ls.length;i++) {

        tmp[i] = localStorage.key(i); // Récupère le nom de la clé
		tmp[i] = localStorage.getItem(tmp[i]); // Récupère la valeur de la clé

		result[i] = JSON.parse(tmp[i]); // Convertie les données du panier en JSON

		products.push(result[i].id);
    }

    // On récupère les identifiants des produits et on les stocks dans products.
    const contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
    }

    console.log(contact);
    const sendFormData = {
      contact,
      products,
    }
  
    const options = {
		method: 'POST',
		body: JSON.stringify(sendFormData),
		headers: { 
			'Content-Type': 'application/json',
		}
    };
  
  	// Requête POST vers l'API
    fetch("http://localhost:3000/api/products/order", options).then(response => response.json()).then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
	});

}
