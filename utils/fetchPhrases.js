import { supabase } from "../src/supabaseClient"

export default class fetchPhrases {

    static async getPhrasesLength(category) {
        const { data, count } =
            await supabase
                .from(category)
                .select('*', { count: 'exact' })

        return count;
    }

    static async getPhrases(arr, updatedData, category) {
        await supabase
            .from(`random_${category.toLowerCase()}`)
            .select("phrase")
            .then((res) => {
                updatedData({phrasesArr: res.data.map(phrase => phrase.phrase)});
            })
    }

}


