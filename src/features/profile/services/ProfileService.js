const API_BASE_URL = "http://192.168.27.154:5000/api";

const ProfileService = {
  async getUserInfo(username) {
    const endpoint = `${API_BASE_URL}/Authentication/user/${username}`;
    const response = await fetch(endpoint, {
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
