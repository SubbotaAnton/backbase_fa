(function() {
    'use strict';
	
	// we may also use only one file with all code into it

	angular.module('transactionListWidget', [
		'transactionListWidget.directives',
		'transactionListWidget.controllers' // $http implementation
		//'transactionListWidget.controllers.alt' // $resource implementation.  
	]);
	
})();