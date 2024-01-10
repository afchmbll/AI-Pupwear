const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');
const size = require("image-size")

async function resizeAndOverlayImages(backgroundImagePath, overlayImagePath, outputImagePath) {
    try {

      let overlayWidth = 0
      let overlayHeight = 0
      let coef = 0
      let leftSlide = 0

      // Load background image
      const background = await sharp(backgroundImagePath).toBuffer();

      let dimensionsImage = size(overlayImagePath)
      console.log(dimensionsImage.width)
      console.log(dimensionsImage.height)

      //Check which is the bigger dimension and resize image accordingly
      if (dimensionsImage.width > 500 || dimensionsImage.height>750){
        if (dimensionsImage.width>dimensionsImage.height){
          coef = 500.00 / dimensionsImage.width
      }
        else{
          coef = 500.00 / dimensionsImage.height
        }
        overlayHeight =  Math.round(dimensionsImage.height * coef)
        overlayWidth =  Math.round(dimensionsImage.width*coef)
    }

      else{
        if (dimensionsImage.width>dimensionsImage.height){
          coef = 500.00 / dimensionsImage.width
      }
        else{
          coef = 500.00 / dimensionsImage.height
        }

        overlayHeight = Math.round(dimensionsImage.height * coef)
        overlayWidth = Math.round(dimensionsImage.width * coef)
    }

      if(overlayHeight>overlayWidth){
        leftSlide = Math.round((500-overlayWidth)/2)
      }
    
      // Load and resize overlay image
      const overlay = await sharp(overlayImagePath)
        .resize(overlayWidth, overlayHeight,{fit: 'fill'})
        .toBuffer();
  
      // Create a composite image by overlaying the resized image on the background
      const compositeImage = await sharp(background)
        .composite([{ input: overlay, left: 760 + leftSlide, top: 500 }])
        .toBuffer();
  
      // Save the final image
      sharp(compositeImage).toFile(outputImagePath, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Image overlay successful. Output:', outputImagePath);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

module.exports = resizeAndOverlayImages;

// Example usage
//const backgroundImagePath = "Hoddie Preto Limpo.jpg";
//const overlayImagePath = "./public/Output1704562493556.jpg";
//const outputImagePath = "finalImage.png";

//resizeAndOverlayImages(backgroundImagePath, overlayImagePath, outputImagePath);