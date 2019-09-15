class apiService {

    myHeaders = new Headers();

    constructor() {
      this.myHeaders.append('Content-Type', 'text/json');
      // Enter Azure API Subscription Key here
      this.myHeaders.append('Ocp-Apim-Subscription-Key', '7665726594074296bcfea3d66a4a4288');
    }

    async getChemicalData(chemblID)
    {
      let response = await fetch('https://www.ebi.ac.uk/chembl/glados-es/chembl_molecule/_doc/' + chemblID);
      let data = await response.json();
      return data;
    }

    async getSimilarCompounds(chemblID) {
      let response = await fetch('https://www.ebi.ac.uk/chembl/api/data/similarity.json?limit=10&offset=0&only=molecule_chembl_id&similarity=85&chembl_id=' + chemblID);
      let data = await response.json();
      return data;
    }

    async getSpellCheck(text) {
      let options = {
        method: 'GET',
        headers: this.myHeaders
      };
      let response = await fetch('https://antidotespellchecker.cognitiveservices.azure.com/bing/v7.0/spellcheck?text=' + text, options);
      let data = await response.json();
      return data;
    }
}
