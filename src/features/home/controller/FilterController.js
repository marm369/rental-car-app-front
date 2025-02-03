import { FilterService } from "../service/FilterService"

const FilterController = {
  filterCars: async (filters) => {
    try {
      const filteredCars = await FilterService.applyFilters(filters)
      return filteredCars
    } catch (error) {
      console.error("FilterController: Error applying filters", error)
      throw new Error("Erreur lors de l'application des filtres sur les voitures")
    }
  },
}

export default FilterController

