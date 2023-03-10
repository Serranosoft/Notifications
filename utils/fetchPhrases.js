import { supabase } from "../src/supabaseClient"

export default class fetchPhrases {
    
    static async getPhrasesLength(category) {
        const { data, count } =
            await supabase
                .from(category)
                .select('*', { count: 'exact' })
    
        return count;
    }
    
    static async getPhrases(arr, setArr, setArrLength, arrLength, category) {
        await supabase
            .from(`random_${category.toLowerCase()}`)
            .select("phrase")
            .range(arrLength, arrLength + 10)
            .then((res) => {
                if (arr.length < 1) {
                    setArr(res.data.map(phrase => phrase.phrase));
                } else {
                    setArr(arr.concat(res.data.map(phrase => phrase.phrase)))
                }
    
            })
        setArrLength(() => arrLength + 11);
    }

}


