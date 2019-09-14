class apiService {
    constructor() {}

    async getChemicalData(chemblID)
    {
      let response = await fetch('https://www.ebi.ac.uk/chembl/glados-es/chembl_molecule/_doc/' + chemblID);
      let data = await response.json()
      return data;
    }
}
