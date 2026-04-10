<?php
	

/*
 * 
 * Carga de estilos del tema superior
 */

function theme_name_parent_styles() {
	
	// Enqueue de la hoja de estilos del tema superior
	wp_enqueue_style( 'theme-name-parent-style', get_template_directory_uri() . '/style.css', array(), '0.1', 'all' );
	
	// Enqueue de la hoja de estilos RTL del tema superior
	if ( is_rtl() ) {
		wp_enqueue_style( 'theme-name-parent-style-rtl', get_template_directory_uri() . '/rtl.css', array(), '0.1', 'all' );
	}
	
}
add_action( 'wp_enqueue_scripts', 'theme_name_parent_styles' );

function child_theme_styles() {
	wp_dequeue_style( 'parent-theme-style' );
	wp_enqueue_style( 'child-theme-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'child_theme_styles' );

/*
 * Cargamos la funciones de javascript
 * 
 */
// if(!function_exists("myRegistrerScripts")):
// 	function myRegistrerScripts(){
// 		wp_register_script('hide_news_featured', get_template_directory_uri()."/wp-content/themes/jupiter-child/functions.js");		
// 	}
// endif;
// add_action('wp_enqueue_scripts','myRegistrerScripts');

/*
 * Creación de plantilla FEED personalizada
 */
// function custom_rss_news(){
 
// 	if('news' === get_query_var('post_type')){
// 		get_template_part('feed','news');
// 	}else{
// 		get_template_part('feed','rss2');
// 	}
// }
// remove_all_actions('do_feed_rss2');
// add_action('do_feed_rss2','custom_rss_news',10,1);


function t5_default_widget_demo()
{
	// Register two sidebars.
	$sidebars = array ( 'a' => 'Top-widget' );
	foreach ( $sidebars as $sidebar )
	{
		register_sidebar(
			array (
				'name'          => $sidebar,
				'id'            => $sidebar,
				'before_widget' => '',
				'after_widget'  => ''
			)
		);
	}

	// We don't want to undo user changes, so we look for changes first.
	$active_widgets = get_option( 'sidebars_widgets' );

	if ( ! empty ( $active_widgets[ $sidebars['a'] ] )  )
	{   //There is already some content.
		return;
	}

	// The sidebars are empty, let's put something into them.
	// How about a RSS widget?

	// Note that widgets are numbered. We need a counter:
	$counter = 2;

	// RSS widget
	$active_widgets[ $sidebars[a] ][] = 'rss-' . $counter;

	$rss_content[ $counter ] = array (
		'title'        => 'RSS Tempel Group',
		'url'          => 'https://www.tempelgroup.com/?call_custom_simple_rss=1',
		'link'         => '',
		'items'        => 12,
		'show_summary' => 0,
		'show_author'  => 0,
		'show_date'    => 1,
	);
	update_option( 'widget_rss', $rss_content );

	// Now save the $active_widgets array.
	update_option( 'sidebars_widgets', $active_widgets );
}

add_action( 'widgets_init', 't5_default_widget_demo' );

function getCountryByIp2c($ip){
	
	//EJEMPLO EXTRAIDO DE http://about.ip2c.org/#examplephp
	
// 	$ip = '83.175.216.2'; //or any other IP here
// 	$s = file_get_contents('http://ip2c.org/'.$ip);
// 	switch($s[0])
// 	{
// 		case '0':
// 			echo 'Something wrong';
// 			break;
// 		case '1':
// 			$reply = explode(';',$s);
// 			echo '<br>Two-letter: '.$reply[1];
// 			echo '<br>Three-letter: '.$reply[2];
// 			echo '<br>Full name: '.$reply[3];
// 			break;
// 		case '2':
// 			echo 'Not found in database';
// 			break;
// 	}
	
	$data = file_get_contents('http://ip2c.org/'.$ip);
	
	$country = '';
	
	switch($data[0]){
		case '0':
			//Algún error
			break;
		case '1':
			$letter = explode(';',$data);
			
			$country = $letter[1];
			break;
		case '3':
			//No encontrado
			break;
	}
	
	return $country;
	
}

//Función para obtener todas la noticías de tempelgroup.com y mostralas como lista en el feed
if (!function_exists("listOfNews")):
	function listOfNews(){
		
		$array_news = array();
		
		$argumentos = array(
				'numberposts'=>15,
				'post_type'=>'news',
				'post_status'=>'publish',
				'orderby'=>'ID',
				'order'=>'DESC'
		);
		
		try{
			
			$array_news = get_posts($argumentos);
			
		}catch(Exception $e){
			if($e){
				
				echo 'Error!! al obtener todas las noticias'."\n";
				echo $e->getMessage();
				die();
			}
		}
		
		$html = "<ul>";
		
		foreach ( $array_news as $news){
			
			$html .= '<li><a href="'.$news['guid'].'">'.$news['post_title'].'</a></li>';
		}
		
		$html .= "</ul>";
		
		$listaNoticias = $html;
		
		echo $listaNoticias;
	}
endif;

function my_login_logo() { ?>
    <style type="text/css">
        
        body.login{
        	background-image: url(wp-content/uploads/revslider/slider_home_final/highlights_bg2.jpg);
        }
        
        #login h1 a, .login h1 a {
	        background-image: url(wp-content/uploads/2017/10/logo_cabecero_tempel.png);
			height:65px;
			width:320px;
			background-size: 320px 85px;
			background-repeat: no-repeat;
	        padding-bottom: 30px;
			background-position: center;
	        
        }
        
        #login #backtoblog a, #login #nav a{
			color: black;        
        }
                
        body.login aside{
                display: none;
        }
 
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );

