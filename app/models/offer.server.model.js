var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
	name: {
    type:String,
    trim: true,
    index: true 
  },
  ean: Number,
  image_medium: String,
  image_large: String,
  price: String,
  category: {
    type:String,
    index: true 
  },
  categoryBD: String,
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

OfferSchema.index({name: 'text',manufacturer:'text',category:'text'},
  {name: 'My text index', weights: {category: 10, name: 4, manufacturer: 2}});


module.exports = mongoose.model('Offer', OfferSchema);


//mongoose.model('Offer',OfferSchema);