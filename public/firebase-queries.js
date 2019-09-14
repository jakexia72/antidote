const chemicalRef = db.collection("Chemicals")

chemicalRef.doc("asN1Dtb7l0FzzDrWQ79Z").get().then((snapshot) => {
  let image = document.createElement('img');
  $(image).attr("src",snapshot.data().image);
  $('#results').append(image);
  console.log(snapshot.data().four);
});

function getRecord() {
  chemicalRef.where('Aromatic Rings', '==', '4').get().then((snapshot) => {
    console.log(snapshot.docs[0].data());
  });
}
