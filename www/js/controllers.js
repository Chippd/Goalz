angular.module('app.controllers', [])
  
.controller('signupCtrl', function($scope, $firebaseAuth) {

    var ref = new Firebase("https://lifegoalz.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);


    $scope.signup = function() {

        ref.createUser({
            email: "bobtony@firebase.com",
            password: "correcthorsebatterystaple"
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });

    }


})

   
.controller('loginCtrl', function($scope, $firebaseAuth, $state) {

    var ref = new Firebase("https://lifegoalz.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.loginUser = {'email':'','password':''};


    $scope.login = function() {

        ref.authWithPassword({
            email: $scope.loginUser.email,
            password: $scope.loginUser.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                alert(error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $state.go('menu.goals')
            }
        });

    }





})

   
.controller('goalCtrl', function($scope) {

})
   
.controller('goalsCtrl', function($scope) {

})
      
.controller('newGoalCtrl', function($scope) {

})
 