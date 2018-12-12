import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {
        
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            const limit = res.data.error;
            
            if(limit){
                throw new Error('Limit exceed!!!');
            } else{
                this.result = res.data.recipes;
            }
            
        } catch(error) {
            alert(error);
        }
    }
}

