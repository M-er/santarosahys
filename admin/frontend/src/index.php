<?php
$xx=file("./inde.html");
foreach ($xx as $k=>$v) {
	if (strpos($v,"base href=\"")!==false) {
		$v=substr($v,0,strpos($v,"base href=\"")+11) . dirname($_SERVER['SCRIPT_NAME']) . "/\">\n";
	}
	echo $v;
}
print_r($_SERVER);
die();
?>