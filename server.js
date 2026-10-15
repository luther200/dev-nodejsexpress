const express = require('express');
const app = express();

const ports = {
    "dev": 8383,
    "real": 8000
};

const currentEnv = process.env.NODE_ENV || "dev";
const PORT = ports[currentEnv];

console.log(`RUNNING IN ${currentEnv.toUpperCase()} MODE`);

app.listen(PORT, () => {
    console.log(`Server started on : http://localhost:${PORT}`)
});

