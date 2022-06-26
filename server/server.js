const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

var allowedDomains = ['https://domial.waproks.de', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const responseMsg = (success, message) => {
    return {
        success,
        message
    };
}

const openMySql = () => {

    return new Promise((resolve, reject) => {

        const connection = mysql.createConnection({
            host: 'mysqlf99a.netcup.net',
            user: 'k6848_yannici',
            password: 'dPud41?4',
            database: 'k68484_domial'
        });

        connection.connect(e => {
            if (e) {
                reject("Error on connection to mysql host.");
                return;
            }

            resolve(connection);
        });

    });

};

app.post('/savereg', async (req, res) => {
    const checkNameExists = (db, name) => {

        return new Promise((resolve, reject) => {
    
            db.query("SELECT * FROM registrations WHERE LOWER(name) = ?", [name.toLowerCase()], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                resolve(result.length > 0);
            });
    
        });
    
    }
    
    const saveRegistration = (db, name, attend) => {

        return new Promise((resolve, reject) => {

            db.query("INSERT INTO registrations (name, participation) VALUES (?, ?)", [name, attend], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(true);
            });

        });

    };

    let db;

    // Eingegebene Daten ermitteln
    if (!req.body.name) {
        res.json(responseMsg(false, "Bitte einen Namen angeben."));
        return;
    }

    if (req.body.attend === undefined || (req.body.attend !== "0" && req.body.attend !== "1")) {
        res.json(responseMsg(false, "Bitte angeben, ob teilgenommen wird oder nicht."));
        return;
    }

    try {
        db = await openMySql();

        let nameExists = await checkNameExists(db, req.body.name);
        if (nameExists) {
            res.json(responseMsg(false, "Unter diesem Namen wurde bereits eine Anmeldung abgeschickt."));
            return;
        }

        await saveRegistration(db, req.body.name, parseInt(req.body.attend));

        let successMsg = "Danke für deine Anmeldung!";

        if (req.body.attend === 0) {
            successMsg = successMsg + " Schade, dass du nicht dabei sein kannst.";
        }
        
        res.json(responseMsg(true, successMsg));
    } catch (message) {
        console.error(message);
        res.json(responseMsg(false, message));
    } finally {
        db?.end();
    }
});

app.get('/registrations', async (req, res) => {
    let db;

    try {
        db = await openMySql();

        db.query("SELECT * FROM registrations ORDER BY timestamp DESC", (err, result) => {
            if (err) {
                res.json(responseMsg(false, "Fehler beim Laden der Anmeldungen."));
                return;
            }

            res.json(responseMsg(true, result));
        });
    } catch (message) {
        console.error(message);
        res.json(responseMsg(false, message));
    } finally {
        db?.end();
    }
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});