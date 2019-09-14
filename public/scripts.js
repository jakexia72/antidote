var diseaseColor = {
  "alzheimer" : "#F3C3FF",
  "hepatitis b" : "#90EAC8"
}

var apiservice = new apiService();

$(document).ready(function(){

  $("#greeting").text("Good " + timeOfDay() +", Researcher");

  $(".disease-button").click(function(){
      //trigger something
      // console.log(this.data('id'))
      $('#greeting').text("Good " + timeOfDay() + ", " + $(this).text() + " Researcher");
      changeCss('body','background:'+   diseaseColor[$(this).data('id')] +' !important;')
  })
})


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

  function formSubmit(event) {
    event.preventDefault();
    chemical = $("#search-chemical").val();

    getRecord();
  //   apiservice.getChemicalData("CHEMBL4116665").then(function(data){
  //     console.log(data);
  //  });
   
  }