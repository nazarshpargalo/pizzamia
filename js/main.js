var card = {};

function init() {
	$.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
	console.log(data);
	var out = '';
	for (var key in data) {
		out += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">';
		out += '<div class="card">';
		out += '<img src="img/'+data[key].img+'">';
		out += '<h3>'+data[key].name+'</h3>';
		out += '<h4>Ціна: '+data[key].cost+'грн</h4>';
		out += '<p>'+data[key].description+'</p>';
		out += '<button class="btn btn-primary btn-lg add-to-card" data-id="'+key+'">Купити</button>';
		out += '</div>';
		out += '</div>';
	}
	$('.list').html(out);
	$('.add-to-card').on('click', addToCard);
}

function addToCard() {
	var id = $(this).attr('data-id');
	//console.log(id);
	if (card[id]==undefined) {
		card[id] = 1;
	} else {
		card[id]++;
	}
	//console.log(card);
	showMiniCard();
	saveCard();
}

function saveCard() {
	localStorage.setItem('cart', JSON.stringify(card));
}

function showMiniCard() {
	var out="";
	for (var key in card) {
		out += key +'---'+ card[key] +'<br>';
	}
	$('.mini-card').html(out);
}

function loadCard() {
	if (localStorage.getItem('cart')) {
		card = JSON.parse(localStorage.getItem('cart'));
		showMiniCard();
	}
}

$(document).ready( function () {
	init();
	loadCard();
});