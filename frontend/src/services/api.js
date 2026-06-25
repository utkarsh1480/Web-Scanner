import axios from 'axios';

export async function analyzeWebsite(url) {
    const response = await axios.post("http://localhost:3000/api/analyze", { url });
    return response.data;
}
