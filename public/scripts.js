var apiservice = new apiService();
var diseaseBeingSearched;
var globalColor;
var spellCheckResult;
var chemName;
var shortFormDisease;

$(document).ready(function(){
  $("#greeting").text("Good " + timeOfDay() +", Researcher");

  $('#search').submit(function(e){
    clearSimilar();
    e.preventDefault();
    chemical = $("#search-chemical").val();
    console.log(chemical);
    getRecord(chemical).then(function(data) {
      scrollToPoint("searchBarSection");
      console.log("search:" + data);
      if(data == undefined){
        $('#chemicalNameText').text('Sorry, we could not find your chemical 😕');
        hideResults();
      } else {
       chemName = (data["Name"] ? data["Name"]:data["ChEMBL ID"])
        $('#chemicalNameText').text(chemName + "'s likeliness to cure " + diseaseBeingSearched.replace('-',' '));
        // produceResults(data);
        showResults(data);
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

function showResults(data){
  let image = document.createElement('img');
  $(image).attr("src",data.Images);
  $(image).css("width", "100%");

  let confidenceScoreFeatures;
  let confidenceScoreImg;
  let confidenceScoreTotal;

console.log(diseaseBeingSearched);
  if(diseaseBeingSearched == "Hepatitis B"){
    shortFormDisease = 'hb';

  } else if(diseaseBeingSearched == "Breast Cancer"){
    shortFormDisease = 'bc';

  }
  confidenceScoreFeatures = data[shortFormDisease + '_yes_tab'];
  confidenceScoreImg = data[shortFormDisease + '_yes_img'];
  confidenceScoreTotal = (parseFloat(confidenceScoreImg) + parseFloat(confidenceScoreFeatures))/2;

  if(confidenceScoreTotal > 0.5){
    $(viability).html(chemName.toLowerCase() + ' is a potentially <span style="color:#00cc78;">viable</span> treatment for ' + diseaseBeingSearched);
  } else {
    $(viability).html(chemName.toLowerCase() + ' is <span style="color:#FF376D;">not recommended</span> for treatment of ' + diseaseBeingSearched);

  }

  makeConfidenceScoreChartOverall(confidenceScoreTotal, "scoreDonut-total", "Overall",globalColor);
  makeConfidenceScoreChartImg(confidenceScoreImg, "scoreDonut-images", "Structural",globalColor);
  makeConfidenceScoreChartFeatures(confidenceScoreFeatures, "scoreDonut-features", "Characteristic",globalColor);

  $('#results').html(image);

  $('#ChemID').html("<b>Chembl ID: </b>" + data["ChEMBL"]);
  $('#pubchemID').html("<b>PubChem ID: </b>" + data["CID"]);
  $('#formula').html("<b>Molecular Formula: </b>" + data["Molecular Formula"]);
  $('#MolecularWeight').html("<b>Molecular Weight: </b>" + data["Molecular Weight"] + " amu");
  $('#AcidBase').html("<b>Molecular Species: </b>" + data["Molecular Species"]);
  $('#AromaticRings').html("<b>Aromatic Rings: </b>" + data["Aromatic Rings"]);
  $('#RotableBonds').html("<b>Rotable Bonds: </b>" + data["Num Rotatable Bonds"]);
  $('#BioActivity').html("<b>Bioactivities: </b>" + (data["Bioactivities"] ? data["Bioactivities"] : "none") );
  $('#PassesRof5').html("<b>Num Rof5 Violations: </b>" + data["Num RO5 Violations"]);
  $('#molType').html("<b>Type: </b>" + data["Type"]);
  $('#MaxPhase').html("<b>Max Phase: </b>" + data["Max Phase"]);
  $('#PassesRof5').html("<b>Num Rof5 Violations: </b>" + data["Num RO5 Violations"]);
  // $('#Smiles').html("<b>Smiles: </b>" + data["Smiles"]);

  apiservice.getSimilarCompounds(data['ChEMBL ID']).then(function(d){
    console.log(d);
    if(d.molecules.length == 0){
      $('#simheading').text("No similar compounds found in database");
    }
    d.molecules.forEach(mol =>{
      getByChembl(mol.molecule_chembl_id).then(function(r){
        if (r != undefined){
          console.log('it went in the loop');
           console.log(r[shortFormDisease + '_yes_tab'])
          makeSimilarPanel(mol.molecule_chembl_id, r[shortFormDisease + '_yes_tab'],r[shortFormDisease + '_yes_img'], r['Images']);
        }
      });

    })
  });


  let resultsSection = document.getElementById('resultsSection');
  if(resultsSection.style.opacity == 0){
    resultsSection.style.opacity = 1;
  }
}
function hideResults(){
  let resultsSection = document.getElementById('resultsSection');
  if(resultsSection.style.opacity == 1){
    resultsSection.style.opacity = 0;
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

function clearUI(){
  $('#search')[0].reset();
  $('#chemicalNameText').html(" ");
  $('#spellCheckText').html(" ");
}

function clearSimilar(){
  $('#similarResults').html(" ");
  $('#simheading').html("Similar Compounds");
}


var globalSpellCheckResult

async function spellCheck(string){
  let untouched = string;
  let str = string;
  let newstr = await apiservice.getSpellCheck(str).then(function(data) {
    for (flaggedToken in data.flaggedTokens) {
      let bestSuggestion = "";
      let highestScore = 0;

      for (item in data.flaggedTokens[flaggedToken].suggestions) {
        if (data.flaggedTokens[flaggedToken].suggestions[item].score > highestScore) {
          bestSuggestion = data.flaggedTokens[flaggedToken].suggestions[item].suggestion;
        }
      }
      str = str.replace(data.flaggedTokens[flaggedToken].token, bestSuggestion);
      globalSpellCheckResult = spellCheckResult;
      console.log(spellCheckResult);
      console.log("untouched:" + untouched);
      if (untouched.toLowerCase() != str.toLowerCase()){
        console.log("str: " + str);
        $('#spellCheckText').text('Did you mean ' + str + '?');
      }
      return str;
    }
  });
  return newstr
}
