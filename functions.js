/*
 *
 * FUNCIONES JS PARA LA REACREACIÓN DE EFECTOS CON LAS DESCRIPCIONES
 *
 * BY: ROM TEMPEL
 */
	
	

/* Función para cambiar el estilo de los iconos de redes sociales */
function change_icon_size(){
	jQuery(document).ready(function(){
		jQuery('.mk-svg-icon').css({
			'width':'25px',
			'height':'25px'
		});
		
	});	
}

/*function hide_news_featured(){
	jQuery(document).ready(function(){
		
		jQuery('.news-featured-image').hide();
	});
}

*/


/* Función para cambiar el icono del rss rss-widget-icon por el texto: Todas las noticias */
function change_icon_rss(){
	jQuery(document).ready(function(){
		jQuery('.widgettitle').css('display','none');
	});
}

/* Función para activar la marca de enlace en el menú proyectos cuando las urls esten en proyectos */
function activateLink(){
	jQuery(document).ready(function(){
		
		var enlace_proyectos = jQuery('li#menu-item-4195 > a.menu-item-link.js-smooth-scroll');
			
		enlace_proyectos.css({
			"border-bottom":"4px solid grey",
			"width":"auto",
			"margin-top":"-3px"
		});
	});
}

/* Función para obtener las últimas noticias publicacdas */
function obtainNews(){
	jQuery(document).ready(function(){
		
		jQuery.ajax({
	           url: '/wp-content/themes/jupiter-child/obtainNews.php',
	           type: 'POST',
	           success: function(data){
	               jQuery('#listaNoticias').html(data);
	           } 

	       });
		
		
	});
	
}


