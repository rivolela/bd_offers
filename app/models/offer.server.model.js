var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StringUtile = require('../utile/string.server.utile.js');
var stringUtile = new StringUtile();
var CurrecyUtile = require('../utile/currency.server.utile.js');
var currencyUtile = new CurrecyUtile();


var OfferSchema = new Schema({
	name: {
    type:String,
    trim: true,
    index: true 
  },
  ean: Number,
  image_medium: String,
  image_large: String,
  price: {
    type:Number,
  },
  price_display:{
    type:String,
    set: currencyUtile.formatBrazilCurrency
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
  categoryBD: {
    type:String,
    index: true,
  },
  programGroup: String,
  minorPriceEAN:{
    type:String
  },
  nameURL: {
    type:String,
    set: stringUtile.makeslug
  },
  product:{
    type: Schema.ObjectId,
    ref: 'Product'
  }
});




// middleware to handle attributes before to save
OfferSchema.pre('save',function(next){
  
  // split merchant url offer thal will be used in crawler
  var url_01 = this.url.split('[[');
  console.log(url_01);
  var url_02 = url_01[1].split('?');
  console.log(url_02);

  this.urlOffer = url_02[0];
  
  next();
});


// index used to text search
OfferSchema.index(
  {name: 'text',manufacturer:'text',category:'text',categoryBD:'text'},
  {default_language: "portuguese"},
  {name: 'My text index', weights: {name: 10,categoryBD:3,category:2,manufacturer:1}
});



module.exports = mongoose.model('Offer', OfferSchema);


//mongoose.model('Offer',OfferSchema);