function loginLogoLink(){ ?>

	<script type="text/javascript">

		document.addEventListener('DOMContentLoaded', function(){

			document.querySelector("#login h1 a").href = 'https://tempelgroup.com'; 
			
		}, false);
			
	</script>
	
<?php }

add_action('login_enqueue_scripts', 'loginLogoLink',$in_footer = true);

add_filter('weglot_words_translate', 'words_translate');
function words_translate($words){        
    $words[] = "Empresa";       
    $words[] = "Nombre y apellido";    
    $words[] = "Ciudad";
    $words[] = "Teléfono";
	$words[] = "Areas de Negocio"; 
	$words[] = "Asunto"; 
	$words[] = "Mensaje"; 
	$words[] = "He leído y acepto la Política de privacidad.";
	$words[] = "Esto es un campo obligatorio.";
	$words[] = "Introduce una dirección de correo electrónico válida.";
	$words[] = "Llena el código recaptcha";
	$words[] = "Corrige los errores antes de enviar este formulario.";
	$words[] = "Formulario enviado correctamente.";
	$words[] = "Un email de confirmación se ha enviado a";

    return $words;
}

add_filter( 'wp_nav_menu_items', 'custom_menu_weglot', 10, 2 );

function custom_menu_weglot( $items, $args ) {
	$items .= '<li class="menu_home menu-item menu-item-type-custom menu-item-object-custom no-mega-menu"><div id="weglot_here"></div></li>';
	return $items;
}









function cargar_react_app_evento() {
    if ( is_page_template( 'page-evento.php' ) ) {
        
        $url_app = get_stylesheet_directory_uri() . '/react-app/assets/';
        
        wp_enqueue_style(
            'react-app-styles', 
            $url_app . 'index-D3djkDTn.css', 
            array( 'mk-style', 'child-theme-style' ), // ← depende de Jupiter
            null,
            'all'
        );

        wp_enqueue_script(
            'react-app-js', 
            $url_app . 'index-DSeIDW74.js', 
            array(), 
            null, 
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'cargar_react_app_evento', 999 );

/**
 * FILTRO TYPE="MODULE"
 */
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if ( 'react-app-js' !== $handle ) {
        return $tag;
    }
    return '<script type="module" src="' . esc_url($src) . '"></script>';
}, 10, 3);

/**
 * RUTA DE ASSETS PARA VITE
 */
add_action('wp_head', function() {
    if ( is_page_template( 'page-evento.php' ) ) {
        // Esto le dice al navegador: "Si una ruta empieza por /assets/, búscala aquí"
        echo '<base href="' . get_stylesheet_directory_uri() . '/react-app/">';
    }
}, 1);



?>
