const chemicalRef = db.collection("Chemicals")



db.collection('Diseases').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
    makeDiseaseButton(doc);
  });
});



async function getRecord(chemical) {
  if(chemical.toUpperCase().includes("CHEMBL")){
    return getByChembl(chemical.toUpperCase());
  } else {
    return getByName(chemical.toUpperCase());
  }
}

async function getByName(chemical){

  let str = chemical;
  let newstr = await apiservice.getSpellCheck(str);
  console.log(newstr);

    for (flaggedToken in newstr.flaggedTokens) {
      let bestSuggestion = "";
      let highestScore = 0;

      for (item in newstr.flaggedTokens[flaggedToken].suggestions) {
        if (newstr.flaggedTokens[flaggedToken].suggestions[item].score > highestScore) {
          bestSuggestion = newstr.flaggedTokens[flaggedToken].suggestions[item].suggestion;
        }
      }
      str = str.replace(newstr.flaggedTokens[flaggedToken].token, bestSuggestion);
      globalSpellCheckResult = spellCheckResult;
      console.log(spellCheckResult);

      // if (chemical.toLowerCase() != str.toLowerCase()){
      //   console.log("str: " + str);
      //   $('#spellCheckText').text(chemical + " was not found, showing results for " + str);
      //
    }

    let data = await chemicalRef.where('Name', '==', str.toUpperCase()).get();
    if(data.docs[0] != undefined){
      if (chemical.toLowerCase() != str.toLowerCase()){
        $('#spellCheckText').text(chemical + " was not found, showing results for " + str);
      }
      return data.docs[0].data();
    }
}

async function getByChembl(chemical){
  let data = await chemicalRef.where('ChEMBL ID', '==', chemical).get();
  if(data.docs[0] != undefined){
    return data.docs[0].data();
  }
}
