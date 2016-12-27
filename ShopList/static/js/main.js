var app = angular.module('shoplist', ['ui.router']);

app.constant("ITEM_URL", 'http://localhost:8000/api/listitem/');
app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/static/templates/home.html',
            controller: 'MainCtrl'
        })
        .state('add-item', {
            url: "/add",
            templateUrl: 'static/templates/add_item.html',
            controller: 'MainCtrl'
        });

        $urlRouterProvider.otherwise('/');
});

Items = app.service("Items", function($http, ITEM_URL){
    var Items = {}

    Items.all = function(){
        return $http.get(ITEM_URL);
    };

    Items.get = function(id){
        return $http.get(ITEM_URL + id + '/');
    }

    Items.create = function(newItem){
        return $http.post(ITEM_URL, newItem);
    }

    Items.update = function(updated){
        return $http.put(ITEM_URL + updated.id + '/', updated);
    }

    Items.delete = function(id){
        return $http.delete(ITEM_URL + id + '/')
    }

    return Items;
});

app.controller('MainCtrl',[
    '$scope', 'Items', '$state',
    function($scope, Items, $state){
        $scope.newItem = {};
        $scope.addItem = function(){
            Items.create($scope.newItem)
                .then(function(res){
                    $state.go("home");
                })
        }

        $scope.toggleState = function(item){
            item.state = !item.state;
            if(item.state == true){
                $scope.pending_items.splice($scope.pending_items.indexOf(item), 1);
                $scope.completed_items.push(item);
            }else{
                $scope.completed_items.splice($scope.completed_items.indexOf(item), 1);
                $scope.pending_items.push(item);
            }

            Items.update(item);
        }

        $scope.delete = function(item){
            $scope.completed_items.splice($scope.completed_items.indexOf(item), 1);
            Items.delete(item.id);
        }

        Items.all().then(function(res){
            $scope.pending_items = res.data.filter(function(item){
                return !item.state;
            });

            $scope.completed_items = res.data.filter(function(item){
                return item.state;
            });
        });
}]);
