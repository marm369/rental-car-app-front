class AgencyModel {
  constructor(id, name, description, imageBase64, location, userId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageBase64 = imageBase64;
    this.location = location;
    this.userId = userId;
  }
}

export default AgencyModel;
