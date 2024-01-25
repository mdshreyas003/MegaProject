const express = require("express");
const cors = require("cors");
const Axios = require("axios");
var qs = require('qs');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
    // const data = {
    //     script: req.body.code,
    //     language: req.body.language,
    //     versionIndex: "0",
    //     clientId: "b4b1b5e7084f4b5f0cb23fd6d83c060f", // Add your JDoodle client ID
    //     clientSecret: "604079093e81952d07b75e7ee78a8d50d3a7649fe5ee04abb978b9ed45a3d076" // Add your JDoodle client secret
    // };
    const data = {
        clientId: "b4b1b5e7084f4b5f0cb23fd6d83c060f",
        clientSecret: "604079093e81952d07b75e7ee78a8d50d3a7649fe5ee04abb978b9ed45a3d076",
        script: req.body.code.replaceAll("\r\n", "\n").replaceAll("    ", "\t").replaceAll("\n\t","\t"),
        stdin: req.body.input.replaceAll("\r\n", "\n"),
        language: req.body.language ==='python' ? 'python3': req.body.language,
        versionIndex: "0",
        compileOnly: false
    }
    console.log(data)
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try{
    Axios
        .post("https://api.jdoodle.com/v1/execute", 
        data
          )
        .then((response) => {
            res.send(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log("error");
        });
    }
    catch(err){
        console.log("err")
    }
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
