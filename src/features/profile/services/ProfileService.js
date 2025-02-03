import { endpoint } from "../../../config/config";

const ProfileService = {
  async getUserInfo(username) {
    const Endpoint = `${endpoint}/users/${username}`;
    const response = await fetch(Endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
  async getUserInfoById(id) {
    const Endpoint = `${endpoint}/users/id/${id}`;
    const response = await fetch(Endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
};

export default ProfileService;
