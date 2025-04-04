import express from "express";
import { Liquid } from 'liquidjs';
import { readdir, readFile } from 'node:fs/promises'

const app = express();

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set('views', './views');

const dailyNotes = await readdir('content/daily notes');
// routes
app.get('/', async function (request, response) {
    response.render('index.liquid')
})
app.get('/journal', async function (request, response) {  
    response.render('journal.liquid', {dailyNotes})
})
app.get('/journal/:path', async function (request, response) {    
    const {path} = request.params
    const note = await readFile('content/daily notes/' + path + '.md', { encoding: 'utf8'})
    
    response.render('note.liquid', {note})
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
