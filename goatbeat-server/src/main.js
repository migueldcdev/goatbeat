const express = require('express')
const db = require('./dbops')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json());


app.get('/artists', async (req,res) => {

    data = await db.getArtists()
    res.send(data)
    
})

app.post('/artist', async (req,res) => {
    data = await db.getArtist("'" + req.body.address + "'")    
    res.json(data[0])
})

app.post('/handle', async(req, res) => {    
    
    isRegistred = await isAddressRegistered(req.body.address)

    if(isRegistred) {        
        res.json({'registered': 1, 'address': req.body.address})        
    } else {
        res.json({'registered': 0, 'address': req.body.address})
    }    
        
})

app.post('/addartist', async(req,res) => {    
    
    db.addArtist(req.body.address, req.body.name, req.body.description) 

    res.send(true)
})


isAddressRegistered = async (address) => {    
    
    data = await db.getAddresses() 
    
    arrayOfAdresses = await objectToValuesArray(data)
    
    if(arrayOfAdresses.includes(address)) {
        
        return true        
    } else {        
        
        return false
    }       
    
}

objectToValuesArray = (data) => {
    array = []
    
    for (let key in data) {
        array.push(data[key].address)            
    } 
    
    return array
}



app.listen(3000, () => {
    console.log("Api running on http://localhost:3000/")
})