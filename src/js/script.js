$(document).ready(function () {
	$(".pizza-form").submit(validateForm);
	$(".checkout").click(checkoutOrder);
	$(".back-home, .back-to-cart").click(navigationBtns);
	$(".place-order").click(getLocation);
	Order.prototype.getCosts = calcCost;
	$(".view-cart,.back").click(function () {
		$(".pizza-orderlist, .pizza-order").slideToggle("slow");
	});
});

// Order Price Object
const price = {
	size: { small: 300, medium: 500, large: 800 },
	crust: { stuffed: 100, crispy: 150, gf: 200 },
	delivery: 125,
	pickup: 0,
	toppings: { cheese: 50, onions: 30, tomatoes: 40, chicken: 100 },
	totalCost: 0,
	orders: [],
	order: function (order) {
		let toppings = 0;
		let eachToppingCost = [];
		for (const topping of order.toppings) {
			toppings += this.toppings[topping];
			eachToppingCost.push(`${topping}: ksh ${this.toppings[topping]}`);
		}
		const pizza = this.size[order.size] + this.crust[order.crust] + toppings;
		this.totalCost += total = pizza + this[order.dispatch];
		this.orders.push(order);
		return [total, pizza, [toppings, eachToppingCost], this[order.dispatch]];
	},
};

const validateForm = (submit) => {
	submit.preventDefault();
	let toppingInputs = $("input[type='checkbox']:checked");
	if (toppingInputs.length === 0) return formError("Please select topping(s)");
	const dispatch = $("input[name='dispatch']:checked");
	if (dispatch.length === 0) return formError("Please select dispatch process");
	const pizzaSize = $("#pizza-size").val();
	const pizzaCrust = $("#pizza-crust").val();
	const toppings = toppingInputs.map((i, input) => input.value);
	$(".view-cart").slideDown("slow");
	$(".pizza-form").trigger("reset");
	return orderList(new Order(pizzaSize, pizzaCrust, toppings, dispatch.val()));
};

// Display Form Errors
const formError = (error) => {
	$(".error").text(error);
	$(".error-modal").slideDown("slow");
	$(".close-error,.error-overlay").click(function () {
		return $(".error-modal").hide("fast");
	});
};

// Construct New Order
const Order = function (size, crust, toppings, dispatch) {
	this.size = size;
	this.crust = crust;
	this.toppings = toppings;
	this.dispatch = dispatch;
	this.orderNumber = (Math.random() * 1000000).toFixed();
	this.cost = this.getCosts();
};

// Append order item to the DOM order table
const orderList = (order) => {
	alertOrderPlaced();
	showOrderSummary(order);
	const orderItem = `
	<tr class="order-item">
		<td class="text-capitalize">${order.orderNumber}</td>
		<td class="text-capitalize">${order.size}: ksh ${price.size[order.size]}</td>
		<td class="text-capitalize">${order.crust}: ksh ${price.crust[order.crust]}</td>
		<td class="text-capitalize">${order.cost.toppings[1]}</td>
		<td class="text-capitalize">Ksh ${order.cost.pizza}</td>
	</tr>`;
	return $(".cart-items").append(orderItem);
};

// Display latest Order Item Summary
const showOrderSummary = (order) => {
	$(".cart-count").text(price.orders.length);
	$(".dispatch").text(order.dispatch);
	$(".dispatch-cost").text(order.cost.dispatch);
	$(".pizza-cost").text(order.cost.pizza);
	$(".total-cost").text(order.cost.total);
	$(".grand-total").text(price.totalCost);
};

const navigationBtns = (e) => {
	if (e.target.classList.contains("back-home")) {
		$(".pizza-order").slideDown("slow");
	} else {
		$(".pizza-orderlist").slideDown("slow");
	}
	$(".checkout-modal, .checkout-container, .feedback-container").slideUp(
		"slow"
	);
};

// Get order cost as an array and convert to object
const calcCost = function () {
	let cost = {};
	[cost.total, cost.pizza, cost.toppings, cost.dispatch] = price.order(this);
	return cost;
};

// Get Location Details
const getLocation = () => {
	const location = $("#location").val();
	if (location === "") return formError("Please enter delivery location");
	if (location.length < 8) return formError("Location name is too short");
	Order.prototype.location = location;
	$(".dispatch-location").text(location);
	$(".checkout-container, .feedback-container").slideToggle("slow");
};

// Display Order Confirmation
const alertOrderPlaced = () => {
	$(".error-overlay").css("z-index", "0");
	formError("Order placed successfully. Go to view cart items");
	$(".error-overlay").css("z-index", "3");
	return $(".error-modal").slideUp("slow");
};

const checkoutOrder = () => {
	for (const order of price.orders) {
		if (order.dispatch === "delivery" && !order.location)
			return $(
				".checkout-modal, .checkout-container, .pizza-orderlist"
			).slideToggle("slow");
	}
	$(".checkout-modal, .feedback-container, .pizza-orderlist").slideToggle(
		"slow"
	);
};
