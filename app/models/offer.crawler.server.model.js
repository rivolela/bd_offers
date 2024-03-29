var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Offer_CrawlerSchema = new Schema({
  name: {
    type:String,
    trim: true,
    index: true 
  },
  ean: Number,
  image_medium: String,
  image_large: String,
  price: {
    type:String,
  },
  price_display:{
    type:String,
    set: formatPrice
  },
  category: {
    type:String,
    index: true 
  },
  merchantProductId: String,
  manufacturer:{
    type:String,
    index: true
  },
  url: {
    type:String,
  },
  urlOffer: String,
  advertiser: String,
  created:{
    type:Date,
    default: Date.now
  },
  countSad: Number,
  countHappy: Number,
  totalReviews: Number,
  departamentBD: String,
  categoryBD: String,
  programGroup: String,
});

// middleware to handle attributes before to save
Offer_CrawlerSchema.pre('save',function(next){
  
  // split merchant url offer thal will be used in crawler
  var url_01 = this.url.split('[[');
  console.log(url_01);
  var url_02 = url_01[1].split('?');
  console.log(url_02);

  this.urlOffer = url_02[0];
  
  next();
});


/**
 * @description formart price to brazil pattern
 * @param  {price_display}
 * @return {price_display formated}
 */
function formatPrice(price_display){
    //config
    var valor = Number(price_display);
    var casas = 2;
    var separdor_decimal = ',';
    var separador_milhar = '.';


    var valor_total = parseInt(valor * (Math.pow(10,casas)));
    var inteiros =  parseInt(parseInt(valor * (Math.pow(10,casas))) / parseFloat(Math.pow(10,casas)));
    var centavos = parseInt(parseInt(valor * (Math.pow(10,casas))) % parseFloat(Math.pow(10,casas)));
   
    if(centavos%10 === 0 && centavos+"".length<2 ){
      centavos = centavos+"0";
    }else if(centavos<10){
      centavos = "0"+centavos;
    }
  
    var milhares = parseInt(inteiros/1000);
    inteiros = inteiros % 1000; 
   
    var retorno = "";
   
    if(milhares>0){
      retorno = milhares+""+separador_milhar+""+retorno;
    if(inteiros === 0){
      inteiros = "000";
    } else if(inteiros < 10){
      inteiros = "00"+inteiros; 
    } else if(inteiros < 100){
      inteiros = "0"+inteiros; 
    }
  }

  retorno += inteiros+""+separdor_decimal+""+centavos;
 
  return 'R$ ' + retorno;
}

module.exports = mongoose.model('Offer_Crawler', Offer_CrawlerSchema);


//mongoose.model('Offer',OfferSchema);