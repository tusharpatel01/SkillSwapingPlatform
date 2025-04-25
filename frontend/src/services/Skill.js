import axios from 'axios';

const API_URL = 'http://localhost:8000/api/skills';

const getSkillSwaps = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createSkillSwap = async (swapData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, swapData, config);
  return response.data;
};

export { getSkillSwaps, createSkillSwap };