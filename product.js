function getAllUrlParams(url) {

    // obenir la chaine de requête de l'url  (optional) or window 
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // je crée une boite vide ou l'on va stocker des paramètres ici
    var obj = {};
  
    // si la chaine de requête existe 
    if (queryString) {
  
      // ce qui est après le # de la chaine de requête on oubli 
      queryString = queryString.split('#')[0];
  
      // diviser la chaine de requête en ses composants  créé par un tableau 
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // séparations des clés et des valeurs du tableau arr 
        var a = arr[i].split('=');
  
        // définir le nom et la valeur du paramètre (utiliser "true" si vide )
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) garder le nom en minuscule
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // ajouter la valeur à la fin du tableau
            obj[key].push(paramValue);
          }
        } else {
          // nous avons a faire à une chaine 
          if (!obj[paramName]) {
            // si n'existe pas , on créé la propriété
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // si la propriété existe et que c'est une chaine , convertir en tableau
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // sinon ajouter la propriété 
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
}

window.onload  = function() {
 
    let mon_objet_url = getAllUrlParams();
    let id = mon_objet_url.id;

console.log(id);

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var camera = JSON.parse(this.responseText);
        console.log(camera);

        let bodyElt = document.getElementsByTagName("body")[0];   // je récupère l'élément DOM body //

        let headerElt = document.getElementsByTagName("header")[0]; // je récupère l'élément DOM header //
        let titreHeader = document.createElement("H1"); // je crée une balise h1  // 
        let textTitrePrincipal = document.createTextNode(camera.name); // je crée  un bloc de texte contenant le titre du header //
            headerElt.appendChild(titreHeader); // J'attache la balise H1 à l 'header // 
            titreHeader.appendChild(textTitrePrincipal);  // j'attache le texte à la balise H1 //
                
        const newArticleElt = document.createElement("div"); // je crée une balise div //
        newArticleElt.className = "listcameras"; // je crée une classe dans la balise div //
        
        let figure =  document.createElement("figure"); // je crée une balise figure //
        let hrefImage = document.createElement("a"); // je crée une balise <a> // 
        let articleImage = document.createElement("IMG"); // je crée une balise image //
        articleImage.src = camera.imageUrl; // je définis la propriéré SRC de l'image avec le contenu de l'imageUrl //
        hrefImage.href = "product.html?id=5be1ed3f1c9d44000030b061";
        let figcaption = document.createElement("figcaption"); // je crée la balise figcaption //

       // let figcaptionpara = document.createElement('p'); // je crée la balise paragraphe //
        //let articlePrice = document.createTextNode(camera.lenses[0] + " " + "Prix" + " " + camera.price); // je crée un bloc texte contenant le prix de la camera ////
        //let figcaptionpara2 = document.createElement('p'); // je crée la balise paragraphe /
        //let articlePrice2 = document.createTextNode(camera.lenses[1] + " " + "Prix" + " " + camera.price);//
        
        var selectList = document.createElement("select");
        selectList.name = "lense";
        selectList.id = "lense";
        figcaption.appendChild(selectList);
        
        //Create and append the options
        for (let lense of camera.lenses) {
            var option = document.createElement("option");
            option.value = lense;
            option.text = lense;
            selectList.appendChild(option);
        }                
     

        figure.appendChild(hrefImage); // j'ajoute la balise <a> dans la balise figure //
        hrefImage.appendChild(articleImage); // j'ajoute l'image dans la balise  <a> //
        newArticleElt.appendChild(figure); // j'ajoute la balise figure à la div listcameras //
        (figure.appendChild)(figcaption); // j'ajoute la balise figcaption à la balise figure //
       
        //figcaption.appendChild(figcaptionpara); // j'ajoute un paragraphe dans la balise figcaption // 
        //figcaption.appendChild(figcaptionpara2);
        //figcaptionpara.appendChild(articlePrice); // j'ajoute le prix à la balise figcaptionpara //
        //figcaptionpara2.appendChild(articlePrice2); //

        bodyElt.appendChild(newArticleElt); // j'ajoute l'article au body //

    }
};

request.open( "GET", "http://localhost:3000/api/cameras/" + id); 
request.send();

}