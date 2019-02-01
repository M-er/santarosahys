$(document).ready(function () {
	if (window.location.href.indexOf("micrositio-") > -1) {
		$("#header").load("../../paginas/utils/header-micrositio.html");
		$("#footer").load("../../paginas/utils/footer-micrositio.html");
	} else {
		$("#header").load("../paginas/utils/header.html");
		$("#footer").load("../paginas/utils/footer.html");
	}

});
