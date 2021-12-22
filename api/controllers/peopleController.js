const axios = require('axios');
const _ = require('lodash');
axios.defaults.baseURL = "https://swapi.dev/api";

//List all
const list = async (req, res) => {
    const url = "/people";
    try {
        const response = await axios.get(url,{ params: req.query});
        let data = response.data;
        data = JSON.parse(JSON.stringify(data).replaceAll("https://swapi.dev/api",""));
        data.results = data.results.map((result) => ({
            ..._.pick(result,['name','url'])
        }));

        return res.status(200).json({
            success: true,
            message: 'People found!',
            data: data
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
        let data = await response.data;
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

        data = _.pick(data,[
            'name','height','mass', 'hair_color', 'skin_color', 'gender', 'birth_year',
            'homeworld.name', 'homeworld.terrain', 'homeworld.population','species', 'films',
        ]);

        data.films = data.films.map((f) => ({
            ..._.pick(f,['title','director','producer','release_date'])
        }));

        data.species = data.species.map((s) => ({
            ..._.pick(s,['name','average_lifespan','classification','language'])
        }));

        return res.status(200).json({
            success: true,
            message: 'Person found!',
            data: JSON.parse(JSON.stringify(data).replaceAll("https://swapi.dev/api",""))
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