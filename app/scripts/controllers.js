'use strict';

angular.module('confusionApp').controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            $scope.tab = 1;
            $scope.filtText = '';
           
            $scope.dishes= menuFactory.getDishes()

            $scope.select = function(setTab) {
                $scope.tab = setTab;
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.showDetails = false;

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }]);

angular.module('confusionApp').controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
}]);

angular.module('confusionApp').controller('FeedbackController', ['$scope', function($scope) {
  $scope.sendFeedback = function() {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else 
      {
          $scope.invalidChannelSelection = false;
          $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                             agree:false, email:"" };
          $scope.feedback.mychannel="";

          $scope.feedbackForm.$setPristine();
          console.log($scope.feedback);
      }
  };
}]);

angular.module('confusionApp').controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {
   
    $scope.dish = menuFactory.getDish(3);
    
}]);

angular.module('confusionApp').controller('DishCommentController', ['$scope','$controller', function($scope,$controller) {
    
    //Step 1: Create a JavaScript object to hold the comment from the form

    $scope.submitComment = function () {
        console.log("in submit comment")
        //Step 2: This is how you record the date
        $scope.comment.date = new Date().toISOString();
        $scope.comment.rating=$scope.commentform.rating;
        $scope.comment.author=$scope.commentform.yourname;
        $scope.comment.comment=$scope.commentform.comments;
        
        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.comment);
        
        console.log($scope.dish.comments);

        //Step 4: reset your form to pristine

        $scope.commentForm.$setPristine();
        
        //Step 5: reset your JavaScript object that holds your comment

        $scope.commentform.yourname='';
        $scope.commentform.rating='5';
        $scope.commentform.comments='';

        $scope.comment=
        {
          rating:'',
          comment:'',
          author:'',
          date:''
        };


    }

    $scope.comment=
    {
      rating:'',
      comment:'',
      author:'',
      date:''
    };


    $scope.commentform={};
    $scope.commentform.yourname='';
    $scope.commentform.rating='5';
    $scope.commentform.comments='';

}]);