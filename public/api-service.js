class apiService {
    constructor() {}

    async getChemicalData(chemblID)
    {
      let response = await fetch('https://www.ebi.ac.uk/chembl/glados-es/chembl_molecule/_doc/' + chemblID);
      let data = await response.json()
      return data;
    }

    async getSimilarCompounds(chemblID) {
      let response = await fetch('https://www.ebi.ac.uk/chembl/api/data/similarity.json?limit=10&offset=0&only=molecule_chembl_id&similarity=85&chembl_id=' + chemblID);
      let data = await response.json();
      return data;
    }
}
