// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCBM3szL9wRc_PWN9zMooYrM2SJ1SpdSrI",
  authDomain: "dummychem.firebaseapp.com",
  databaseURL: "https://dummychem.firebaseio.com",
  projectId: "dummychem",
  storageBucket: "dummychem.appspot.com",
  messagingSenderId: "857139057713",
  appId: "1:857139057713:web:45688c4560b950d2157110"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
