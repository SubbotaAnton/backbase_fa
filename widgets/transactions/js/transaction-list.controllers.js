(function() {
    'use strict';
	
	angular.module('transactionListWidget.controllers', [])
		
		// $http implementation. Below - alternative $resource implementation
		
		.controller('TransactionListCtrl', ['$scope', '$http', function ($scope,  $http) {
					
			$http.get('/api/transactions').success(function(data) {
				$scope.transactions = data; // receive transactions from a REST API
			});
		
			$scope.query = ''; // default value
				
			$scope.sortedFields = [
				// we can sort list of transactions by these fields
				{ type : 'counterpartyName' , name : 'Counterparty name'},
				{ type : 'transactionType' , name : 'Transaction type'}
			];
				
			$scope.sortedBy = $scope.sortedFields[0]; // default sort
			
			$scope.setDefaultFilterField = function (field) {
				
				if ($scope.sortedBy.type !== field.type) { // if we change another type of sorting
					$scope.sortedBy = field; // change type
					$scope.query = ''; // reset query
				}
			};
			
			$scope.disputeTransaction = function (transaction) {
				var errorMessage = 'Bad news...'; // It can be different type of error message; for example, a REST API can return description of error
				
				transaction.isDisputed = true; // disable button - don't wait for post success
				$http.post('/api/transactions/' + transaction.id + '/dispute')
					.success(function(data, status, headers, config) {
						transaction.disputeMessage = data && data.message || errorMessage;
					})
					.error(function(data, status, headers, config) {
						transaction.disputeMessage = errorMessage;
					});
				
			};
			
			$scope.search = function (item) {
				var query = $scope.query.toLowerCase(),
					type = $scope.sortedBy.type;
					
				return item[type] && item[type].toString().toLowerCase().indexOf(query) !== -1;
			};
			
			$scope.reorderTransaction = function (fieldName) {
				$http.get('/api/transactions?sort=' + fieldName).success(function(data) {
					$scope.transactions = data; // receive transactions
				});			
			}
		  
	}]);
	
	angular.module('transactionListWidget.controllers.alt', ['ngResource'])
	
		/*
			$resource implementation. 
			According https://docs.angularjs.org/api/ngResource/service/$resource (interact with RESTful server-side data sources)
		*/
		.factory('Data', function ($resource) {
			return $resource('/api/transactions/:transactionId/:action', {
				transactionId : '@transactionId',
				action : '@action'
			}, {
				get : {method : 'GET', isArray : true}
			});
		})
		.controller('TransactionListCtrl', ['$scope', 'Data', function ($scope,  Data) {
				
			$scope.transactions = Data.get();
						
			$scope.query = ''; // default value
				
			$scope.sortedFields = [
				// we can sort list of transactions by these fields
				{ type : 'counterpartyName' , name : 'Counterparty name'},
				{ type : 'transactionType' , name : 'Transaction type'}
			];
				
			$scope.sortedBy = $scope.sortedFields[0]; // default sort
			
			$scope.setDefaultFilterField = function (field) {
				
				if ($scope.sortedBy.type !== field.type) { // if we change another type of sorting
					$scope.sortedBy = field; // change type
					$scope.query = ''; // reset query
				}
			};
			
			$scope.disputeTransaction = function (transaction) {
				var errorMessage = 'Bad news...'; // It can be different type of error message; for example, a REST API can return description of error
			
				transaction.isDisputed = true; // disable button - don't wait for post success
				
				Data.save({transactionId : transaction.id, action : 'dispute'}, function (data){
					transaction.disputeMessage = data && data.message || errorMessage;
				});				
			};
			
			$scope.search = function (item) {
				var query = $scope.query.toLowerCase(),
					type = $scope.sortedBy.type;
					
				return item[type] && item[type].toString().toLowerCase().indexOf(query) !== -1;
			};
			
			$scope.reorderTransaction = function (fieldName) {
				$scope.transactions = Data.get({sort : fieldName});		
			}
		  
	}]);
	
})();