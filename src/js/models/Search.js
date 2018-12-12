import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {

        const key = '676fe48261b6f3e4141d21115cb984bf';
    
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch(error) {
            alert(error);
        }
    }
}

