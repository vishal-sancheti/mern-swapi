const axios = require('axios');
axios.defaults.baseURL = "https://swapi.dev/api";

//List all
const list = async (req, res) => {
    const url = "/people";
    try {
        const response = await axios.get(url,{ params: req.query});
        return res.status(200).json({
            success: true,
            message: 'People found!',
            data: JSON.parse(JSON.stringify(response.data).replaceAll("https://swapi.dev/api",""))
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
};

//Get document by ID
const get = async (req, res) => {
    let url = "/people/"+req.params.id;
    try {
        const response = await axios.get(url);
        return res.status(200).json({
            success: true,
            message: 'Person found!',
            data: JSON.parse(JSON.stringify(response.data).replaceAll("https://swapi.dev/api",""))
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
};

module.exports = {
    list,
    get
};