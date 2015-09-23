angular.module('telling_app.controllers', [])

// APP
.controller('AppCtrl', ['$scope', function($scope) {

}])
// WALKTHROUGH
.controller('WalkthroughCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};
}])

.controller('LoginCtrl', ['$scope', '$state', '$templateCache', '$q', '$rootScope', function($scope, $state, $templateCache, $q, $rootScope) {
	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.goToForgotPassword = function(){
		$state.go('forgot-password');
	};

	$scope.doLogIn = function(){
		$state.go('app.main');
	};

	$scope.user = {};

	$scope.user.email = "cassie@gmail.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

}])

.controller('SignupCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.main');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};
}])

.controller('ForgotPasswordCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.main');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.user = {};
}])

// Main
.controller('MainCtrl', ['$scope', function($scope) {

}])

// MISCELLANEOUS
.controller('MiscellaneousCtrl', ['$scope', function($scope) {

}])

.controller('RateApp', ['$scope', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
}])

.controller('SendMailCtrl', ['$scope', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
}])

.controller('MapsCtrl', ['$scope', '$ionicLoading', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){
		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.k,lng: pos.D};
			$scope.my_location = pos.k+", "+pos.D;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
}])

.controller('AdsCtrl', ['$scope', '$ionicActionSheet', 'AdMob', 'iAd', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
}])

.controller('InAppBrowserCtrl', ['$scope', function($scope) {
	$scope.openBrowser = function(){
		window.open('http://www.google.com', '_blank', 'location=yes');
	};
}])

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
}])

//bring specific category providers
.controller('CategoryFeedsCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
}])

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', ['$scope', '$stateParams', '$http', 'FeedList', '$q', '$ionicLoading', 'BookMarkService', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.readMore = function(link){
		window.open(link, '_blank', 'location=yes');
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
}])


// Multimedia
.controller('MultimediaCtrl', ['$scope', function($scope) {

}])

// SETTINGS
.controller('SettingsCtrl', ['$scope', '$ionicActionSheet', '$state', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('login');
			}
		});

	};
}])

// FORMS
.controller('FormsCtrl', ['$scope', function($scope) {

}])

// PROFILE
.controller('ProfileCtrl', ['$scope', function($scope) {

}])

