


function makeDiseaseButton(doc){
  let diseaseButton = document.createElement('div');
  $(diseaseButton).addClass("disease-button panel panel-floating-button panel-pill");
  diseaseButton.setAttribute('data-id', doc.data().color);
  diseaseButton.setAttribute('data-name', doc.data().name);

  let gradient = "linear-gradient(to bottom left," + doc.data().color + "," + changeHue(doc.data().color,20) + ")";

  $(diseaseButton).css('background',gradient);
  let name = doc.data().name;
  $(diseaseButton).text(name);
  name = name.replace(/\s+/g, '-').toLowerCase();
  diseaseButton.id = name;
  $('#disease-buttons').prepend(diseaseButton);

  $('.disease-button').click(function(){
      console.log(lighten($(this).data('id')))
      $('#greeting').text("Good " + timeOfDay() + ", " + $(this).text() + " Researcher");
      changeCss('body','background:'+ lighten($(this).data('id'), 60)  +' !important;');
      diseaseBeingSearched = this.getAttribute('data-name');
      globalColor = $(this).data('id');
      showSearchBar();
      console.log(diseaseBeingSearched);
  })
}



  function makeConfidenceScoreChart(score, id, scoreType, color){
    console.log(scoreType);
    let confidenceScoreChart;
    let ctx = document.getElementById(id).getContext('2d');

    let notConfident = 1 - score;
    confidenceScoreChart = new Chart(ctx, {
      type:'doughnut',
      data: {
        labels: ["", ""],
        datasets: [{
          label: 'time',
          backgroundColor: ["lightgrey",color],
          data: [notConfident,score]
        }]
      },
      options: {
        cutoutPercentage: 90,
        responsive: true,
        legend:{
          display: false
        },
        tooltips: {
          enabled: false
        },
        hover: {mode: null},
        plugins:{
          doughnutlabel:{
            labels: [
            {
              text: scoreType,
              font: {
                size: '50'
              },
              color: 'grey'
            },
            {
              text: (100 * score).toFixed(2) + "%",
              font: {
                size: '100',
                weight: 'bold'
              },
              color: 'black'
            },
            {
              text: "Confidence",
              font: {
                size: '50'
              },
              color: 'grey'
            }]
          }
        }
      }
    })
  }
