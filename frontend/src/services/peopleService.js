import axios from "axios";

export class peopleService{
    // Get all People
    async list(data){
        const result = await axios.get("/api/people", {params: data});
        return result.data;
    };

    // Get all People
    async get(id){
        const result = await axios.get("/api/people/"+id);
        return result.data;
    };
}

export default new peopleService();