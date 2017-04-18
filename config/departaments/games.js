module.exports = {

	
	//departaments
	name:'games',

	//queries
	query:'playstation 4' + ',' +
			'xbox 360' + ',' +
			'playstation 3' + ',' +
			'nintendo wii u' + ',' +
			'nintendo wii' + ',' +
			'playstation 2' + ',' +
			'ps vita' + ',' +
			'ps' + ',' +
			'nintendo 3Ds' + ',' +
			'nintendo ds' + ',' +
			'jogos pc' + ',' +
			'jogos mac' + ',' +
			'tectoy' + ',' +
			'xbox one',

	// dictionaries 
	playstation_4:'merchantcategory=' + '' + '&' +
				'merchantcategory=' + '',

	xbox_360:'merchantcategory=' + '' + '&' +
			'merchantcategory=' + '',

	playstation_3:'merchantcategory=' + '' + '&' +
				'merchantcategory=' + '',

	nintendo_wii_u:'merchantcategory=' + '' + '&' +
				'merchantcategory=' + '',

	nintendo_wii:'merchantcategory=' + '' + '&' +
				'merchantcategory=' + '',

	playstation_2:'merchantcategory=' + '' + '&' +
				'merchantcategory=' + '',

	ps_vita:'merchantcategory=' + '' + '&' +
				'merchantcategory=' + '',

	ps:'merchantcategory=' + '' + '&' +
		'merchantcategory=' + '',

	nintendo_3Ds:'merchantcategory=' + '' + '&' +
		'merchantcategory=' + '',

	nintendo_ds:'merchantcategory=' + '' + '&' +
		'merchantcategory=' + '',

	jogos_pc:'merchantcategory=' + '' + '&' +
		'merchantcategory=' + '',

	jogos_mac:'merchantcategory=' + '' + '&' +
		'merchantcategory=' + '',

	tectoy:'merchantcategory=' + '' + '&' +
		'merchantcategory=' + '',


	get dictionary() {
        return this.playstation_4  +  '&' +
        this.xbox_360 + '&' + 
        this.nintendo_wii_u + '&' + 
        this.nintendo_wii + '&' + 
        this.playstation_2 + '&' + 
        this.ps_vita + '&' + 
        this.ps + '&' + 
        this.nintendo_3Ds + '&' + 
        this.nintendo_ds + '&' + 
        this.jogos_pc + '&' + 
        this.jogos_mac + '&' + 
        this.tectoy + '&' + 
        this.playstation_3;
    },
};