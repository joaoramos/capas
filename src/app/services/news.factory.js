'use strict';

angular.module('n')
  .factory('News', ['$q', '$http', function ($q, $http) {
  	return {

  		/*
  				Returns news sources
  		 */
  		
  		getSources: function() {

  			var deferred = $q.defer();

  			var today = (function() {
  				var currentDay = new Date();
					var dd = currentDay.getDate();
					var mm = currentDay.getMonth()+1;
					var yyyy = currentDay.getFullYear();

					if (dd<10) { dd = '0'+dd; }
					if (mm<10) { mm = '0'+mm; }

					currentDay = {
						'normal': dd+'-'+mm+'-'+yyyy,
						'slashes': yyyy+'/'+mm+'/'+dd,
						'none': yyyy+mm+dd
					};
					
					return currentDay;
  			})();

  			var sources = [
		      {
		        name: 'Público',
		        icon: 'http://www.publico.pt/favicon.ico',
		        // cover: 'http://imagens.publico.pt/imagens.aspx/'+today.slashes+'/Publico%20Porto/Publico_Porto-'+today.none+'.jpg?tp=ARQUIVO&w=900&h=1130&act=cropResize',
		        cover: 'http://www.sempreonline.net/images/capas/publico/publico-'+today.normal+'.jpg',
		        url: 'http://feeds.feedburner.com/PublicoRSS'
		      },
		      {
		        name: 'iOnline',
		        icon: 'http://ionline.pt/favicon.ico',
		        cover: 'http://www.sempreonline.net/images/capas/jornal-i/jornal-i-'+today.normal+'.jpg',
		        url: 'http://feeds.feedburner.com/jornali'
		      },
		      {
		        name: 'Expresso',
		        icon: 'http://expresso.sapo.pt/favicon.ico',
		        cover: 'http://www.sempreonline.net/images/capas/expresso/expresso-'+today.normal+'.jpg',
		        url: 'http://expresso.sapo.pt/static/rss/atualidade--arquivo_23412.xml'
		      },
		      {
		        name: 'Observador',
		        icon: 'http://cdn2.obsnocookie.com/wp-content/themes/observador/assets/build/img/favicon.ico',
		        url: 'http://observador.pt/feed/'
		      },
		      {
		        name: 'Abola',
		        icon: 'http://www.abola.pt/img/layout/favicon.ico',
		        cover: 'http://www.sempreonline.net/images/capas/a-bola/a-bola-'+today.normal+'.jpg',
		        url: 'http://rss.feedsportal.com/c/32502/f/480420/index.rss'
		      },
		      {
		      	name: 'Sol',
		      	icon: 'http://sol.pt/favicon.ico',
		      	cover: 'http://www.sempreonline.net/images/capas/sol/sol-'+today.normal+'.jpg',
		      	url: 'http://sol.pt/RSS/'
		      },
		      {
		      	name: 'Jornal de Notícias',
		      	icon: 'http://www.jn.pt/favicon.ico',
		      	cover: 'http://www.sempreonline.net/images/capas/jornal-de-noticias/jornal-de-noticias-'+today.normal+'.jpg',
		      	url: 'http://feeds.jn.pt/JN-ULTIMAS'
		      },
		      {
		      	name: 'Diário de Notícias',
		      	icon: 'http://www.dn.pt/favicon.ico',
		      	cover: 'http://www.sempreonline.net/images/capas/diario-de-noticias/diario-de-noticias-'+today.normal+'.jpg',
		      	url: 'http://feeds.dn.pt/DN-Ultimas'
		      },
		      {
		      	name: 'Visão',
		      	icon: 'http://visao.sapo.pt/favicon.ico',
		      	cover: 'http://www.sempreonline.net/images/capas/visao/visao-'+today.normal+'.jpg',
		      	url: 'http://visao.sapo.pt/static/rss/visao-geral.xml'
		      },
		      {
		      	name: 'Sábado',
		      	icon: 'http://www.sabado.pt/favicon.ico',
		      	cover: 'http://www.sempreonline.net/images/capas/sabado/sabado-'+today.normal+'.jpg',
		      	url: 'http://www.sabado.pt/rss.html'
		      }
		    ];

		    deferred.resolve(sources);

				return deferred.promise;
						    
  		},

  		/*
  				Returns JSON for a given source
  		 */
  		
  		getFeed: function(source) {
  			return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(source));
  		}
  	};
  }]);
