// This code is meant to get neccessary credentials from the location url, get user inputs, update DOM and database. 



//Run in Client

if (Meteor.isClient){
	function gup(parameter) { 
  		var loc = location.search.substring(1, location.search.length);
	  	var param_value = false;

  		var params = loc.split("&");
  	for (i=0; i<params.length;i++) {
     		 param_name = params[i].substring(0,params[i].indexOf('='));
     	 if (param_name == parameter) {
          param_value = params[i].substring(params[i].indexOf('=')+1)
      }
  }
  if (param_value) {
      return param_value;
  }
  else {
      return false; //Here determine return if no parameter is found
  }
}
	var  title = gup('title');

	var  title = title.replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ");
	var  imgsrc = gup('imgsrc');
	var username = document.getElementById("#textinput1").val();
	//var movie_name = $(input#textinput2).val();
	var story = document.getElementById("#textarea1").val();
	reviews = new Meteor.Collections("reviews");
	Meteor.subscribe("reviews");

	Template.reviews.all = function(){
	
		return reviews.find({});
	};
	
	Template.title.movietitle = function(){
	
		return title;
	
	}
	Template.src.image = function(){
		return imgsrc;
	}
	$(".button").click(function(){
		Session.set("user", username);
		Session.set("review", story);
	});
	Meteor.render(function(){
		return Template.reviewList({user: session.get("user"), review: session.get("review")});
	})
}



//Runs in server


	
if (Meteor.isServer){
	Meteor.startup(function() {
		reviews = new Meteor.Collections("reviews");
	
		if (!reviews.find({}).count()){
	
			reviews.insert({'name':Session.get("user"), 'review':Session.get("review"), 'movietitle':title, 'image':imagesrc});
	
		}
	Meteor.publish("reviews");
	});
	}
	

