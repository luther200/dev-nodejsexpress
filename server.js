const express = require('express'); 
const app = express();

const ports = {
    "dev": 8383,
    "real": 8000
};

const currentEnv = process.env.NODE_ENV || "dev";
const PORT = ports[currentEnv];

let data = ["john"]; 

app.use(express.json());

console.log(`RUNNING IN ${currentEnv.toUpperCase()} MODE`);

app.get('/', (req, res) => {
    console.log(req.method);
    res.send('<a href=http://localhost:8383/api/data> API </a>');
});

app.get('/dashboard', (req, res) => {
    console.log(req.method);
    res.status(200)
        .send(`
            <body style="background:pink;">
            <h1 style="color:gray;">Data:</h1>
                <p>${JSON.stringify(data)}</p>
            </body>            
            `)
});

app.get('/api/data', (req, res) => {
    console.log('/api/data, method=GET')
    res.status(200).send(data);
});

app.post('/api/data', (req, res) => {
    console.log('/api/data, method=POST')
    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name);
    res.sendStatus(201);

})

app.delete('/api/data', (req, res) =>{
    console.log('/api/endpoint, method=DELETE')
    data.pop()
    res.sendStatus(203)
})

app.listen(PORT, () => {
    console.log(`Server started on : http://localhost:${PORT}`);
});

