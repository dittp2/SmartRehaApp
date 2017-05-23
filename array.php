<?php


$arr = array(1,2,3,4,5,6);
$color = false;

foreach($arr as $val)
  if($color == false )
  echo <li class= li.red>$val</li>;
  $color = true;
  else if($color == true)
  echo <li class= li.blue>$val</li>;
  $color = false;


  ?>
