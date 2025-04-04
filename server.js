import express from "express";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// app.get('/', async function (request, response) {
//     // Render index.liquid uit de Views map en geef de opgehaalde data mee, in een variabele genaamd person
//     response.render('index.liquid')
//  })

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
