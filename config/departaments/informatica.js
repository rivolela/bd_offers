
module.exports = {

	
	//departaments
	name:'informática',

	//queries
	query:'tablet' + ',' +
			'notebook' + ',' +
			'macbook' + ',' +
			'acessorios Informática' + ',' +
			'acessorios Apple' + ',' +
			'impressoras' + ',' +
			'multifuncionais' + ',' +
			'navegadores GPS' + ',' +
			'ipad',

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
			'merchantcategory=' + 'Notebook',

	acessoriosInformatica:'merchantcategory=' + 'Informática / Suprimentos / Acessórios' + '&' +
						'merchantcategory=' + 'Acessórios de Tecnologia / Acessório Periféricos Informática / Películas Protetoras' + '&' +
						'merchantcategory=' + 'Acessórios de Tecnologia / Acessório Periféricos Informática / Mochilas Bolsas e Capas' + '&' +
						'merchantcategory=' + 'Acessórios e Periféricos' + '&' +
						'merchantcategory=' + 'Acessórios para Celular' + '&' +
						'merchantcategory=' + 'Informatica / Acessorios / Pen Drive' + '&' +
						'merchantcategory=' + 'Informática' + '&' +
						'merchantcategory=' + 'Acessorios / InformÃ¡tica / Capa/Case',

	acessoriosApple:'merchantcategory=' + 'Acessórios de Tecnologia / Acessório Celulares Smartphones / Cabos' + '&' +
					'merchantcategory=' + 'Acessórios de Tecnologia / Acessório Celulares Smartphones / Capas e Estojos' + '&' +
					'merchantcategory=' + 'Acessórios de Tecnologia / Acessório Tablets / Películas' + '&' +
					'merchantcategory=' + 'Acessórios para Celular' + '&' +
					'merchantcategory=' + 'Acessórios p/ iPod' + '&' +
					'merchantcategory=' + 'Acessórios Apple' + '&' +
					'merchantcategory=' + 'Informática' + '&' +
					'merchantcategory=' + 'Acessórios de Tecnologia / Acessório Celulares Smartphones / Películas Protetoras',

	impressoras:'merchantcategory=' + 'Informática' + '&' +
				'merchantcategory=' + 'Acessórios e Periféricos' + '&' +
				'merchantcategory=' + 'Multifuncional' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Impressora' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Multifuncional' + '&' +
				'merchantcategory=' + 'Toners' + '&' +
				'merchantcategory=' + 'Cartuchos' + '&' +
				'merchantcategory=' + 'Informática / Impressão / Impressoras',

	multifuncionais:'merchantcategory=' + 'Informática' + '&' +
				'merchantcategory=' + 'Acessórios e Periféricos' + '&' +
				'merchantcategory=' + 'Multifuncional' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Impressora' + '&' +
				'merchantcategory=' + 'Informatica / Impressoras / Multifuncional' + '&' +
				'merchantcategory=' + 'Toners' + '&' +
				'merchantcategory=' + 'Cartuchos' + '&' +
				'merchantcategory=' + 'Informática / Impressão / Impressoras',

	navegadoresGPS:'merchantcategory=' + 'Automotivo / GPS e Acessórios / GPS' + '&' +
				'merchantcategory=' + 'GPS',


	get dictionary() {
        return this.tablet  +  '&' +
        this.notebook + '&' + 
        this.macbook + '&' + 
        this.acessoriosInformatica + '&' + 
        this.acessoriosApple + '&' + 
        this.impressoras + '&' + 
        this.multifuncionais + '&' + 
        this.navegadoresGPS;
    },
};

