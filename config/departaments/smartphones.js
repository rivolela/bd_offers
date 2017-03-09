
module.exports = {


	name:'smartphones',


	//queries
	query:'iphone' + ',' +
			'motorola'  + ',' +
			'zenfone'  + ',' +
			'sony'  + ',' +
			'samsung galaxy',


	iphone:	'merchantcategory=' + 'Telefonia / Celulares e Smartphones / iPhones' + '&' +
			'merchantcategory=' + 'Telefonia' + '&' +
			'merchantcategory=' + 'Smartphones IOS' + '&' +
			'merchantcategory=' + 'Smartphones / Apple / iPhone SE' + '&' +
			'merchantcategory=' + 'Smartphones / Apple / iPhone 5S' + '&' +
			'merchantcategory=' + 'Smartphones / Apple / iPhone 6S' + '&' +
			'merchantcategory=' + 'Smartphones / Apple / iPhone 7' + '&' +
			'merchantcategory=' + 'iOS%20%26%20iPhone',


	motorola: 	'merchantcategory=' + 'Telefonia / Celulares e Smartphones / Smartphones' + '&' +
				'merchantcategory=' + 'Telefonia / Celulares e Smartphones / Celulares',


	samsung: 	'merchantcategory=' + 'Telefonia / Celulares e Smartphones / Smartphones' + '&' +
				'merchantcategory=' + 'Android' + '&' +
				'merchantcategory=' + 'Telefonia' + '&' +
				'merchantcategory=' + 'Telefonia / Celulares e Smartphones / Celulares' + '&' +
				'merchantcategory=' + 'Smartphones' + '&' +
				'merchantcategory=' + 'Smartphones / Samsung / Galaxy S7' + '&' +
				'merchantcategory=' + 'Smartphones / Samsung / Galaxy J' + '&' +
				'merchantcategory=' + 'Smartphones / Samsung / Galaxy A',


	zenfone: 	'merchantcategory=' + 'Telefonia / Celulares e Smartphones / Smartphones' + '&' +
				'merchantcategory=' + 'Mid' + '&' +
				'merchantcategory=' + 'Smartphones' + '&' +
				'merchantcategory=' + 'Smartphones / Asus / ZenFone 3' + '&' +
				'merchantcategory=' + 'Android' + '&' +
				'merchantcategory=' + 'Telefonia',


	sony: 	'merchantcategory=' + 'Telefonia / Celulares e Smartphones / Smartphones' + '&' +
			'merchantcategory=' + 'Smartphones' + '&' +
			'merchantcategory=' + 'Smartphones / Sony / Xperia' + '&' +
			'merchantcategory=' + 'Android' + '&' +
			'merchantcategory=' + 'Celulares' + '&' +
			'merchantcategory=' + 'Outros / Smartphones' + '&' +
			'merchantcategory=' + 'Premium' + '&' +
			'merchantcategory=' + 'Telefonia',


	// dictionaries 
	
	// dictionary:iphone  + '&' + 
	// 			motorola + '&' + 
	// 			zenfone + '&' + 
	// 			sony + '&' + 
	// 			samsung,

	get dictionary() {
        return this.iphone  + '&' + this.motorola + '&' + this.zenfone + '&' + this.sony + '&' + this.samsung;
    },
};


