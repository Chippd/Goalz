angular.module('app.services', [])

.factory("goals", function($firebaseArray, userService) {

		var user = userService.getUser();

		var dotMail = user.email.replace('.','(DOT)').replace('@',"(AT)");

		var goalsRef = new Firebase("https://lifegoalz.firebaseio.com/users/"+dotMail+"/currentGoals");

		var goals = $firebaseArray(goalsRef);

    return goals;
})

.factory('achievedGoals', function($firebaseArray, userService) {

    var user = userService.getUser();

    var dotMail = user.email.replace('.', '(DOT)').replace('@', "(AT)");

    var goalsRef = new Firebase("https://lifegoalz.firebaseio.com/users/" + dotMail + "/achievedGoals");

    var achievedGoals = $firebaseArray(goalsRef);

    return achievedGoals
})


.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://lifegoalz.firebaseio.com");
    return $firebaseAuth(ref);
  }
])

.service('goalsService', ['goals', function(goals){

	return{
		getGoal: function(id){
			//match id up to goal in goals array
			console.log('goalsService: running getGoal')
			for(i=0; i<= goals.length; i++)
				if(goals[i].$id == id){
					return goals[i]
				}
		}
	}



}])

.service('userService', ['$firebaseAuth', '$state', 'Auth', '$ionicSideMenuDelegate', function($firebaseAuth, $state, $ionicSideMenuDelegate, Auth) {

    var firebaseObj = new Firebase("https://lifegoalz.firebaseio.com");

    var user = {};

    return {
        getUser: function() {
            console.log('userService: running getUser');
            if(user === null){
                return false
            }
            if (Object.keys(user).length == 0) {
                var userRef = localStorage.getItem('user');
                user = JSON.parse(userRef);
            }
            //console.log('user is',user);
            return user;
        },
        setUser: function(value) {
            localStorage.setItem("user", JSON.stringify(value));
            user = value;
            console.log('user is set to: ', user);
        },
        checkUser: function() {

        	if(this.getUser()){
        		return true;
        	}

        	if(Auth._instances.length <= 1){
        		return false
        	} else {
        		console.log(Auth);
        		var authData = Auth.$getAuth();

            if (authData) {
                console.log("Logged in as:", authData.uid);
                return authData
            } else {
                console.log("Logged out");
                return false
            }
        	}
            
        },
        logoutUser: function() {
            var loginObj = $firebaseAuth(firebaseObj);
            loginObj.$unauth();
            user = '';
            localStorage.removeItem('user');
            $state.go('login');
            // $ionicHistory.clearHistory();
            // $ionicHistory.clearCache();
            console.log('done logout');

        },
    }

}]);



