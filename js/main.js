var card = {};

function init() {
	$.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
	var out = '';
	for (var key in data) {
		out += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">';
		out += '<div class="card">';
		out += '<img src="img/'+data[key].img+'">';
		out += '<div class="textblock">';
		out += '<h3>'+data[key].name+'</h3>';
		out += '<h4>Ціна: '+data[key].cost+'грн</h4>';
		out += '<p>'+data[key].description+'</p>';
		out += '<button class="btn btn-primary btn-lg add-to-card" data-id="'+key+'">Купити</button>';
		out += '</div>';
		out += '</div>';
		out += '</div>';
	}
	$('.list').html(out);
	$('.add-to-card').on('click', addToCard);
}

function addToCard() {
	var id = $(this).attr('data-id');
	if (card[id]==undefined) {
		card[id] = 1;
	} else {
		card[id]++;
	}
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
			out += '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">';
			out += '<div class="horizontal checkcard row">';
			out += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1"><button data-id="'+id+'" class="del_goods btn-danger"><i class="fas fa-trash-alt"></i></button></div>';
			out += '<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><h3>'+goods[id].name+'</h3></div>';
			out += '<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><p>'+card[id]*goods[id].cost+'грн'+'</p></div>';
			out += '<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><p>Кількість:'+card[id]+'</p></div>';
			out += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1"><button data-id="'+id+'" class="minus_goods btn-danger"><i class="fas fa-minus-square"></i></button></div>';
			out += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1"><button data-id="'+id+'" class="plus_goods btn-default"><i class="fas fa-plus-square"></i></button></div>';
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

(function($) {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    $('#mainNav').affix({
        offset: {
            top: 60
        }
    })
})(jQuery);

  function slowScroll (id) {
    var offset = 0;
    $('html, body').animate ({
      scrollTop: $(id).offset ().top - offset
    }, 800);
    return false;
  }