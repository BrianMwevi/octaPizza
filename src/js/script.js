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
	let toppings = $("input[type='checkbox']:checked");
	if (toppings.length === 0) return formError("Please select topping(s)");
	const dispatch = $("input[name='dispatch']:checked");
	if (dispatch.length === 0) return formError("Please select dispatch method");
	const pizzaSize = $("#pizza-size").val();
	const pizzaCrust = $("#pizza-crust").val();
	toppings = toppings.map((topping) => toppings[topping].value);
	console.log(new Order(pizzaSize, pizzaCrust, toppings, dispatch));
};

// Construct a New Order
const Order = function (size, crust, toppings, dispatch) {
	this.size = size;
	this.crust = crust;
	this.toppings = toppings;
	this.dispatch = dispatch;
};


// Display Order List
