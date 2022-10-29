var input = {
'firstName': document.getElementById('firstName'),
'lastName': document.getElementById('lastName'),
'address': document.getElementById('address'),
'city': document.getElementById('city'),
'email': document.getElementById('email')
};

// Gérer la saisie utilisateur (formulaire)
var submit_order = document.getElementById('order');

submit_order.addEventListener('click', function(e){
	e.preventDefault(); // Ne rafraîchi pas la page !

	for (item in input) {
		if (!input[item].value == '') {
			erreurMessage(item);

			if (verifyAllField(item, input[item].value)) {
				console.log('VALIDE');
			} else {

			}
		} else {
			erreurMessage(item, 'field');
		}
	}
});

// Field, "facultatif" : pour définir manuellement le champ à tester
function erreurMessage(item, errorType, onlyTextField) {
	var elm = document.getElementById(item+'ErrorMsg');

	switch (errorType) {
		case 'field': // Champ vide
			return elm.innerHTML = 'Veuillez remplir le champ ' + fieldName(item);

		case 'regex': // Champ nom conforme
			if (onlyTextField) {
				elm.innerHTML = 'Veuillez saisir un ' + fieldName(onlyTextField) + ' valide';
			} else {
				elm.innerHTML = 'Veuillez saisir un ' + fieldName(item) + ' valide';
			}

		default:
			return elm.innerHTML = '';
	}
}

// Format texte (lettres uniquement : nom, prénom, etc..)
function validateOnlyLetter(field) {
	var regex = new RegExp(/^[a-zA-Z\-]+$/);
    var valid = regex.test(field);

    if(!valid) {
    	erreurMessage();
        return false;
    } else {
        return true;
    }
}

// Format adresse
function validateAddress(address) {
	var regex = RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
	var valid = regex.text(address);

	if(!valid) {
    	erreurMessage('address', 'regex');
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
    	erreurMessage('email', 'regex');
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