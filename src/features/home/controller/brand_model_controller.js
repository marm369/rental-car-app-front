import BrandModelService from '../service/brand_model_service';

class BrandModelController {
 async fetchBrands(setBrands) {
   try {
     const brands = await BrandModelService.getAllBrands();
     const formattedBrands = brands.map((brand) => ({
       id: brand.id,
       name: brand.name,
     }));
     setBrands(formattedBrands);
   } catch (error) {
     console.error('Failed to fetch brands:', error);
   }
 }


  async fetchModels(setModels) {
    try {
      const models = await BrandModelService.getAllModels();
      setModels(models);
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  }
}

export default BrandModelController;
