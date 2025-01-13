import axios from 'axios';
import { endpoint } from '../../../config/config';

class BrandModelService {
  async getAllBrands() {
    try {
      const response = await axios.get(`http://192.168.1.128:3000/brand/getAll`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  }

  async getAllModels() {
    try {
      const response = await axios.get(`http://192.168.1.128:3000/model/getAll`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }
}

export default new BrandModelService();