.controller('PyramidCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.events=[];
    $scope.story="";
    $scope.submit = false;
    $scope.result = '';
    $scope.hint = '';
    $scope.test = ['ev1', 'ev2', 'ev3'];
    $scope.answer = [];
    
    //GET A RANDOM STORY
    $http.get('http://localhost:3000')
        .success(function(data) {
            console.log('getting');
            $scope.story = data[0].text;
            $scope.result = data[0].result;
            $scope.hint = data[0].hint;
            //get the events with this story id
            $scope.getEvents(data[0].id);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    //GET THE IMPORTANT EVENTS THAT BELONG TO THE STORY
    $scope.getEvents = function(id) {
        $http.get('http://localhost:3000/events?id='+id)
        .success(function(data) {
            $scope.events = data;
            $scope.randomize();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    //RANDOMIZE IMPORTANT NEWS EVENTS
    $scope.randomize = function() {
        //PICK AN EVENT FROM $SCOPE.EVENTS AT RANDOM
        $scope.ev1 = $scope.events[Math.floor(Math.random() * $scope.events.length)];
        //SET THE newIndex VALUE FOR THAT EVENT
        $scope.ev1.newIndex = 0;
        //FIND TAHT EVENT IN THE $SCOPE>EVENTS ARRAY
        var i1 = $scope.events.indexOf($scope.ev1);
        //REMOVE THAT EVENT FROM TEH ARRAY
        $scope.events.splice(i1,1);
        //PICK ANOTHER EVENT FROM $SCOPE.EVENTS AT RANDOM
        $scope.ev2 = $scope.events[Math.floor(Math.random() * $scope.events.length)];
        //SET THE newIndex VALUE FOR THAT EVENT
        $scope.ev2.newIndex = 1;
        //REMOVE THAT EVENT FROM THE ARRAY
        var i2 = $scope.events.indexOf($scope.ev2);
        //REMOVE THAT EVENT FROM THE ARRAY
        $scope.events.splice(i2,1);
        //ADD THE REMAINING EVENT
        $scope.ev3 = $scope.events[0];  
        $scope.ev3.newIndex = 2;
        
        //ADD THE EVENTS TO THE ANSWER ARRAY
        $scope.answer = [$scope.ev1,$scope.ev2,$scope.ev3];
        //SORT THE ARRAY BY THE EVENT VALUES
        $scope.answer.sort(function (a, b) {
            if (a.val > b.val) {
                return 1;
            }
            if (a.val < b.val) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        //THIS SORTED LIST IS THE ANSWER KEY FOR THIS PROBLEM
        $scope.answer = ['ev'+($scope.answer[0].newIndex+1),'ev'+($scope.answer[1].newIndex+1),'ev'+($scope.answer[2].newIndex+1)];
        return;
    };
    
    //CHECK THE TEST AGAINST THE ANSWER KEY AND ISSUE RESULTS
    $scope.go = function() {
        for (var i=0; i<2; i++){
            //IF ANY ANSWERS DON'T MATCH THAN IT IS WRONG    
            if ($scope.test[i] != $scope.answer[i]) {
                $scope.message = $scope.hint;
            } else {
                //IF ALL ANSWERS MATCH THEN IT IS CORRECT
                $scope.message = $scope.result;
            } 
            $scope.submit = true;
        }
    };
    
    //SORTABLE DRAG AND DROP FUNCTIONS
    var el = document.getElementById('items');
    var sortable = Sortable.create(el, {
        
        onUpdate: function (evt) {
            //SET THE NEW ORDER FOR THE TEST
            $scope.test = [evt.target.children[0].id,evt.target.children[1].id,evt.target.children[2].id];
            //CHANGE THE newIndex VALUE OF THE EVENT THAT WAS JUST MOVED
            if(evt.item.id == 'ev1')
                $scope.ev1.newIndex = evt.newIndex;
            if(evt.item.id == 'ev2')
                $scope.ev2.newIndex = evt.newIndex;
            if(evt.item.id == 'ev3')
                $scope.ev3.newIndex = evt.newIndex;
        }
    });
}])

.service('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    };
}])


// TINDER CARDS
.controller('TinderCardsCtrl', ['$scope', '$http', 'NytOpinion', 'NytWorld', function($scope, $http, NytOpinion, NytWorld) {
     $scope.cards = [];
     var resp = [];
     $scope.wrongAnswers = [];
     $scope.gameOver = false;
     $scope.score = 0;
     $scope.total = 10;
     $scope.turn = 0;
     NytOpinion.get(function(data){
        resp = data.results;
        $scope.addCards(resp.length, 'op');
    }); 
    NytWorld.get(function(data){
        resp = data.results;
        $scope.addCards(resp.length, 'world');
    }); 
    
    $scope.addCards = function(count, type) {
        for (var i = 0; i < 5; i++) {
            //$scope.addCard($scope.cards[i].headline, $scope.cards[i].lead_paragraph); 
            if(resp[i].title && resp[i].abstract) {
                var newCard = {title: resp[i].title, lead: resp[i].abstract, type:type, image:resp[i].multimedia[2], url: resp[i].url};    
                $scope.cards.push(newCard);
            }    
        }
        shuffle($scope.cards);
    };
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
	

	$scope.cardDestroyed = function(index) {
		$scope.cards.splice(index, 1);
	};

	$scope.transitionOut = function(card) {
		console.log('card transition out');
	};

	$scope.transitionRight = function(card) {
        //World News
        if (card.type=='world')
            {
                $scope.score++;
                $scope.turn++;
                $scope.rightAnswer = true;
                setTimeout($scope.rightAnswer = false, 2000);
            } else {
                $scope.turn++;
                $scope.wrongAnswers.push(card);
            }
        if($scope.turn = $scope.total)
            $scope.gameOver = true;
	};

	$scope.transitionLeft = function(card) {
        //Opinion
        if (card.type=='op')
            {
                $scope.score++;
                $scope.turn++;
                $scope.rightAnswer = true;
                setTimeout($scope.rightAnswer = false, 2000);
            } else {
                $scope.turn++;
                $scope.wrongAnswers.push(card);
            }
        if($scope.turn = $scope.total)
            $scope.gameOver = true;
	};
}])


// BOOKMARKS
.controller('BookMarksCtrl', ['$scope', '$rootScope', 'BookMarkService', '$state', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
}])

// SLIDER
.controller('SliderCtrl', ['$scope', '$http', '$ionicSlideBoxDelegate', function($scope, $http, $ionicSlideBoxDelegate) {

}])

// WORDPRESS
.controller('WordpressCtrl', ['$scope', '$http', '$ionicLoading', 'PostService', 'BookMarkService', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){

			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
}])

// WORDPRESS POST
.controller('WordpressPostCtrl', ['$scope', '$http', '$stateParams', 'PostService', '$ionicLoading', function($scope, $http, $stateParams, PostService, $ionicLoading) {

	$ionicLoading.show({
		template: 'Loading post...'
	});

	var postId = $stateParams.postId;
	PostService.getPost(postId)
	.then(function(data){
		$scope.post = data.post;
		$ionicLoading.hide();
	});

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
}])


.controller('ImagePickerCtrl', ['$scope', '$rootScope', '$cordovaCamera', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
}])


// LAYOUTS
.controller('LayoutsCtrl', ['$scope', function($scope) {

}])

// AUDIO CAPTURE
.controller('AudioCtrl', ['$scope', function($scope) {
    $scope.captureAudio = function () {
        // Launch device audio recording application,
        // allowing user to capture up to 2 audio clips
        console.log('foo');
        navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 2});
    };
}])
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  };
}])
.controller('CameraCtrl', function($scope, Camera) {
     $scope.captureSuccess = function (mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFile(mediaFiles[i]);
        }
    };

    // Called if something bad happens.
    //
    $scope.captureError = function (error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    };

    // A button will call this function
    //
    
    // Upload files to server
    $scope.uploadFile = function (mediaFile) {
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;

        ft.upload(path,
            "/upload.php",
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });
    };

    $scope.getPhoto = function() {
        Camera.getPicture().then(function(imageURI) {
          console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function(err) {
          console.err(err);
        }, {
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          saveToPhotoAlbum: false
        });
    };
});