/*
 postal
 Author: Jim Cowart (http://freshbrewedcode.com/jimcowart)
 License: Dual licensed MIT (http://www.opensource.org/licenses/mit-license) & GPL (http://www.opensource.org/licenses/gpl-license)
 Version 0.7.1
 */
(function(postal, undefined){
	var classicBindingsResolver = {
		cache : { },
	
		compare : function ( binding, topic ) {
			if ( this.cache[topic] && this.cache[topic][binding] ) {
				return true;
			}
			//  binding.replace(/\./g,"\\.")             // escape actual periods
			//         .replace(/\*/g, ".*")             // asterisks match any value
			//         .replace(/#/g, "[A-Z,a-z,0-9]*"); // hash matches any alpha-numeric 'word'
			var rgx = new RegExp( "^" + binding.replace( /\./g, "\\." ).replace( /\*/g, ".*" ).replace( /#/g, "[A-Z,a-z,0-9]*" ) + "$" ),
				result = rgx.test( topic );
			if ( result ) {
				if ( !this.cache[topic] ) {
					this.cache[topic] = {};
				}
				this.cache[topic][binding] = true;
			}
			return result;
		},
	
		reset : function () {
			this.cache = {};
		}
	};
	
	postal.configuration.resolver = classicBindingsResolver;
})(window.postal);