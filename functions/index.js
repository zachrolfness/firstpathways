const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const capitalizeSentence = require('capitalize-sentence');
const toLaxTitleCase = require('titlecase').toLaxTitleCase
const Filter = require('bad-words');
const badWordsFilter = new Filter();

exports.censorResource = functions.database.ref('/Resources/{resourceId}')
	.onCreate((event) => {
		const Resource = event.data.val();

		if(Resource) {
			if(!Resource.Approved && !Resource.Sanitized) {
				if(Resource.Name && Resource.Description) {
					return event.data.adminRef.update({
						Name: moderateTitle(Resource.Name),
						Description: moderateMessage(Resource.Description),
						Sanitized: true
					});
				} else {
					console.warn('Resource Name or Description do not exist.')
				}
			}
			else {
				console.info('Resource is already approved and appropriate.');
			}
		} else {
			console.error('Resource doesn\'t exist');
		}
	});

// Moderates the given message if appropriate.
// Moderate if the user uses swear words.
function moderateTitle(message) {
	if (containsSwearwords(message)) {
		message = moderateSwearwords(message);
	}

	return toLaxTitleCase(message.toLowerCase());
}

// Moderates the given message if appropriate.
function moderateMessage(message) {
	// Re-capitalize if the user is Shouting.
	if (isShouting(message)) {
		message = stopShouting(message);
	}

	// Moderate if the user uses swear words.
	if (containsSwearwords(message)) {
		message = moderateSwearwords(message);
	}

	return message;
}

// Returns true if the string contains swearwords.
function containsSwearwords(message) {
	return message !== badWordsFilter.clean(message);
}

// Hide all swearwords. e.g: Crap => ****.
function moderateSwearwords(message) {
	return badWordsFilter.clean(message);
}

// Detect if the current message is shouting. i.e. there are too many Uppercase
// characters or exclamation points.
function isShouting(message) {
	return message.replace(/[^A-Z]/g, '').length > message.length / 2 || message.replace(/[^!]/g, '').length >= 3;
}
// Correctly capitalize the string as a sentence (e.g. uppercase after dots)
// and remove exclamation points.
function stopShouting(message) {
	return capitalizeSentence(message.toLowerCase()).replace(/!+/g, '.');
}

// censorResource({Name: 'Functions Test 1', Branch: 'FRC', Description: 'TESTING FIREBASE CLOUD FUNCTIONS', User: 'kesav',Approved: false,Sanitized: false});
