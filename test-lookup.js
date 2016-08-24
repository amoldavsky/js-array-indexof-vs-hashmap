var Benchmark = require( 'benchmark' );

function indexPayloadAsKeys( payload ) {
	var index = {};
	payload.forEach( function( item ) {
		index[ item ] = 1;
	});

	return index;
}

function runTest( payload ) {
	var suite = new Benchmark.Suite;
	var urlCount = payload.length;

	console.log( 'Url count ' + urlCount );

	var objectIndex = indexPayloadAsKeys( payload );
	suite.add( 'array.indexOf', function () {

		payload.forEach( function( item ) {
			payload.indexOf( item );
		});

	})
	.add( 'object.keys', function () {

		payload.forEach( function( item ) {
			objectIndex[ item ];
		});

	})
	.on( 'cycle', function ( event ) {
		console.log( String( event.target ) );
	} )
	.on( 'complete', function () {
		console.log( 'Fastest is ' + this.filter( 'fastest' ).map( 'name' ) );
	} )
	.run();
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

(function testRegular() {

	var fs = require( 'fs' );
	var path = require( 'path' );

	function walkSync( currentDirPath, callback ) {
		fs.readdirSync( currentDirPath ).forEach( function ( name ) {
			var filePath = path.join( currentDirPath, name );
			var stat = fs.statSync( filePath );
			if ( stat.isFile() ) {
				callback( filePath, stat );
			} else if ( stat.isDirectory() ) {
				walkSync( filePath, callback );
			}
		} );
	};

	walkSync( __dirname + '/payloads/', function ( file ) {

		console.log( "payload: " + file.split( "/" ).pop() );
		var payload = JSON.parse( fs.readFileSync( file ).toString() );
		payload = shuffleArray( payload );
		runTest( payload );
		console.log( "----------------" );

	} )
})();

(function test_lots_of_dups() {

	var fs = require( 'fs' );

	// test with lots of duplicates
	(function() {
		var payload = JSON.parse( fs.readFileSync( './payloads/payload-04.json' ).toString() );

		payload = payload.concat( payload, payload, payload, payload ); // x4 with duplicates
		payload = payload.concat( payload ); // x2 with duplicates

		payload = shuffleArray( payload ); // randomize order
		console.log( "with lots of duplicates" );
		runTest( payload );
		console.log( "----------------" );
	})();

	(function() {
		var payload = JSON.parse( fs.readFileSync( './payloads/payload-10.json' ).toString() );
		payload = payload.concat( payload ); // double with duplicates
		payload = shuffleArray( payload ); // shuffle
		console.log( "with lots of duplicates" );
		runTest( payload );
		console.log( "----------------" );
	})();

})();

(function test_short_keys() {

	// payload generator
	var generateShortKeysPayload = ( function() {

		var sampleData = [];
		for ( var si = 'a'.charCodeAt( 0 ), i = 0; i <= 25; i++ ) {
			sampleData.push( String.fromCharCode( si + i ) );
		}

		return function( size ) {
			// generate single char array starting from 'a'
			var payload = [];
			for ( var i = 0; i < size; i++ ) {
				var sampleDataIdx = Math.floor( Math.random() * (sampleData.length + 1) );
				var seed = (Math.random() * 10) | 0;
				payload.push( sampleData[ sampleDataIdx ] + seed );
			}

			return payload;
		}
	})();

	// test short keys
	(function() {
		console.log( "payload: short keys" );
		var payload = generateShortKeysPayload( 128 );
		payload = shuffleArray( payload );
		runTest( payload );
		console.log( "----------------" );
	})();

	(function() {
		console.log( "payload: short keys" );
		var payload = generateShortKeysPayload( 256 );
		payload = shuffleArray( payload );
		runTest( payload );
		console.log( "----------------" );
	})();


})();
