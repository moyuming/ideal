let app = require('./api')
// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))