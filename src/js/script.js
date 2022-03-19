$(document).ready(function () {
	$(".pizza-form").submit(validateForm);
});

// Display Form Errors
const formError = (error) => {
	$(".error").text(error);
	$(".error-modal").fadeIn("medium");
	$(".close-error,.error-overlay").click(function () {
		$(".error-modal").fadeOut("medium");
	});
};

// Validate Form
const validateForm = (submit) => {
	submit.preventDefault();
	const toppings = $("input[type='checkbox']:checked");
	if (toppings.length === 0) return formError("Please select topping(s)");
	const dispatch = $("input[name='dispatch']:checked");
	if (dispatch.length === 0) return formError("Please select dispatch method");
};

// Create order request
const Order = function ()
