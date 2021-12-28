function openFunction(){
    document.getElementById("menu").style.width="257px";
    document.getElementById("mainbox").style.marginLeft="300px";
    document.getElementById("mainbox").innerHTML="";
}
  function closeFunction(){
   document.getElementById("menu").style.width="0px";
   document.getElementById("mainbox").style.marginLeft="15px";
   document.getElementById("mainbox").style.marginTop="5px";
   document.getElementById("mainbox").innerHTML=`<img style="height:40px;" src="https://img.icons8.com/ios-filled/50/000000/menu-rounded.png"/>`;
}
