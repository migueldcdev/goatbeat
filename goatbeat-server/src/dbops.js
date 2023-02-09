const sqlite = require('sqlite3');
const db = new sqlite.Database('./src/creators.db');


const getArtists = () => {
    
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM user", (err, rows) => {
            
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

const getArtist = (address) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM user WHERE address=${address}`, (err, rows) => {
            
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

const getAddresses = () => {
    
    return new Promise((resolve, reject) => {
        db.all("SELECT address FROM user", (err, rows) => {
            
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


const addArtist = (address, name, description) => {
    
    const stmt = db.prepare("INSERT INTO user(id, address, name, description) VALUES(null,?,?,?);");     
            
    stmt.run(address, name, description);   

    stmt.finalize(); 
    
}
module.exports = {
    getArtists,
    getArtist,
    getAddresses,
    addArtist
}