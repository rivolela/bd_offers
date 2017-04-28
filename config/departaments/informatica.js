
module.exports = {

	
	//departaments
	name:'informática',

	//queries
	query:'tablet' + ',' +
			'notebook' + ',' +
			'macbook apple' + ',' +
			'impressoras' + ',' +
			'multifuncionais' + ',' +
			'navegador GPS' + ',' +
			'ipad apple',

	// dictionaries 
	tablet:'merchantcategory=' + 'Tablets / iPads e Tablets / Tablets' + '&' +
			'merchantcategory=' + 'Informatica / Tablets / Tablet' + '&' +
			'merchantcategory=' + 'Tablet Android' + '&' +
			'merchantcategory=' + 'Notebooks Infantis' + '&' +
			'merchantcategory=' + 'Diversão' + '&' +
			'merchantcategory=' + 'Tablet Windows' + '&' +
			'merchantcategory=' + 'Notebooks Infantis' + '&' +
			'merchantcategory=' + 'Tablet Infantil' + '&' +
			'merchantcategory=' + 'Informática' + '&' +
			'merchantcategory=' + 'Tablet / Wi-fi / + / 3g' + '&' +
			'merchantcategory=' + 'Tablet / Wi-fi / + / 4g' + '&' +
			'merchantcategory=' + 'Eletronicos' + '&' +
			'merchantcategory=' + 'Escolha por Marca',

	ipad:'merchantcategory=' + 'Tablets / iPads e Tablets / Tablets' + '&' +
			'merchantcategory=' + 'Tablets / iPads e Tablets / iPads' + '&' +
			'merchantcategory=' + 'Tablet iOS-iPad' + '&' +
			'merchantcategory=' + 'Informática' + '&' +
			'merchantcategory=' + 'pad / Mini / Wi-fi / + / 3g / & / 4g',

	notebook:'merchantcategory=' + 'Informática / Notebooks e Conversíveis / Notebooks' + '&' +
				'merchantcategory=' + 'Notebooks & Ultrabooks' + '&' +
				'merchantcategory=' + 'Informatica / Notebooks / Intel Celeron' + '&' +
				'merchantcategory=' + 'Informatica / Notebooks / Intel Core i3' + '&' +
				'merchantcategory=' + 'Informatica / Notebooks / Intel Core i5' + '&' +
				'merchantcategory=' + 'Informatica / Notebooks / Intel Core i7' + '&' +
				'merchantcategory=' + 'Notebook' + '&' +
				'merchantcategory=' + 'Nb / - / Core / I7' + '&' +
				'merchantcategory=' + 'Nb / - / Core / I3' + '&' +
				'merchantcategory=' + 'Nb / - / Core / I5' + '&' +
				'merchantcategory=' + 'Nb / - / Core / I7' + '&' +
				'merchantcategory=' + '2 / Em / 1 / - / Core / I3' + '&' +
				'merchantcategory=' + '2 / Em / 1 / - / Core / I5' + '&' +
				'merchantcategory=' + '2 / Em / 1 / - / Core / I7' + '&' +
				'merchantcategory=' + 'pad / Mini / Wi-fi / + / 3g / & / 4g',

	macbook:'merchantcategory=' + 'Informática / Notebooks e Conversíveis / Notebooks' + '&' +
			'merchantcategory=' + 'Mochilas para Notebook' + '&' +
			'merchantcategory=' + 'Informática' + '&' +
			'merchantcategory=' + 'Notebook',


	impressoras:'merchantcategory=' + 'Jato de Tinta' + '&' +
				'merchantcategory=' + 'Laser Monocromática' + '&' +
				'merchantcategory=' + 'Laser Colorida' + '&' +
				'merchantcategory=' + 'Laser P&B' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Multifuncional' + '&' +
				'merchantcategory=' + 'Informática' + '&' +
				'merchantcategory=' + 'Informática / Impressão / Impressoras' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Impressora',


	multifuncionais:'merchantcategory=' + 'Informática' + '&' +
				'merchantcategory=' + 'Acessórios e Periféricos' + '&' +
				'merchantcategory=' + 'Multifuncional' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Impressora' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Multifuncional' + '&' +
				'merchantcategory=' + 'Informática / Impressão / Impressoras',

	navegadoresGPS:'merchantcategory=' + 'Automotivo / GPS e Acessórios / GPS' + '&' +
				'merchantcategory=' + 'Automotivo / GPS / GPS' + '&' +
				'merchantcategory=' + 'Esporte-e-Lazer / GPS Esportivo / GPS' + '&' +
				'merchantcategory=' + 'Informática' + '&' +
				'merchantcategory=' + 'GPS',


	get dictionary() {
        return this.tablet  +  '&' +
        this.notebook + '&' + 
        this.macbook + '&' + 
        this.impressoras + '&' + 
        this.multifuncionais + '&' + 
        this.ipad + '&' + 
        this.navegadoresGPS;
    },
};

