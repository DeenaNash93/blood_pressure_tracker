const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'תוכנת משימות מעולה'
    },
    host: 'localhost:7381'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js']; // התאימי בהתאם לנתיבים שלך

swaggerAutogen(outputFile, routes, doc).then(() => {
    console.log("swagger-output.json נוצר בהצלחה!");
});
