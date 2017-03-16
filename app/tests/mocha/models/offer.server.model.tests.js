var app = require('../../../../server.js'),
	async = require('async'),
 	mongoose = require('mongoose'),
 	OfferSchema = require('../../../models/offer.server.model'),
 	Offer = mongoose.model( 'Offer', OfferSchema),
 	ProductSchema = require('../../../models/product.server.model'),
 	Product = mongoose.model( 'Product', ProductSchema),
 	should = require('should');



describe('Offer Model Unit Tests:',function(){

	before(function(done){

		product_01 = new Product({
			name: 'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
			ean: 7892597336616,
			manufacturer: 'Motorola',
			image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10538240-250-250',
			departamentBD: "smartphones",
			countSad: 9,
  			countHappy: 71,
  			totalReviews: 80,
  			nameURL:'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
		});

		offer_01 = new Offer({
			urlOffer: '3710008/sk',
			name: 'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
			ean: 7892597336616,
			category: 'Telefonia / Celulares e Smartphones / Smartphones',
			merchantProductId: '3710008',
			url: 'http://ad.zanox.com/ppc/?41049933C87969835&ULP=[[3710008/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]',
			manufacturer: 'Motorola',
			image_medium: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10538240-250-250',
			price: 1799,
			price_display: "R$ 1.799,00",
			advertiser: "Walmart BR",
			departamentBD: "smartphones",
			programGroup: "group_all",
			countSad: 9,
  			countHappy: 71,
  			totalReviews: 80,
		});

		offer_02 = new Offer({
			urlOffer: '1929076/sk',
			name: 'Smartphone Motorola Moto X (2ª Geração) XT1097 Preto Single Chip Android 4.4.4 4G Wi-Fi Tela 5.2\" 32GB',
			ean: 7892597336616,
			category: 'Telefonia / Celulares e Smartphones / Smartphones',
			merchantProductId: '1929076',
			url: 'http://ad.zanox.com/ppc/?41049933C87969835&ULP=[[1929076/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]',
			manufacturer: 'Motorola',
			image_medium: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10538240-250-250',
			price: 999.9,
			price_display: "R$ 999,90",
			advertiser: "Walmart BR",
			departamentBD: "smartphones",
			programGroup: "group_all",
			countSad: 9,
  			countHappy: 71,
  			totalReviews: 80,
		});

		async.series([
			function(callback) {
    			product_01.save(function(){
    				callback(null, 'product_01 saved >>');
				});
    		},
    		function(callback) {
    			offer_01.product = product_01;
    			offer_01.save(function(){
    				callback(null, 'offer_01 saved >>');
				});
    		},
    		function(callback) {
    			offer_02.product = product_01;
    			offer_02.save(function(){
    				callback(null, 'offer_02 saved >>');
				});
    		}
		],
		// optional callback
		function(err, results) {
			console.log("results >>",results);
			done();
		    // results is now equal to ['one', 'two']
		});
		
	});


	describe('Testing the get minor price method >>',function(){
		it('Should return the price`s value ==  999.9',function(){
		    Offer.aggregate([
					{$match : {ean:7892597336616}},
					{$group : {_id : "$ean",menor_preco:{$min:"$price"}}}
			],
			function (err, result) {
				result[0].menor_preco.should.be.equal(999.9);	
		    });
		});
	});


	describe('test get product from offer >>',function(){
		it('Should be able to get the product_01 name from offer_01',function(){
			Offer.find({ean:7892597336616}).populate('product','name').exec(function(err,offers){
				offers[0].product.name.should.be.equal('Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g');
			});
		});
	});


	after(function(done){
		Product.remove({},function(){
			Offer.remove({},function(){
				done();
			});
		});
	});
});

