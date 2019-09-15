


function makeDiseaseButton(doc){
  let diseaseButton = document.createElement('div');
  $(diseaseButton).addClass("disease-button panel panel-floating-button panel-pill");
  diseaseButton.setAttribute('data-id', doc.data().color);
  diseaseButton.setAttribute('data-id', doc.data().color);

  let gradient = "linear-gradient(to bottom left," + doc.data().color + "," + changeHue(doc.data().color,20) + ")";

  $(diseaseButton).css('background',gradient);
  let name = doc.data().name;
  $(diseaseButton).text(name);
  name = name.replace(/\s+/g, '-').toLowerCase();
  diseaseButton.id = name;
  $('#disease-buttons').prepend(diseaseButton);

  $('.disease-button').click(function(){
      console.log(lighten($(this).data('id'), 0.1))
      $('#greeting').text("Good " + timeOfDay() + ", " + $(this).text() + " Researcher");
      changeCss('body','background:'+ lighten($(this).data('id'), 60)  +' !important;');
      showSearchBar();
  })
}
