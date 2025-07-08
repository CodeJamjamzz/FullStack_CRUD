import axios from 'axios'

export const getCatFacts = async (req, res) => {
    const factNumber = req.query.limit;
    try {
        const facts = await axios.get(`https://catfact.ninja/facts?limit=${factNumber}&max_length=140`)
        res.status(200).json(facts.data)
    } catch (err) {
        console.error('unable to retrieve data'. err)
        res.status(500).json({message: 'error has occured'})
    }
}