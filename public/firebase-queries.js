const chemicalRef = db.collection("Chemicals")

chemicalRef.doc("asN1Dtb7l0FzzDrWQ79Z").get().then((snapshot) => {
  let image = document.createElement('img');
  $(image).attr("src",snapshot.data().image);
  $('#results').append(image);
  console.log(snapshot.data().four);
});

db.collection('Diseases').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
    makeDiseaseButton(doc);
  });
});

async function getRecord(chemical) {
  if(chemical.includes("CHEMBL")){
    return getByChembl(chemical);
  } else {
    return getByName(chemical);
  }
}

async function getByName(chemical){
  let data = await chemicalRef.where('Name', '==', chemical).get();
  if(data.docs[0] != undefined){
    return data.docs[0].data();
  }
}

async function getByChembl(chemical){
  let data = await chemicalRef.where('ChEMBL ID', '==', chemical).get();
  if(data.docs[0] != undefined){
    return data.docs[0].data();
  }
}
