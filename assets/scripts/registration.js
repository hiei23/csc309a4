function validationForm(){
	var pw = $("#password input").val();
	var cfpw = $("#cfpassword input").val();
	//just an example here
	if(pw != cfpw){
		var error = "";
		error += "Please enter the same password."
		$("#error_mes").text(error);
		//may change form attributes here like height
		$("main").css("height","600px");
		$("#error_mes").show();
		$("#error_mes").css({
			"top":"530px",
			"border":"1px solid pink",
			"padding":"5px",
			"border-radius":"4px"
		});
		return false;
	}
}
		
