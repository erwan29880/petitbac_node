let secondesClock = 0;   //init pour la fonction clock()
let ctx = document.getElementById('exemple').getContext('2d');
let chooseDuration = document.getElementById('chooseDuration');
let audio = new Audio('jingle.wav');
let audioVerif = 1;   // 1 pour activer le son
let xCanvas = 300;
let yCanvas = 300;
let hauteurConteneurReplie = 140;
let lancerChronometre = document.getElementById('lancerChronometre');
let arreterChronometre = document.getElementById('arreterChronometre');
let correction = document.getElementById('correction');
let tempsEcoule = document.getElementById('tempsEcoule');
let stopWatch;
let monTimer;

let nombreDeCategories = 6;
let changerLeNombre = document.getElementById('chooseNumber');
let choixJoueurs=0;
let resultatJoueurs = document.getElementById("resultatJoueurs");
let choixNombreJoueurs = document.getElementById('choixNombreJoueurs');

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const categories = ["prénom",
"objet",
"ville",
"pays",
"animaux",
"métier",
"marque",
"personne célèbre",
"fruit",
"légume",
"fleur plante arbre",
"sport",
"vêtement",
"aliment",
"instrument de musique",
"anatomie",
"acteur",
"chanteur",
"verbe",
"dans la salle de bains",
"en ville",
"à la campagne",
"adjectif",
"couleur",
"boisson",
"personnage imaginaire",
"personnage historique",
"capitale",
"outil",
"onomatopée",
"un cadeau nul",
"un truc qui fait peur",
"un truc pas bon",
"un truc moche",
"fromage",
"un truc vert",
"maladie bobo",
"fleuve rivière",
"ça ne se mange pas",
"loisir",
"département",
"élément chimique",
"unité de mesure",
"jeu de société",
"façon de mourir"];


function remplissageNombres(){
    for(let i = 4; i < 12; i++) {
        let el = document.createElement("option");
        el.textContent = i;
        el.value = i;
        if(i==6){
            el.selected = true;
        }
        changerLeNombre.appendChild(el);
    }
}


function remplissageJoueurs(){
    for(let i = 1; i < 9; i++) {
        let el = document.createElement("option");
        if(i==1){
            el.textContent = "";
            el.value = "";
        }
        else{
            el.textContent = i;
            el.value = i;
        }
        choixNombreJoueurs.appendChild(el);
    }
}



function remplissageDuration(){
    const dureeMinutes = ['0\'30','1\'','1\'30','2\'','2\'30','3\''];
    const dureeSecondes = ['30','60','90','120','150','180'];
    for(let i=0; i < dureeMinutes.length; i++) {
        let el = document.createElement("option");
        el.value = dureeSecondes[i];
        el.textContent = dureeMinutes[i];
        if(dureeSecondes[i]==120){
            el.selected = true;
        }
        chooseDuration.appendChild(el);
    }
}

remplissageNombres();
remplissageJoueurs();
remplissageDuration();
//---------------------------------------------------------------------------
//---------------------- lettres  -------------------------------------------
//---------------------------------------------------------------------------

document.getElementById('cliquer').addEventListener('click',function(){
    document.getElementById('resultat').innerHTML = "<center><button class=\"res\">" + alphabet[Math.floor(Math.random() * alphabet.length)] + "</button></center>";
    document.getElementById('cliquer').style.display = 'none';
});

document.getElementById('resultat').addEventListener('click',function(){
    document.getElementById('resultat').innerHTML = "<center><button class=\"res\">" + alphabet[Math.floor(Math.random() * alphabet.length)] + "</button></center>";
    });

//---------------------------------------------------------------------------
//---------------------- chronomètre ----------------------------------------
//---------------------------------------------------------------------------

