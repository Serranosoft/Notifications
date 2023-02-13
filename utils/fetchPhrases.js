import { supabase } from "../src/supabaseClient"

export default class fetchPhrases {
    
    static async getPhrasesLength(category) {
        const { data, count } =
            await supabase
                .from(category ? category : "All")
                .select('*', { count: 'exact' })
    
        return count;
    }
    
    static async getPhrases(arr, setArr, setArrLength, arrLength, category) {
        await supabase
            .from(category ? category : "All")
            .select("phrase")
            .range(arrLength, arrLength + 3)
            .then((res) => {
                if (arr.length < 1) {
                    setArr(res.data);
                } else {
                    setArr(arr.concat(res.data))
                }
    
            })
        setArrLength(() => arrLength + 4);
    }

}


