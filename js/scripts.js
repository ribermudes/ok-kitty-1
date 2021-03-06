var kitties = [];
var catnames = ["Chairman Meow", "Lulu", "June", "Penny", "Queen Gwendolyn", "Hazel", "Huxley", "Meow Ming", "Buffy", "Mittens", "Keith", "Todd", "Chad", "Goober", "Randy", "Kat"];
var catpictures = ["img/lordweber.jpg", "img/lulu.jpg", "img/otto.jpg", "img/face-paw.jpg", "img/fluffybutt.jpg", "img/crosseyedcat.jpg", "img/huxley.jpg", "img/meowming.jpg", "img/cat-on-laptop.jpg", "img/derpcat.jpg", "img/tuxedo.jpeg", "img/winkingcat.jpg", "img/catpals.jpg", "img/keith.jpg", "img/ladymeowingtons.jpg", "img/ladymeowtingtons2.jpg"]

function kittyCat() {
  for(var i=0; i<=1; i++) {
    for(var j=0; j<=1; j++) {
      for(var k=0; k<=1; k++) {
        for(var l=0; l<=1; l++) {
          var kittyName = catnames[i+(2*j)+(4*k)+(8*l)]
          var cats=true;
          var kids=true;
          var indoor=true;
          var health=true;
          if(i===0) {
            cats=false;
          }
          if(j===0) {
            kids=false;
          }
          if(k===0) {
            indoor=false;
          }
          if(l===0) {
            health=false;
          }
          var age = 1+(4*l)+Math.floor((5*Math.random())+1);
          var disposition = Math.floor((11*Math.random())-5);
          var fluff = Math.floor((11*Math.random())-5);
          var img = catpictures[Math.floor(catpictures.length*Math.random())]
          var Kitten = new Kitty(kittyName, cats, kids, indoor, age, health, img, disposition, fluff);
          kitties.push(Kitten);
        }
      }
    }
  }
}

function kittiesBrowseDisplay (catarray) {
  $(".browsecats").empty()
  for (i=0; i<catarray.length; i++) {
    var catName=kitties[i].kittyName;
    var catImg=kitties[i].img;
    var catAge=kitties[i].age;
    var catString = (catName + " is a precious " + catAge + " year old and " + kitties[i].beWithCatsString()) + ".  " + catName + " " + (kitties[i].beWithKidsString()) + ".  " + "They prefer " + (kitties[i].indoorString()) + ".  " + catName + " " +  (kitties[i].healthString()) + ".";
    $(".browsecats").append("<div class='col-sm-6 col-md-4'> <div class='thumbnail'> <img class='.img-responsive' src=" + catImg + " alt='a kitty'> <div class='caption'> <h3>" +catName+ "</h3> <div class='adopt-display'>" + catString + "  </div> <button type='button' class='adoption-button'>Adopt Me!</button> </div> </div> </div>");
  };
};

function altKitties(list, remainingCats) {
  for (var i=0 ; i<remainingCats.length ; i++) {
    list.append("<li><span class='altcat' choice="+i+">"+remainingCats[i][0].kittyName+"</span></li>");
  }
}

function adoptCat(name) {
  adoptedCatIndex=kitties.findIndex(function(cat){
    if(cat.kittyName===name) {
      return true;
    }
  });
  kitties.splice(adoptedCatIndex,1);
}

function displayCatInfo(yourCat, index) {
  $(".cat-name").text(yourCat[index][0].kittyName)
  $(".cat-picture").html('<img src="'+yourCat[index][0].img+'" class="img-thumbnail" width="304" height="236" alt=your cat>')
  $(".cat-age").text(yourCat[index][0].age);
  $(".cat-other-cats").text(yourCat[index][0].beWithCatsString());
  $(".cat-kids").text(yourCat[index][0].beWithKidsString());
  $(".cat-indoor-pref").text(yourCat[index][0].indoorString());
  $(".cat-health").text(yourCat[index][0].healthString());
  $(".cat-disposition").text(yourCat[index][0].disposition);
  $(".cat-fluff").text(yourCat[index][0].fluff);
}

function User(firstName, lastName, haveCats, haveKids, userDOB, isIndoor, age, health, userDisposition, userFluff) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.haveCats = haveCats;
  this.haveKids = haveKids;
  this.dob = userDOB;
  this.isIndoor = isIndoor;
  this.health = health;
  this.age = age;
  this.disposition=userDisposition;
  this.fluff=userFluff;
}