function clock(){
  
    ctx.save();
    ctx.clearRect(0,0,xCanvas,yCanvas);
    ctx.translate(75,75);
    ctx.scale(0.4,0.4);
    ctx.rotate(-Math.PI/2);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Marquage des heures
  
    for (var i=0;i<12;i++){
        ctx.beginPath();
        ctx.rotate(Math.PI/6);
        ctx.moveTo(100,0);
        ctx.lineTo(120,0);
        ctx.stroke();
    }
  
    // Marquage des minutes
    ctx.lineWidth = 5;
    for (i=0;i<60;i++){
        if (i%5!=0) {
            ctx.beginPath();
            ctx.moveTo(117,0);
            ctx.lineTo(120,0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI/30);
    }

    ctx.fillStyle = "black";

    // Aiguille des secondes
  
    let coefficient = parseInt(chooseDuration.value)/60;
    ctx.rotate(secondesClock * Math.PI/30/coefficient);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30,0);
    ctx.lineTo(83,0);
    ctx.stroke();
    secondesClock = secondesClock +1;
  
  //déco

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'black';
    ctx.arc(0,0,142,0,Math.PI*2,true);
    ctx.stroke();
        
    ctx.restore();
}


function remplissageEvent(){
    changeDuree = parseInt(document.getElementById('chooseDuration').value);
    clearInterval(monTimer);
    clearInterval(stopWatch);

    //fonction d'appel à clock() 

    monTimer = setInterval(function(){
        clock();
        changeDuree = changeDuree - 1 ;
        if(changeDuree == -1){
            clearInterval(monTimer);
            secondesClock = 0;
        }
    },1000);

    
    
    if(audioVerif == 1){
        audio.play();
    }
    tempsEcoule.innerHTML = "";
    let temps = chooseDuration.value;
    let minutes;
    let secondes;
    lancerChronometre.style.display = "none";
    arreterChronometre.style.display = "block";

    function diminuerLeTime(){
        if(temps>60){
            minutes = Math.floor(temps/60);
            secondes = temps - minutes*60;
        }else{
            minutes = 0;
            secondes = temps;    
        }
        tempsEcoule.style.marginTop = "30px";
        tempsEcoule.innerHTML =  '<center>Temps restant : '+ minutes +' : '+secondes +'</center>'; 
        document.getElementById('conteneurConteneurCanvas').style.height = "140px";
        if(temps == 0 ){
            clearInterval(stopWatch);
            correction.style.display = "block";
            setTimeout(function(){
                correction.style.display = "none";
                lancerChronometre.style.display = "block";
                arreterChronometre.style.display = "none";
                tempsEcoule.innerHTML = "";
                ctx.clearRect(0,0,xCanvas,yCanvas);
                document.getElementById('conteneurConteneurCanvas').style.height = hauteurConteneurReplie+"px";
            },5000);
            if(audioVerif == 1){
                audio.play();
            }
            return false;
        }else{
            temps = temps - 1; 
        }
        
    } // fin fonction diminuerLeTime

    stopWatch = setInterval(diminuerLeTime, 1000);
} // fin fonction remplissageEvent


function clearEvent(){
    clearInterval(stopWatch);
    clearInterval(monTimer);
    secondesClock = 0;
    ctx.clearRect(0,0,xCanvas,yCanvas);
    tempsEcoule.innerHTML = "";
    lancerChronometre.style.display = "block";
    arreterChronometre.style.display = "none";
    document.getElementById('conteneurConteneurCanvas').style.height = hauteurConteneurReplie +"px";
}


lancerChronometre.addEventListener('click',function(){
    remplissageEvent();
});

arreterChronometre.addEventListener('click',function(){
    clearEvent();
});


//---------------------------------------------------------------------------
//---------------------- chronomètre  ---------------------------------------
//---------------------- barre espace  ---------------------------------------
//---------------------------------------------------------------------------
choixNombreJoueurs.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
categoriesAleatoires.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
cliquer.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
document.getElementById('conteneurConteneurCanvas').addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
document.getElementById('arreterChronometre').addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
document.getElementById('correction').addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
document.getElementById('tempsEcoule').addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);
document.getElementById('exemple').addEventListener('keydown', (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    }
},false);



document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        if(document.getElementById('lancerChronometre').style.display == "block"){
            remplissageEvent();
        }
        else{
            clearEvent();
        }
    }
});



