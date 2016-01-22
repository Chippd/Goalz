angular.module('app.controllers', [])


.controller('mainCtrl', function($scope, userService){
	$scope.logout = function(){
		userService.logoutUser();
	}
})


.controller('signupCtrl', function($scope, $firebaseAuth, $firebaseObject, $state, userService) {

    var ref = new Firebase("https://lifegoalz.firebaseio.com/");
    var userRef = ref.child('users');

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

                var mail = $scope.signupUser.email.replace(".", "(DOT)").replace('@','(AT)');

                userRef.child(mail).set({
                    uid: userData.uid,
                    achievedGoals: [],
                    currentGoals:[]
                });
                userService.setUser($scope.signupUser);
                $state.go('menu.goals')
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

    $scope.loading = false;
    $scope.loginError = '';


    $scope.login = function(Valid) {

        if (!Valid) {
            console.log('form is not valid, no login for you')
            return
        }

        $scope.loading = true;

        console.log('loginCtrl: logging in')

        ref.authWithPassword({
            email: $scope.loginUser.email,
            password: $scope.loginUser.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                $scope.loginError = error;
                $scope.loading = false;
            } else {
                $scope.loginUser.uid = authData.uid;
                userService.setUser($scope.loginUser);
                console.log("Authenticated successfully with payload:", authData);
                $state.go('menu.goals');
            }
        });
    }





})


   
.controller('goalCtrl', function($scope, $location, $state, goals, goalsService, achievedGoals) {

	$scope.goals = goals;

	var goalId = $location.url().split('/')[3];
	//console.log('id is:', goalId);

	$scope.loaded = false;

	$scope.goals.$loaded()
		.then(function(x){
			$scope.loaded = true;
			$scope.goal = goalsService.getGoal(goalId);
			//console.log(goals)
		})
		.catch(function(error){
			console.log("Error:", error);
		});

		var currentGoalsArray = goals;

		var achievedGoalsArray = achievedGoals;


	$scope.markDone = function(){
		//pressing this button will remove this task from goals array and push it to achieved goals array
		console.log('running markDone()');
		currentGoalsArray.$remove($scope.goal)
			.then(function(){
				console.log('goal removed from currentGoals');
			})
			.catch(function(error){
				console.log('error:',error)
			});

		achievedGoalsArray.$add($scope.goal)
			.then(function(){
				console.log('goal added to achievedGoals');
				$state.go('menu.goals');
			})
			.catch(function(error){
				console.log('error:',error)
			});;


	}
		
})
   
.controller('goalsCtrl', function($scope, goals) {

	$scope.goals = goals;

	$scope.loaded = false;

	$scope.noGoals = false;

	$scope.goals.$loaded()
	  .then(function(x) {
	    console.log('goals loaded');
	    $scope.loaded = true;
	    if ($scope.goals.length === 0) {
	    	$scope.noGoals = true;
	    };
	  })
	  .catch(function(error) {
	    console.log("Error:", error);
	  });


})
      
.controller('newGoalCtrl', function($scope, $state, $ionicHistory, $firebaseArray, userService, goals) {

	var user = userService.getUser();

	$scope.newGoal = {
	    alarmText: "",
	    deadline: "",
	    goalTitle: "",
	    measurable: false,
	    measureUnit: "",
	    remind: false,
	    subTask: ""
	};
	
	$scope._forms = {};

	// var dotMail = user.email.replace('.','(DOT)').replace('@',"(AT)");

	// var goalsRef = new Firebase("https://lifegoalz.firebaseio.com/users/"+dotMail+"/currentGoals");

	var currentGoals = goals;


	$scope.addGoal = function(isValid){

		if(!isValid){
			console.log('whoops, form is not valid, no new goal for you');
			return
		}

		currentGoals.$add($scope.newGoal);
		$ionicHistory.nextViewOptions({
		  disableBack: true
		});
		$state.go('menu.goals');


	}
})

.controller('achievedGoalsCtrl', function($scope, $state, $ionicHistory, userService, goals, achievedGoals) {

	$scope.goals = achievedGoals;

	$scope.loaded = false;

	$scope.goals.$loaded()
	  .then(function(x) {
	    console.log('goals loaded');
	    $scope.loaded = true;
	  })
	  .catch(function(error) {
	    console.log("Error:", error);
	  });

})
 















