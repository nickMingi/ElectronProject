const {remote} = require('electron');
const {dialog} = remote.dialog;

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: './home/lefthome.html',
        controller: 'homeCtrl'
    }).when('/edit', {
        templateUrl: ''
    }).otherwise({
        template: "404 "
    })
});

app.controller('headCtrl',function($scope){
    var win = remote.getCurrentWindow();
    $scope.close = function(){
        win.close();
    };
    $scope.minimize = function(){
        win.minimize();
    };
    $scope.maximize = function(){
        win.isMaximized() ? win.unmaximize() : win.maximize();
    };
});

app.controller('homeCtrl',function($scope, $location){
   /* $scope.pickFile = function(){
        //var {dialog} = remote;
        dialog.showOpenDialog({
            properties: ['openDirectory'],
            filters: [{
                name: 'Images',
                extentions: ['jpg', 'jpeg', 'png']
            }]
        }, function(file){
            if(!!file){
                var path = file[0];
                $location.path('/edit');
            }
            console.log(file);
        });
    };*/
});

app.controller('rightCtrl',function($scope){
    $scope.theUrl = function(){
        return './home/righthome.html';
    }
});

//document.getElementById("close").addEventListener('click',closeWindow);
/*function closeWindow()
{
    var window = remote.getCurrentWindow();
        window.close();
}*/


