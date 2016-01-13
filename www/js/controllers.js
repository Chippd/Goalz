angular.module('app.controllers', [])


.controller('mainCtrl', function($scope, userService){
	$scope.logout = function(){
		userService.logoutUser();
	}
})


.controller('signupCtrl', function($scope, $firebaseAuth, userService) {

    var ref = new Firebase("https://lifegoalz.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.signupUser = {
        'email': '',
        'password': '',
        'uid': ''
    }


    $scope.signup = function(isValid) {

        if (!isValid) {
            console.log('signup form is not valid, no login for you');
            return;
        }

        console.log('signupForm valid, attempting signup');

        ref.createUser({
            email: $scope.signupUser.email,
            password: $scope.signupUser.password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                userService.setUser($scope.signupUser);
            }
        });
    }
})

   
.controller('loginCtrl', function($scope, $firebaseAuth, $state, userService) {

    var ref = new Firebase("https://lifegoalz.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.loginUser = {
        'email': '',
        'password': ''
    };

    if (userService.checkUser()) {
        $state.go('menu.goals');
    }


    $scope.login = function(Valid) {

        if (!Valid) {
            console.log('form is not valid, no login for you')
            return
        }

        console.log('loginCtrl: logging in')

        ref.authWithPassword({
            email: $scope.loginUser.email,
            password: $scope.loginUser.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                alert(error);
            } else {
                $scope.loginUser.uid = authData.uid;
                userService.setUser($scope.loginUser);
                console.log("Authenticated successfully with payload:", authData);
                $state.go('menu.goals')
            }
        });
    }





})


   
.controller('goalCtrl', function($scope) {

	
})
   
.controller('goalsCtrl', function($scope, goals) {

	$scope.goals = goals;

})
      
.controller('newGoalCtrl', function($scope) {

	$scope.newGoal = {};


})
 