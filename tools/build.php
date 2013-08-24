/**
 * 
 */

window.cjnoyessw = window.cjnoyessw || {};

(function () {

var __360DEGREES = 21600;

<?php

$files = 'configuration,datacalc,drawables,cartwheel,loader';
$ary = explode(',',$files);

foreach ($ary as $file) {

   $src= file_get_contents('src/' . $file . '.js');
   echo $src;
}


?>

}());


