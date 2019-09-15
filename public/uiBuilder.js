


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
      hideResults();
      clearUI();
  })
}

function makeSimilarPanel(chemblID, img, fea, url){
  let ov = (parseFloat(img) + parseFloat(fea))/2;

  let panel = document.createElement('div');
  $(panel).addClass("panel");
  $(panel).css('max-width', "220px")

  let newId = document.createElement('h4');
  $(newId).text(chemblID);

  let desc = document.createElement('p');
  $(desc).text("Overall Confidence: " + (ov * 100).toFixed(2) + "%");

  let image = document.createElement('img');
  $(image).css("height", "200px");
  $(image).attr("src",url);

  $(panel).append(newId);
  $(panel).append(image);
  $(panel).append(desc);

  $('#similarResults').append(panel);
}



function makeConfidenceScoreChartOverall(score, id, scoreType, color){
  console.log(scoreType);
  let confidenceScoreChartOverall;
  let ctx = document.getElementById(id).getContext('2d');

  let notConfident = 1 - score;
  confidenceScoreChartOverall = new Chart(ctx, {
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

function makeConfidenceScoreChartImg(score, id, scoreType, color){
  console.log(scoreType);
  let confidenceScoreChartImg;
  let ctx = document.getElementById(id).getContext('2d');

  let notConfident = 1 - score;
  confidenceScoreChartImg = new Chart(ctx, {
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

function makeConfidenceScoreChartFeatures(score, id, scoreType, color){
  console.log(scoreType);
  let confidenceScoreChartFeatures;
  let ctx = document.getElementById(id).getContext('2d');

  let notConfident = 1 - score;
  confidenceScoreChartFeatures = new Chart(ctx, {
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
