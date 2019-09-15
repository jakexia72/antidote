

let object = {
  "Content-Type":"text/json",
  "Ocp-Apim-Subscription-Key":"70942c4d30d3484aade3972f49ecdeea"
}

class apiService {


    constructor() { }

    async getChemicalData(chemblID)
    {
      let response = await fetch('https://www.ebi.ac.uk/chembl/glados-es/chembl_molecule/_doc/' + chemblID);
      let data = await response.json();
      return data;
    }

    async getSimilarCompounds(chemblID) {
      let response = await fetch('https://www.ebi.ac.uk/chembl/api/data/similarity.json?limit=3&offset=0&only=molecule_chembl_id&similarity=75&chembl_id=' + chemblID);
      let data = await response.json();
      return data;
    }

    async getSpellCheck(text) {
      let options = {
        method: 'GET',
        headers: object
      };
      let response = await fetch('https://antidotespellchecker.cognitiveservices.azure.com/bing/v7.0/spellcheck?text=' + text, options);
      let data = await response.json();
      return data;
    }
}
