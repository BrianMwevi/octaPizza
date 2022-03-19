$(document).ready(function () {
	$(".pizza-form").submit(validateForm);
	$(".checkout").click(showOrderList)
});

let countOrders = 0;
let totalCost = 0;
let orderList = [];

// Price Object
const price = {
	size: { small: 300, medium: 500, large: 800 },
	crust: { stuffed: 100, crispy: 150, gf: 200 },
	delivery: 150,
	pickup: 0,
	toppings: { pepperoni: 80, onions: 30, tomatoes: 40, chicken: 100 },
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

const validateForm = (submit) => {
	submit.preventDefault();
	let toppings = $("input[type='checkbox']:checked");
	if (toppings.length === 0) return formError("Please select topping(s)");
	const dispatch = $("input[name='dispatch']:checked").val();
	if (dispatch.length === 0) return formError("Please select dispatch method");
	const pizzaSize = $("#pizza-size").val();
	const pizzaCrust = $("#pizza-crust").val();
	toppings = toppings.map((index, input) => input.value);
	return orderSummary(new Order(pizzaSize, pizzaCrust, toppings, dispatch));
};

// Display latest Order Summary
const orderSummary = (order) => {
	$(".cart-count").text((countOrders += 1));
	$(".pizza-size").text(order.size);
	$(".pizza-crust").text(order.crust);
	$(".pizza-toppings").text(price.toppingsPrice[order.toppings]);
	$(".dispatch-cost").text(price[order.dispatch]);
	$(".dispatch").text(order.dispatch);
	$(".pizza-cost").text(order.getCost());
	let toppings = [];
	for (let topping of order.toppings) {
		toppings.push(topping);
	}
	orderList.push(`
	<tbody>
		<tr>
			<td scope="row">${countOrders}</td>
			<td>${order.size}</td><td>${order.crust}</td>
			<td>${toppings}</td>
			<td>Ksh ${order.getCost()}</td>
		</tr>
	</tbody>`);
};

// Order Prototype method
const calcCost = function () {
	return (
		price.size[this.size] +
		price.crust[this.crust] +
		price.toppingsPrice(this.toppings) +
		price[this.dispatch]
	);
};

// New Order Constructor
const Order = function (size, crust, toppings, dispatch) {
	this.size = size;
	this.crust = crust;
	this.toppings = toppings;
	this.dispatch = dispatch;
};

Order.prototype.getCost = calcCost;

const showOrderList = () => {
	
	$(".cart-items tbody").remove()
	orderList.forEach((order) => $(".cart-items").append(order));
};
