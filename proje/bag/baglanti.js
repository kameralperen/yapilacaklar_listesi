'use strict';

const mysql = require('mysql');

let baglanti = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yapilacaklar_projesi',
  port: "3306"
});

baglanti.connect(function (err) {
  if (err) throw err;

  console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');

});

module.exports={
    db:baglanti
}