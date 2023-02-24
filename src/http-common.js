import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});

async function fetchInsurances() {
  const { data } = await axios.get(
    "http://localhost:3000/api/insurance/find-all"
  );
  return data;
}
