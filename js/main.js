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
	showCard();
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
		showCard();
	}
}
function showCard() {
	$.getJSON("goods.json", function (data) {
		var goods = data;
		var out = '';
		for (var id in card) {
			out += '<div class="col-xl-offset-1 col-lg-offset-1 col-xl-4 col-lg-4 col-md-4 col-sm-6">';
			out += '<div class="horizontal checkcard">';
			out += '<button data-id="'+id+'" class="del_goods">x</button>';
			out += '<img src="img/'+goods[id].img+'">';
			out += '<h3>'+goods[id].name+'</h3>';
			out += card[id]*goods[id].cost+'грн';
			out += '<p>Кількість:'+card[id]+'</p><br>';
			out += '<button data-id="'+id+'" class="minus_goods">-</button>';
			out += '<button data-id="'+id+'" class="plus_goods">+</button>';
			out += '</div>';
			out += '</div>';
		}
		$('.main_card').html(out);
		$('.del_goods').on('click', delGoods);
		$('.plus_goods').on('click', plusGoods);
		$('.minus_goods').on('click', minusGoods);
	});
}

function delGoods() {
	var id = $(this).attr('data-id');
	delete card[id];
	showCard();
	saveCard();
}
function plusGoods() {
	var id = $(this).attr('data-id');
	card[id]++;
	showCard();
	saveCard();
}

function minusGoods() {
	var id = $(this).attr('data-id');
	if (card[id]==1) {
		delete card[id];
	} else {
		card[id]--;	
	}
	showCard();
	saveCard();
}

function isEmpty(object) {
	for (var key in object)
	if (object.hasOwnProperty(key)) return true;
	return false;
}

$(document).ready( function () {
	init();
	loadCard();
});