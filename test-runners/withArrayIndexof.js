function run( urls ) {
	var index = [];

	urls.forEach( function( url ) {
		(index.indexOf( url ) > -1) && index.push( url );
	});

	return index;
}

module.exports = run;