User.prototype.fullName = function() {
  var fullName=this.firstName+" "+this.lastName;
  return fullName;
}

User.prototype.match = function(catArr) {
  matchedKitties=[];
  for(var i=0; i<catArr.length; i++) {
    var matchScore = Math.pow(catArr[i].age-this.age,2) + Math.pow(catArr[i].fluff-this.fluff,2) +  Math.pow(catArr[i].disposition-this.disposition,2);
    var excluded=((!catArr[i].canBeWithKids) && (this.haveKids==="Yes")) || ((!catArr[i].canBeWithCats) && (this.haveCats==="Yes")) || ((catArr[i].healthIssues) && (this.health==="No"))||((catArr[i].isIndoor) && (this.isIndoor==="outdoors"));
    if (!excluded) {
      matchedKitties.push([catArr[i],matchScore]);
    }
  }
  matchedKitties.sort(function (a,b) {
    if(a[1]-b[1]>0) {
      return 1;
    } else if (a[1]-b[1]<0) {
      return -1;
    } else {
      return 0;
    }
  });
  return matchedKitties;
}

function Kitty(kittyName, canBeWithCats, canBeWithKids, kittyIsIndoor, kittyAge, kittyHealth, kittyImg, kittyDisposition, kittyFluff) {
  this.kittyName = kittyName;
  this.canBeWithCats = canBeWithCats;
  this.canBeWithKids = canBeWithKids;
  this.isIndoor = kittyIsIndoor;
  this.age = kittyAge;
  this.healthIssues = kittyHealth;
  this.img = kittyImg;
  this.disposition=kittyDisposition;
  this.fluff=kittyFluff;
}

Kitty.prototype.beWithCatsString = function() {
  if(this.canBeWithCats) {
    var canBeWithCatsString= "gets along well with other kitties"
  } else {
    canBeWithCatsString= "needs to be the only kitty in the house"
  }
  return canBeWithCatsString;
}

Kitty.prototype.beWithKidsString = function() {
  if(this.canBeWithKids) {
    var canBeWithKidsString= "can live with children"
  } else {
    canBeWithKidsString= "does not do well with children"
  }
  return canBeWithKidsString;
}

Kitty.prototype.indoorString = function() {
  if(this.isIndoor) {
    var indoorString= "the indoors"
  } else {
    indoorString= "the great outdoors"
  }
  return indoorString;
}

Kitty.prototype.healthString = function() {
  if(this.healthIssues) {
    var hasHealthIssuesString = "has some health issues and will need regular visits with the vet"
  } else {
    hasHealthIssuesString = "doesn't have any major health issues but should still be taken to the vet to stay healthy"
  }
  return hasHealthIssuesString
}