//---------------------------------------------------------------------------
//---------------------- catégories  ----------------------------------------
//---------------------------------------------------------------------------

changerLeNombre.addEventListener('change',function(e){
    nombreDeCategories = parseInt(e.target.value);
});

function getMultipleRandom() {
    let myString = "";
    const shuffled = categories.sort(() => 0.5 - Math.random());
    const newArr = shuffled.slice(0, nombreDeCategories);
    for(let i=0; i<newArr.length;i++){
       if(i === newArr.length-1){
            myString += newArr[i];
        }
        else{
            myString += newArr[i] + " | ";
        }
    }
    document.getElementById('resultat2').innerHTML = "<center><button class=\"res\">" + myString + "</button></center>";
}


document.getElementById('categoriesAleatoires').addEventListener('click',function(e){ 
    getMultipleRandom();
});
  

document.getElementById('resultat2').addEventListener('click',function(){ 
    getMultipleRandom();
});


    

//---------------------------------------------------------------------------
//---------------------- score ----------------------------------------------
//---------------------------------------------------------------------------

choixNombreJoueurs.addEventListener('change',function(e){
    choixJoueurs = parseInt(e.target.value);
    resultatJoueurs.innerHTML = "rentrez le nom des joueurs :<br>";

    for(let i=0 ; i<choixJoueurs ; i++){
        resultatJoueurs.innerHTML += '<p><input type="text" id="'+ i +'"></p>';
    }
    resultatJoueurs.innerHTML += '<button id="validerLesNoms">ok</button>';
    boucle = [];  //je rentre les noms dans l'array boucle
    
    //
    //debut deuxiéme affichage
    //  
        maxNombre = nombreDeCategories*2;
        document.getElementById('validerLesNoms').addEventListener('click',function(){
        boucle = [];
        for(let i=0 ; i<choixJoueurs ; i++){
            let nomaTester = document.getElementById(i).value;
            if(nomaTester == ""){
                let j=i+1;
                nomaTester = 'joueur'+j;
            }
            boucle.push(nomaTester);
        }
        resultatJoueurs.innerHTML = 'rentrez les scores :<br>'; //réinitialisation de resultats joueurs
        for(let i=0; i<boucle.length ; i++){
            resultatJoueurs.innerHTML += '<p><label class="labelNoms" for="'+i+'">'+ boucle[i] +'</label><input type="number" min="0" max="'+maxNombre +'" id="b'+ i +'"><span id="a'+i + '"></span></p>';
        }
        resultatJoueurs.innerHTML += '<br><button id="validerLesScores">ok</button>';


            //
            // début troiseme affichage
            //


            boucle2=[];
            for(let i=0 ; i<boucle.length ; i++){
                boucle2.push('0');
            }
            document.getElementById('validerLesScores').addEventListener('click',function(){
                for(let i=0 ; i<boucle.length ; i++){
                    let str = 'b' + i;
                    let aTester = parseInt(document.getElementById(str).value);

                    if(Number.isInteger(aTester)){
                        if(aTester >=0 && aTester<=maxNombre){
                            aTester= aTester + parseInt(boucle2[i]);
                            boucle2[i]=aTester;
                        }
                    }else{
                        boucle2.push("0");
                    } 
                }
                for(let i=0; i< boucle2.length ; i++){
                    str = 'a'+i;
                    document.getElementById(str).innerHTML = boucle2[i];
                    document.getElementById(str).style.marginLeft = "10px";
                }   

            });
            //
            // fin troisième affichage
            //
    });  
        //
        // fin deuxième affichage
        //
}); //fin premier affichage



// déco boutons

let selectionDeTousLesBoutons = document.querySelectorAll('button');

for(let i = 0; i < selectionDeTousLesBoutons.length; i++) {
        
    selectionDeTousLesBoutons[i].addEventListener('mouseenter',function(e){
        e.target.style.backgroundColor = "grey";
        setTimeout(function(){
        selectionDeTousLesBoutons[i].style.backgroundColor = "white";
        },300);
    });
};