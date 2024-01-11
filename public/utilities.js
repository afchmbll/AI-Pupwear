async function submitForm(event) {
    event.preventDefault();
    alert("Preparing image, please wait")
    
    const input = document.getElementById('images');
    const file = input.files[0];

    if (!file){
        alert("No file")
        throw err
    }
    
    

    const effect = document.getElementById("effects")
    const value = effect.value

    const newImageElement = document.getElementById('singleImage')
    if (newImageElement.src != ""){
        newImageElement.src = "";
        newImageElement.alt = '';
    }

    const formData = new FormData();
    formData.append('uploaded', file);
    formData.append('effect', value)

    try {
       const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        })

        let finalResponse = await response.json()

        const newImage = document.getElementById('singleImage')
        fileToUse = finalResponse.imageName;
        newImage.src = finalResponse.imageName;
        newImage.alt = 'Processed Image';
        
       
        }
    catch (error) {
        alert("Error on utils" )
        console.error(error);
    }
}


