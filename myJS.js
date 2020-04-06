var allItems = document.querySelectorAll(".btn-menu");
var allPanel = document.querySelectorAll(".contenuPanel");
var allLang = document.querySelectorAll(".language");

var allEng = document.querySelectorAll(".eng");
var allFra = document.querySelectorAll(".fra");

var btnPrice = document.getElementById("btnPrice");
var RdCapt = document.getElementById("RdCapt");
var RdTran = document.getElementById("RdTran");
var CbTransl = document.getElementById("CbTransl");


//var parentDate = document.getElementById("deadline");
var parentHours = document.getElementById("hours");
var parentMinutes = document.getElementById("minutes");
var parentSecondes = document.getElementById("secondes");


var hours = Number(parentHours.getElementsByTagName("input")[0].value);
var minutes = Number(parentMinutes.getElementsByTagName("input")[0].value);
var secondes = Number(parentSecondes.getElementsByTagName("input")[0].value);
//var date = Number(parentDate.getElementsByTagName("input")[0].value);

var videoEN = document.getElementById("video1");
var videoFR = document.getElementById("video2");

function showContent(index){
  allItems.forEach(function(node){
      node.style.backgroundColor = "";
  });

  allItems[index].style.color = "black";
  allPanel.forEach(function(nodes){
      nodes.style.display = "none";
  });

  allPanel[index].style.display = "block";

}
function showContentLang(language){
  if(language === "fra"){
    allEng.forEach(function(nodes){
        nodes.style.display = "none";
    });
    allFra.forEach(function(nodes){
        nodes.style.display = "block";
    });
  }
  else{
    allFra.forEach(function(nodes){
        nodes.style.display = "none";
    });
    allEng.forEach(function(nodes){
        nodes.style.display = "block";
    });
  }

}

function showMoreLess(id, dots, more) {
    var dots = document.getElementById(dots);
    var moreText = document.getElementById(more);
    var btnText = document.getElementById(id);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }
  
function refreshVar(){
    
  //parentDate = document.getElementById("deadline");
  parentHours = document.getElementById("hours");
  parentMinutes = document.getElementById("minutes");
  parentSecondes = document.getElementById("secondes");

  hours = Number(parentHours.getElementsByTagName("input")[0].value);
  minutes = Number(parentMinutes.getElementsByTagName("input")[0].value);
  secondes = Number(parentSecondes.getElementsByTagName("input")[0].value);
  //date = Number(parentDate.getElementsByTagName("input")[0].value);

}

function btnprice(){
  
  var totalPrice = 0.0;
  var priceElts = document.getElementById("priceValue");
  var RbServices = getEltsChecked('RbServices').value;
  var Lang = getEltsChecked("RbLang").value;
  var totalMin = minutes;
  
  totalMin = getCurrentMinutes()


  if(RbServices === "Normal")
    totalPrice = totalMin * 1;
  else
    totalPrice = totalMin * 1.5;
  
  if(Lang !== "None")
    totalPrice += totalMin * 2;
  

  priceElts.innerHTML = "€" + totalPrice + "<br> minutes: " + totalMin;
}

function getEltsChecked(name){
  var ele = document.getElementsByName(name); 
              
  for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) 
        return ele[i];
  } 
}

for (var i = 0; i < allItems.length; i++) {
  allItems[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.children[0].className += " active";
  });
}

for (var i = 0; i < allLang.length; i++) {
  allLang[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active_lang");
    current[0].className = current[0].className.replace(" active_lang", "");
    this.children[0].className += " active_lang";
    videoEN.pause();
    videoFR.pause();
  });
}

function getCurrentMinutes(){
  refreshVar();
   var totalMin = minutes;
    
    if(hours == 0 && minutes == 0 && secondes > 0)
      totalMin = 1;
    else if(secondes > 30)
      totalMin++;
    
    totalMin += hours * 60;
    return totalMin;
}

function getElts(idElts){
  if(idElts === "hours" )
    return parentHours;

  if(idElts === "minutes")
    return parentMinutes;

  if(idElts === "secondes")
    return parentSecondes;
  //if(idElts === "deadline")
  //  return parentDate;

 }

 function increaseValue(idElts){
  var parentElts = getElts(idElts);
  var childElts = parentElts.getElementsByTagName("input")[0];
  var num = Number(childElts.value);
  if(Number(childElts.max) > num){
    num++;
    childElts.value = num;  
  }
  var dateElts = getElts('deadline').getElementsByTagName("input")[0];
  if(getCurrentMinutes() > 150)
  {
    if(idElts !== 'deadline'){
      if(dateElts.value < 2)
        dateElts.value = 2;
      dateElts.min = 2;  
    }
  }
  else{
    if(idElts !== 'deadline'){
      dateElts.min = 1;
    }
  }
}

function decreaseValue(idElts){
  
  var parentElts = getElts(idElts);
  var num = Number(parentElts.getElementsByTagName("input")[0].value);
  if(Number(parentElts.getElementsByTagName("input")[0].min) < num){
    num--;
    parentElts.getElementsByTagName("input")[0].value = num;  
  }
  var dateElts = getElts('deadline').getElementsByTagName("input")[0];
  if(getCurrentMinutes() > 150)
  {
    if(idElts !== 'deadline'){
      if(dateElts.value < 2)
        dateElts.value = 2;
      dateElts.min = 2;  
    }
  }
  else{
    if(idElts !== 'deadline'){
      dateElts.min = 1;
    }
  }
}

function textChanges(idElts){
  
  var parentElts = getElts(idElts);
  var num = Number(parentElts.getElementsByTagName("input")[0].value);
  if( Number(parentElts.getElementsByTagName("input")[0].min) >= num)
  {
    parentElts.getElementsByTagName("input")[0].value = parentElts.getElementsByTagName("input")[0].min
  }
  if(Number(parentElts.getElementsByTagName("input")[0].max) <= num)
  {
    parentElts.getElementsByTagName("input")[0].value = parentElts.getElementsByTagName("input")[0].max
  }
  var dateElts = getElts('deadline').getElementsByTagName("input")[0];
  if(getCurrentMinutes() > 150)
  {
    if(idElts !== 'deadline'){
      if(dateElts.value < 2)
        dateElts.value = 2;
      dateElts.min = 2;  
    }
  }
  else{
    if(idElts !== 'deadline'){
      dateElts.min = 1;
    }
  }
}

function resieScreen(){
  var w = window.outerWidth;
  var h = window.outerHeight;/*
  var txt = "width=" + w + ", height=" + h + "<br>" + window.innerWidth + " h " + window.innerHeight;
  document.getElementById("demo").innerHTML = txt;*/
}
resieScreen();
/* Fatou
Salut madame, deux jours hein? C'cmt? apparement le covid 19 à toucher plusieurs personnes
à babi, j'espère que tu vas bien. Juste prends soin de toi et ta famille.
In Sha Allah tout ira bien, bonne journée et bon confinement hhh.*/