const electron = require("electron")
const { ipcRenderer } = electron
var baglanti= require('./bag/baglanti')


//En başta veritabanında bi şey var mı diye kontrol etmek için uyariKontrol metodunu burda çalıştırıyoruz
uyariKontrol()

const veri= document.querySelector("#veri")



//Burası veritabanında kayıtlı olan maddeleri bize oluşturacak olan alan
ipcRenderer.on("icerik",(e,yapilacaklar) =>{
    for(i=0;i<yapilacaklar.length;i++){
    //card-body
   const card_body = document.querySelector(".card-body")

   //liste
   const liste = document.createElement("ul")
   liste.className = "liste"

   //div
   const maddeler = document.createElement("div")
   maddeler.className = "maddeler"

   //li
   const liste_elemanlari = document.createElement("li")
   liste_elemanlari.className = "liste_elemanlari"
   liste_elemanlari.innerText = yapilacaklar[i]['metin']

   //input
   const kontrolKutusu = document.createElement("input")
   kontrolKutusu.className = "form-check-input"
   kontrolKutusu.type="checkbox"

   //i
   const ikon = document.createElement("i")
   ikon.className = "fas fa-trash-alt"
   ikon.setAttribute("id",yapilacaklar[i]['id']);



   //Silme ikonuna basıldığı zaman silme işlemi yapılır
   ikon.addEventListener("click", (e) => {
           e.target.parentNode.parentNode.remove()
           uyariKontrol()
           baglanti.db.query("DELETE FROM `yapilacaklar` WHERE `yapilacaklar`.`id` = "+ikon.id,(err,res)=>{
            if(err) throw err;
           })
   })

   maddeler.appendChild(liste_elemanlari);
   maddeler.appendChild(ikon);
   maddeler.appendChild(kontrolKutusu);

   liste.appendChild(maddeler);

   card_body.appendChild(liste);

   uyariKontrol()

    };
   
})





//Burası bizim uygulama çalışırken eklediğimiz maddeleri oluşturan yer
document.querySelector("#kaydet").addEventListener("click", () =>{
    ipcRenderer.send("yenimadde:kaydet",veri.value);
    veri.value="";
})

ipcRenderer.on("liste:icerikekle", (e, yapilacak) => {
    //card-body
    const card_body = document.querySelector(".card-body")

    //liste
    const liste = document.createElement("ul")
    liste.className = "liste"

    //div
    const maddeler = document.createElement("div")
    maddeler.className = "maddeler"

    //li
    const liste_elemanlari = document.createElement("li")
    liste_elemanlari.className = "liste_elemanlari"
    liste_elemanlari.innerText = yapilacak.text
    baglanti.db.query("INSERT INTO `yapilacaklar` (`id`, `metin`) VALUES (NULL, '"+yapilacak.text+" ');")

    //input
    const kontrolKutusu = document.createElement("input")
    kontrolKutusu.className = "form-check-input"
    kontrolKutusu.type="checkbox"

    //i
    const ikon = document.createElement("i")
    ikon.className = "fas fa-trash-alt"
    ikon.setAttribute("id","sil");


    //Silme ikonuna basıldığı zaman silme işlemi yapılır
    ikon.addEventListener("click", (e) => {
            e.target.parentNode.parentNode.remove()
            uyariKontrol()
    })

    maddeler.appendChild(liste_elemanlari);
    maddeler.appendChild(ikon);
    maddeler.appendChild(kontrolKutusu);

    liste.appendChild(maddeler);

    card_body.appendChild(liste);

    uyariKontrol()


})


//Bu fonksiyon herhangi bir eleman var mı diye kontrol ediyor. Bir elemanımız yoksa uyarı mesajımız ekrana veriliyor
function uyariKontrol(){
    const eleman= document.querySelector(".card-body")
    const uyari= document.querySelector(".alert")

    if(eleman.children.length!==0){
        uyari.style.display="none"
    }else{
        uyari.style.display="block"
    }
    
}