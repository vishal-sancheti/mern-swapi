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
        const response  = await axios.get(url);
        const data = await response.data;
        const homeWorld = await axios.get(data.homeworld);
        data.homeworld = homeWorld.data;
        for(let i=0; i< data.films.length; i++){
            const res = await axios.get(data.films[i]);
            data.films[i] = res.data;
        }
        for(let i=0; i< data.species.length; i++){
            const res = await axios.get(data.films[i]);
            data.species[i] = res.data;
        }
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

let processUrls;
processUrls = async (urls) => {
    let unresolved;
    unresolved = urls.forEach(async function (url, index) {
        const {data} = await axios.get(url);
        urls[index] = data;
    });
    return urls;
};

module.exports = {
    list,
    get
};