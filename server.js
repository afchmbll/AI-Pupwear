const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const sharp = require('sharp');
const size = require("image-size")
const resizeAndOverlayImages = require(path.join(__dirname, "photomaker.js"))

const app = express();
const PORT = 8080;

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



let effects = {
    "Pop Art": "15",
    "Superstring": "31",
    "Structuralism" : "20",
    "Warm Smear" : "238",
    "Cartoon" : "269",
    "Ink Art": "180",
    "Van Gogh 2": "263",
    "Meteor Shower": "299",
}

let ficheiroFinal = ""


// Serve static files (including images)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'AI-PUPWEAR_ Unique AI Generated Dog Portraits on Shirts & Hoodies.html'));
});

//Get Custom page
app.get('/Custom%20TESTE%20%E2%80%93%20AI-PUPWEAR.html', (req,res)=>{
    res.sendFile(path.join(__dirname, 'Custom TESTE – AI-PUPWEAR.html'));
})

//Get Collections Page
app.get("/Collections%20-%20AI%20PUPWEAR.html", async (req,res)=>{
  await resizeAndOverlayImages(path.join(__dirname, "public", "T shirt Branca limpa.png"), path.join(__dirname, "public", ficheiroFinal), path.join(__dirname, "public", "T shirt Branca.png"))
  await resizeAndOverlayImages(path.join(__dirname, "public", "T shirt Preta Limpa.jpg"), path.join(__dirname, "public", ficheiroFinal), path.join(__dirname, "public", "T shirt Preta.png"))
  await resizeAndOverlayImages(path.join(__dirname, "public", "Hoddie Branco Limpo.jpg"), path.join(__dirname, "public", ficheiroFinal), path.join(__dirname, "public", "Hoodie Branco.png"))
  await resizeAndOverlayImages(path.join(__dirname, "public", "Hoddie Preto Limpo.jpg"), path.join(__dirname, "public", ficheiroFinal), path.join(__dirname, "public", "Hoodie Preto.png"))
  res.sendFile(path.join(__dirname, 'Collections - AI PUPWEAR.html'));
})

//Upload images to fotor
app.post('/upload', upload.single('uploaded'), async (req, res) => {
    try {
      // Save the uploaded file to a temporary location (optional)
      let imageFilePath = path.join(__dirname, "public", "uploaded.jpg")
      fs.writeFileSync(imageFilePath, req.file.buffer)

      const dimensions = size(imageFilePath)
     
      let effect = req.body.effect

      const timestamp = Date.now()
      ficheiroFinal = "Output" + timestamp.toString() + ".jpg"  

          const postData = {
            // Your POST data here
            "base64" : fs.readFileSync(imageFilePath, "base64"),
            "tfs-model-version": effects[effect]
          };
          
          axios.post('https://www.fotor.com//tfs-sagemaker-runtime', JSON.stringify(postData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
          .then(response => {
            //fs.writeFile("Output.txt", response.data, (err)=>{
             //   if (err) throw err
            //})

            let buffer = Buffer.from(response.data.split(",")[1], "base64")
            fs.writeFile(path.join(__dirname, "public", "Output.jpg"), buffer, {encoding: 'base64'},  (err)=>{
                if (err) throw err
                
                console.log("Image created")

                sharp(path.join(__dirname, "public", "Output.jpg")).resize(dimensions.width, dimensions.height, {fit:"fill"}).toFile(path.join(__dirname, "public", ficheiroFinal)).then(
                  () =>{
                    sharp.cache(false);
                    res.status(200).send({success:true, imageName: ficheiroFinal})
                  }
                ).catch((error)=>{
                  console.error(error)
                })
            })
            
          })
          .catch(error => {
            console.error('Error:', error);
          });

          } catch (error) {
              console.error(error);
              res.status(500).send({ success: false, message: 'Error applying effects.' });
          }  
  });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  