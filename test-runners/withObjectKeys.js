function run( urls ) {

	// a ( k -> v ) HashMap
	var urlsMap = {};

	urls.forEach( function( url ) {
		urlsMap[ url ] = 1;
	});

	return Object.keys( urlsMap );

}

module.exports = run;