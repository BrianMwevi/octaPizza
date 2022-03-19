$(document).ready(function () {
	$(".pizza-form").submit(validateForm);
});
let countOrders = 0;

// Prices
const price = {
	size: {
		small: 300,
		medium: 500,
		large: 800,
	},
	crust: {
		stuffed: 100,
		crispy: 150,
		gf: 200,
	},
	delivery: 150,
	pickup: 0,
	toppings: {
		pepperoni: 80,
		onions: 30,
		tomatoes: 40,
		chicken: 100,
	},
	toppingsPrice: function (toppingsArray) {
		let cost = 0;
		for (const topping of toppingsArray) {
			cost += this.toppings[topping];
		}
		return cost;
	},
};

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
	const dispatch = $("input[name='dispatch']:checked").val();
	if (dispatch.length === 0) return formError("Please select dispatch method");
	const pizzaSize = $("#pizza-size").val();
	const pizzaCrust = $("#pizza-crust").val();
	toppings = toppings.map((topping) => toppings[topping].value);
	const order = new Order(pizzaSize, pizzaCrust, toppings, dispatch);
	Order.prototype.cost = caclCost;
	console.log(order.cost());
};
const caclCost = function () {
	return (
		price.size[this.size] +
		price.crust[this.crust] +
		price.toppingsPrice(this.toppings) +
		price[this.dispatch]
	);
};
// Construct a New Order
const Order = function (size, crust, toppings, dispatch) {
	this.size = size;
	this.crust = crust;
	this.toppings = toppings;
	this.dispatch = dispatch;
};
