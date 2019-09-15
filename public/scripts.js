var diseaseColor = {
  "alzheimer" : "#F3C3FF",
  "hepatitis b" : "#90EAC8"
}

var apiservice = new apiService();

$(document).ready(function(){
  $("#greeting").text("Good " + timeOfDay() +", Researcher");



  $('#search').submit(function(e){
    e.preventDefault();
    chemical = $("#search-chemical").val().toUpperCase();
    console.log(chemical);
    getRecord(chemical).then(function(data){
      scrollToPoint("searchBarSection");
      if(data == undefined){
        $('#chemicalNameText').text('Sorry, we could not find your chemical 😕');
      } else {
        $('#chemicalNameText').text(data.Name);
      }
    });
  })
});

function showSearchBar(){
  let searchBar = document.getElementById('searchBarSection');
  if(searchBar.style.opacity == 0){
    searchBar.style.opacity = 1;
  }
}

// for (let m = 0; m < showMoreBtns.length; m++) {
//      // console.log("RU");
//      showMoreBtns[m].addEventListener("click", function () {
//          toggleHiddenInfo(m);
//          // toggleShowMore(showMoreBtns[m]);
//      });
// }
function toggleHiddenInfo(index) {
    if (hiddenInfos[index] != undefined) { //preventing crash
        if (hiddenInfos[index].style.maxHeight) {
            hiddenInfos[index].style.maxHeight = null;
        } else {
             hiddenInfos[index].style.maxHeight = hiddenInfos[index].scrollHeight + "px";
        }
    }
}


function changeCss(className, classValue) {
    // we need invisible container to store additional css definitions
    var cssMainContainer = $('#css-modifier-container');
    if (cssMainContainer.length == 0) {
        var cssMainContainer = $('<div id="css-modifier-container"></div>');
        cssMainContainer.hide();
        cssMainContainer.appendTo($('body'));
    }
    // and we need one div for each class
    classContainer = cssMainContainer.find('div[data-class="' + className + '"]');
    if (classContainer.length == 0) {
        classContainer = $('<div data-class="' + className + '"></div>');
        classContainer.appendTo(cssMainContainer);
    }
    // append additional style
    classContainer.html('<style>' + className + ' {' + classValue + '}</style>');
}


function scrollToPoint(id){
				var target = $('#' + id);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 800);
					return false;
				}
  }
