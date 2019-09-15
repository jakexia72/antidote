var apiservice = new apiService();
var diseaseBeingSearched;
var globalColor;
var spellCheckResult = '';

$(document).ready(function(){
  $("#greeting").text("Good " + timeOfDay() +", Researcher");
  $('#search').submit(function(e){
    e.preventDefault();
    chemical = $("#search-chemical").val();
    console.log(chemical);
    getRecord(chemical.toUpperCase()).then(function(data) {
      scrollToPoint("searchBarSection");
      if(data == undefined){
        $('#chemicalNameText').text('Sorry, we could not find your chemical 😕');
      } else {
        $('#chemicalNameText').text(data["Name"] + "'s likeliness to cure " + diseaseBeingSearched.replace('-',' '));
        produceResults(data);
      }
    });
  })
});

function produceResults(data){
  makeConfidenceScoreChart(data["bc_comb_score"], "scoreDonut-total", "Overall",globalColor);
  makeConfidenceScoreChart(data["bc_img_score"], "scoreDonut-images", "Structural",globalColor);
  makeConfidenceScoreChart(data["bc_feature_score"], "scoreDonut-features", "Characteristic",globalColor);
}

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
    if (hiddenInfos[index] != undefined) {
      //preventing crash
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


function scrollToPoint(id) {
  var target = $('#' + id);
  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 800);
    return false;
  }
}

function bestSuggestion(stringArray) {
  let highestScore = 0;
  let bestSuggestionString = "";

  for (item in stringArray) {
    if (stringArray[item].score > highestScore) {
      bestSuggestionString = stringArray[item].score;
    }
  }

  return bestSuggestionString;
}

function spellCheck(string) {
  let str = string;
  apiservice.getSpellCheck(str).then(function(data) {
    for (flaggedToken in data.flaggedTokens) {

      let bestSuggestion = "";
      let highestScore = 0;

      for (item in data.flaggedTokens[flaggedToken].suggestions) {
        if (data.flaggedTokens[flaggedToken].suggestions[item].score > highestScore) {
          bestSuggestion = data.flaggedTokens[flaggedToken].suggestions[item].suggestion;
        }
      }
      str = str.replace(data.flaggedTokens[flaggedToken].token, bestSuggestion);
      spellCheckResult = str;
      $('#spellCheckText').text('Did you mean ' + spellCheckResult.toLowerCase() + '?');
      $('#search-chemical').val(spellCheckResult.toLowerCase());
    }
  });
}
