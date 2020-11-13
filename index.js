window.onload  = function() {

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var cameraList = JSON.parse(this.responseText);
        console.log(cameraList);


       
        let camera = cameraList[0];
        let bodyElt = document.getElementsByTagName("body")[0];   // je récupère l'élément DOM body

        let headerElt = document.getElementsByTagName("header")[0]; // je récupère l'élément DOM header
        let titreHeader = document.createElement("H1"); // je crée une balise h1  // 
        let textTitrePrincipal = document.createTextNode("Les Cameras"); // je crée  un bloc de texte contenant le titre du header //
            titreHeader.appendChild(textTitrePrincipal);  // j'attache le texte à la balise H1 //
            headerElt.appendChild(titreHeader); // J'attache la balise H1 à l 'header // 

      
      
      
            //for (let camera of cameraList) { // Boucle pour chaque camera  présente dans la liste des cameras //
            const newArticleElt = document.createElement("div"); // je crée une balise div
            newArticleElt.className = "listcameras"; // je crée une classe dans la balise div //
            let titreclasslistcameras = document.createElement("H2"); // je crée une balise h2  // 
            
            let titreH2 = document.createTextNode(camera.name);   // je crée  un bloc de texte contenant le titre du h2 //
            let figure =  document.createElement("figure"); // je crée une balise figure //
            let articleImage = document.createElement("IMG"); // je crée une balise image
            articleImage.src = camera.imageUrl; // je définis la propriéré SRC de l'image avec le contenu de l'imageUrl
            let figcaption = document.createElement("figcaption"); // je crée la balise figcaption //

            let figcaptionpara = document.createElement('p');
            let articlePrice = document.createTextNode(camera.price); // je crée un bloc texte contenant le prix de la camera //
    
           

            titreclasslistcameras.appendChild(titreH2); // j'ajoute le titre h2 à la balise h2 // 
            newArticleElt.appendChild(titreclasslistcameras); // j'ajoute la balise h2 à la div listcameras //
            figure.appendChild(articleImage); // j'ajoute l'image dans la balise figure //
            newArticleElt.appendChild(figure); // j'ajoute la balise figure à la div listcameras //
            (figure.appendChild)(figcaption); // j'ajoute la balise figcaption à la balise figure //

            figcaption.appendChild(figcaptionpara);
            figcaptionpara.appendChild(articlePrice); // j'ajoute le prix à la balise figcaptionpara //
            bodyElt.appendChild(newArticleElt); // j'ajoute l'article au body
            

            

  //      }
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();

}