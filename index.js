const express = require("express"); 
const cors = require("cors"); 
const Pool = require("pg").Pool;
const { response, request } = require("express");

const app = express();
const baseUrl = "/onepiece";
app.use(cors());

// Set database connection credentials
ddbbConfig = {
  host: "postgresql-gagandeep.alwaysdata.net",
  user: "gagandeep",
  password: "wanoDatabases",
  database: "gagandeep_one-piece-pgadmin",
};
//El pool es un congunt de conexions
const pool = new Pool(ddbbConfig);

// metode GET
const getCharacters = (request, response) => {
  let consulta;
  let pirate_crew = request.query.crew;
  let character_status = request.query.status;

  consulta = "SELECT * FROM characters ORDER BY id";
                                                                                                                                                                                                                   
  if(pirate_crew != null || pirate_crew != undefined ){
    consulta = `SELECT * FROM characters WHERE crew='${pirate_crew}' ORDER BY id;`;
  }                                                                                                                                                                                                                
                                                                                                                                                                                                                   
  if(character_status != null || character_status != undefined){
    consulta = `SELECT * FROM characters WHERE status='${character_status}' ORDER BY id;`;
  } 

  pool.query(consulta, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
};
app.get(baseUrl + "/characters", getCharacters);

//Inicialitzem el servei
const PORT = process.env.PORT || 3000; // Port
const IP = process.env.IP || null; // IP

app.listen(PORT, IP, () => {
  console.log("El servidor está inicialitzat en el puerto " + PORT);
});
