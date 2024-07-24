const axios = require("axios");
const API_KEY = process.env.API_KEY

const getCruxData = async(req, res) => {
  const {url, formFactor} = req.body
  axios.all(url.map((item)=>{return axios.post(`https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`, {formFactor: formFactor, origin: item}, {
    headers: {
      "Content-Type": "application/json",
    },
  })}))
  .then(res1=> {return res.status(200).send({status: true, data: res1.map(item => item.data), message: ""})})
  .catch(err=> {return res.status(404).send({status: false, data: [], message: `${err.response.data.error.message} for ${JSON.parse(err.response.config.data).origin}`})})
}

module.exports = {
    getCruxData
}