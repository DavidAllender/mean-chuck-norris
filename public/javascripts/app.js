/*global imagesLoded*/
var masonry;

var doMasonry = function(){
    var elem = document.querySelector('#container');
    imagesLoaded(elem, function(){
        masonry = new Masonry( elem, {
            itemSelector: '.grid-item',
            columnWidth: 500
        });
    });
};

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
var getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function(arr){
    var result = [], len=arr.length;
    for(var i = 0; i < len; i++) {
        result[i] = arr.splice(getRandomIntInclusive(0, arr.length -1), 1)[0];
    }
    return result;
};

angular.module('jokesApp', [])
    .controller("JokesController", function JokesController($scope, $http){
    var jokes, chucks;

    var weaveData = function(){
        if(!jokes || !chucks){
            return;
        }

        var data = [];
        for(var i = 0; i<Math.max(jokes.length, chucks.length); i++){
            data[i] = {joke: jokes[i%jokes.length].joke, chuck: chucks[i%chucks.length]};
        }
        $scope.jokes = data;
        window.setTimeout(doMasonry, 50);
    };

    $http.get("/jokes").then(function(response){jokes = shuffleArray(response.data); weaveData(response)}); //Get the jokes
    $http.get("/chuck").then(function(response){chucks = shuffleArray(response.data); weaveData(response)}); //Get the image urls
}).directive('tile', function(){
    return {
        templateUrl: '/templates/tile.html'
    };
});
