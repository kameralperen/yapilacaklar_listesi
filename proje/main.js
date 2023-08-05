const electron = require("electron");
const url = require("url")
const path = require("path")


//Bağlantı kurulumu
const db = require("./bag/baglanti").db;
db.query("SELECT * FROM yapilacaklar",(err,res)=>{
  if(err) throw err;
  console.log(res);
  for(i=0;i<res.length;i++){

  }
});



const { app, BrowserWindow, Menu, ipcMain } = electron;

let anaSayfa;
let yapilacaklar_listesi = [];


app.on("ready", () => {
  anaSayfa = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  anaSayfa.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  ipcMain.on("key", (err, data) => {
    console.log(data);
  })






  //Yeni madde ekleme olayları. Kaydet butonuna basıldığı zaman içerik eklenir
  ipcMain.on("yenimadde:kaydet", (err, data) => {
      let yapilacak = {
        id: yapilacaklar_listesi.length + 1,
        text: data
      };
      yapilacaklar_listesi.push(yapilacak);

      anaSayfa.webContents.send("liste:icerikekle", yapilacaklar_listesi[yapilacaklar_listesi.length - 1]);


  });




      /*Uygulama ilk açıldığında bir kereliğine mahsus olmak üzere
      veritabanında eleman var mı diye kontrol edilir.
      Varsa elemanların ekranda gösterileceği yere yönlendirilir*/
      
  anaSayfa.webContents.once("dom-ready", ()  =>{
      db.query("SELECT * FROM yapilacaklar", (error, results, fields) => {
       anaSayfa.webContents.send("icerik", results)
      })
  })

});