$(document).ready(function() {
  kitties=[];
  kittyCat();
  kittiesBrowseDisplay(kitties);
  $("#adopter-input").submit(function(event){
    event.preventDefault();
    $("ol#other-cats li").remove();
    var userFirstName=$("input#firstName").val();
    var userLastName=$("input#lastName").val();
    var userDOB=$("input#userBirthDate").val();
    var userHaveCats=$("#userHaveCats").val();
    var userHaveKids=$("#userHaveKids").val();
    var userIsIndoor=$("input:radio[name=indoorOutdoor]:checked").val();
    var userCatAge=parseInt($("input#userCatAge").val());
    var userCatHealth=$("#userCatHealth").val();
    var userPersonality=parseInt($("#userPersonality").val());
    var userPolitics=parseInt($("#userPolitics").val());
    var userBeach=parseInt($("#userBeach").val());
    var userMovie=parseInt($("#userMovie").val());
    var userFood=parseInt($("#userCuisine").val());
    var userFluff=userPersonality+userBeach+userFood+userMovie;
    var userDisposition=userPolitics+userBeach+userFood-userMovie;
    var User1=new User(userFirstName, userLastName, userHaveCats, userHaveKids, userDOB, userIsIndoor, userCatAge, userCatHealth, userDisposition, userFluff);
    var yourCat=User1.match(kitties);
    var index=0;
    var bestCat=yourCat[index][0];
    altKitties($("ol#other-cats"),yourCat)
    displayCatInfo(yourCat, index);

    if (userFirstName === "" || userLastName === "" || userDOB === "" || isNaN(userCatAge)) {
      alert("Please complete all of the questions.")
    } else {
      $("#cat-display").show();
      $(".altcat").click(function(event) {
        event.preventDefault();
        index = $(this).attr("choice");
        $("#cat-display").show();
        displayCatInfo(yourCat, index);
      });

      $("button#adopt-this-cat").unbind().click(function(event){
        event.preventDefault();
        $("ol#other-cats li").remove();
        $("#adoption-success").show();
        $("#advanced-cat-questions").hide();
        $("#cat-display").hide();
        console.log(index)
        var adoptedName=yourCat[index][0].kittyName;
        adoptCat(adoptedName);
        kittiesBrowseDisplay(kitties);
      });
    };
  });
  $("button#adoption-reset").click(function(event){
    event.preventDefault();
    $("#adoption-success").hide();
    $("#user-info").show();
    $("#user-info").find("input").val("");
    $("#basic-cat-info").find("input").val("");
    $("#advanced-cat-questions").find("input").val("");
  });
  $("button#user-to-basic").click(function(event) {
    event.preventDefault();
    $("#user-info").hide();
    $("#basic-cat-info").show();
  });
  $("button#basic-to-user").click(function(event) {
    event.preventDefault();
    $("#user-info").show();
    $("#basic-cat-info").hide();
  });
  $("button#basic-to-advanced").click(function(event) {
    event.preventDefault();
    $("#advanced-cat-questions").show();
    $("#basic-cat-info").hide();
  });
  $("button#advanced-to-basic").click(function(event) {
    event.preventDefault();
    $("#advanced-cat-questions").hide();
    $("#basic-cat-info").show();
  });
  $("form#rehome-input").submit(function(event){
    event.preventDefault();
    var catName=$("input#catName").val();
    var catAge=parseInt($("input#catAge").val());
    var catHealth=($("#catHealth").val()==="Yes");
    var otherCatsGood=($("#otherCatsGood").val()==="Yes");
    var humorsKids=($("#humorsKids").val()==="Yes");
    var catDeClawed=($("#catDeClawed").val()==="Yes");
    var moreInfo=$("#moreInfo").val();
    var disposition = Math.floor((11*Math.random())-5);
    var fluff = Math.floor((11*Math.random())-5);
    var img = catpictures[Math.floor(catpictures.length*Math.random())]
    var rehomedKitten = new Kitty(catName, otherCatsGood, humorsKids, catDeClawed,
       catAge, catHealth, img, disposition, fluff);
    if (isNaN(catAge)) {
      alert("Please enter an age for your cat.")
    } else {
    $("#kittyCatName").text(catName);
    $("#kittyCatAge").text(catAge);
    $("#kittyCatHealth").text(catHealth);
    $("#kittyOtherCatsGood").text(otherCatsGood);
    $("#kittyHumorsKids").text(humorsKids);
    $("#kittyDeClawed").text(catDeClawed);
    $("#kittyMoreInfo").text(moreInfo);
    $("#rehome-output").show();
    $("#rehome-form").hide();
    kitties.push(rehomedKitten)
    kittiesBrowseDisplay(kitties);
    }
  });
  $(".rehome-reset").click(function(event){
    event.preventDefault();
    $("#rehome-form").show();
    $("#rehome-output").hide();
    $("input#catName").val("");
    $("#moreInfo").val("");
    $("input#catAge").val("");
  });
  $(".rehome-button").click(function(event){
    event.preventDefault();
    $("#rehome-page").show();
    $("#browse-page").hide();
    $("#landing-page").hide();
    $("#adoption-page").hide();
  });
  $(".adoption-button").click(function(event){
    event.preventDefault();
    $("#rehome-page").hide();
    $("#browse-page").hide();
    $("#landing-page").hide();
    $("#adoption-page").show();
  });
  $(".browse-button").click(function(event){
    event.preventDefault();
    $("#rehome-page").hide();
    $("#adoption-page").hide();
    $("#landing-page").hide();
    $("#browse-page").show();
  });
  $(".landing-button").click(function(event){
    event.preventDefault();
    $("#rehome-page").hide();
    $("#adoption-page").hide();
    $("#browse-page").hide();
    $("#landing-page").show();
  });
});
