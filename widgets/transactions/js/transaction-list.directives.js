(function() {
    'use strict';

	angular.module('transactionListWidget.directives', [])
		
		.directive('highlightText', function() {        
		
			function getIndicesOf (searchStr, str) {
				var startIndex = 0,
					searchStrLen = searchStr.length,
					index, indices = [];
					
				str = str.toLowerCase();
				searchStr = searchStr.toLowerCase();

				while ((index = str.indexOf(searchStr, startIndex)) > -1) {
					indices.push(index);
					startIndex = index + searchStrLen;
				}
				
				return indices;
			}	

			return {
				restrict: 'E',
				link: function (scope, element, attrs) { 
					// highlight matches with a query
					// IE9+ && all others modern browsers
					scope.$watch(attrs.query, function (value) {
						var text = element.text(),
							resultText = '',
							arrayOfIndices, i, y;

						if (value) {
							arrayOfIndices = getIndicesOf(value, text);
							for (i = 0, y = 0; i < arrayOfIndices.length; i++) {
								resultText += text.substring(y, arrayOfIndices[i]);
								resultText += '<span class="text-highlight">' +
									text.substring(arrayOfIndices[i], arrayOfIndices[i] + value.length) + '</span>';
								y = arrayOfIndices[i] + value.length;
							}

							resultText += text.substring(y);

							element.html(resultText);
						} else {
							element.html(text);
						}
					});
				}
			}
	});
	
})();	