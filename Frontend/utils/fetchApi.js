import axios from "axios";


export const baseUrl = 'https://bayut.p.rapidapi.com'

// headers: {
//     'X-RapidAPI-Key': 'f507ee923amsh6c79c4cd7512175p196033jsne2258f924129',
//     'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
//   }

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': 'a571e7fa5emsh17c4c64a9e4ee5fp177405jsn53f82b2dd220',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });
    return data
}
