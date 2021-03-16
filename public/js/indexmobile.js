$('a.room').click(function () {
    toggleIcon($('.active').attr('id'));
    if ($(this).hasClass('active')) {
        $('div.products').hide();
        $(this).removeClass("active");
    }
    else {
        $('.active').removeClass("active");
        $(this).addClass("active");
        $('div.products').show();
        var id = $(this).attr('id');
        toggleIcon(id);
        var priceSelector = 'a#' + id + ' input[type=hidden][name=price-per-room]';
        var pricePerRoom = $(priceSelector).val();
        let filterOtherClass = ':not(#' + id + ')';
        $('div.products').filter(filterOtherClass).css('display', 'none');
        $('.show-price-per-room').text(pricePerRoom);
        if (pricePerRoom == 0) {
            $('div.hide-room' + id).hide();
        }
        else {
            $('div.hide-room' + id).show();
        }
    }
    $('.furniture-single:visible').first().css("border-top-color", "white");
});

$('.add').click(function () {
    const furnitureId = $(this).parent().attr('id');
    addQuantity(furnitureId);
    $('.changeQuantityClick').removeClass('changeQuantityClick');
    $(this).addClass('changeQuantityClick');
});

$('.add').dblclick(function () {
    const furnitureId = $(this).parent().attr('id');
    addQuantity(furnitureId);
    $('.changeQuantityClick').removeClass('changeQuantityClick');
    $(this).addClass('changeQuantityClick');
});

$('.sub').click(function () {
    const furnitureId = $(this).parent().attr('id');
    subQuantity(furnitureId);
    $('.changeQuantityClick').removeClass('changeQuantityClick');
    $(this).addClass('changeQuantityClick');
});

$('.sub').dblclick(function () {
    const furnitureId = $(this).parent().attr('id');
    subQuantity(furnitureId);
    $('.changeQuantityClick').removeClass('changeQuantityClick');
    $(this).addClass('changeQuantityClick');
});

$('.hide-room').click(function () {
    let id = $(this).attr('id');
    $('.products:visible').css('display', 'none');
    $('a#' + id).removeClass('active');
    $('a#' + id + ' i').removeClass('fa-minus');
    $('a#' + id + ' i').addClass('fa-plus');;
});

$('#openForm').click(function(){
    $('#contactForm').removeClass('d-none');
    var newPosition=$('#contactForm').offset();
    $('html, body').stop().animate({ scrollTop: newPosition.top }, 50);
    $('input[type=text][name=name]').focus();
})
function toggleIcon(id) {
    let linkSelector = 'a.room#' + id + ' .toggle-icon i';
    $(linkSelector).toggleClass('fa-plus');
    $(linkSelector).toggleClass('fa-minus');
}
function deleteTopBorder() {
    $('.active').children().first().css('border-top', 'white')
}
function addQuantity(id) {
    let roomSelector = '#' + id + ' input[type=hidden][name=room]';
    roomId = $(roomSelector).val();
    let idSelector = 'div.products#' + roomId + ' div.furniture-single.' + id;
    let myItemsSelector = 'div.furniture-single.' + id;
    $(myItemsSelector).removeClass('d-none');
    let quantitySelector = idSelector + ' input[type=button] ,' + myItemsSelector + ' input[type=button]';
    let areaSelector = idSelector + ' input[type=hidden][name=area]'
    let priceSelector = idSelector + ' input[type=hidden][name=price]';
    let currentQuantity = Number($(quantitySelector).val());
    var area = Number($(areaSelector).val());
    var price = Number($(priceSelector).val());
    // add quantity
    $(quantitySelector).val(function () {
        return currentQuantity + 1;
    })    
    $('.changeQuantity').removeClass('changeQuantity');
    $(quantitySelector).addClass('changeQuantity');
    let totalAreasQuery = 'a#' + roomId + ' span span.area, #totalArea';
    let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
    // add area 
    $(totalAreasQuery).text(function () {
        var currentArea = Number($(this).text());
        currentArea = currentArea + area;
        return Math.round((currentArea + Number.EPSILON) * 100) / 100;
    });
    $('#sendArea').val(function () {
        var currentArea = Number($(this).val());
        currentArea = currentArea + area;
        return Math.round((currentArea + Number.EPSILON) * 100) / 100;
    });
    // add price 
    $(totalPriceQuery).val(function () {
        var CurrentPrice = Number($(this).val());
        CurrentPrice = CurrentPrice + price;
        return CurrentPrice;
    });
    //show added price
    $('.show-price-per-room').text(function () {
        return $(totalPriceQuery).val();
    })
    // add price to total
    $('.sum-price-value').text(function () {
        var CurrentPrice = Number($(this).text());
        CurrentPrice = CurrentPrice + price;
        return CurrentPrice;
    });
}
function subQuantity(id) {
    let roomSelector = '#' + id + ' input[type=hidden][name=room]';
    roomId = $(roomSelector).val();
    let idSelector = 'div.products#' + roomId + ' div.furniture-single.' + id;
    let myItemsSelector = 'div.furniture-single.' + id;
    let quantitySelector = idSelector + ' input[type=button] ,' + myItemsSelector + ' input[type=button]';
    let areaSelector = idSelector + ' input[type=hidden][name=area]'
    let priceSelector = idSelector + ' input[type=hidden][name=price]';
    var currentQuantity = Number($(quantitySelector).val());
    var area = Number($(areaSelector).val());
    var price = Number($(priceSelector).val());
    if (currentQuantity > 0) {
        // subtract quantity
        $(quantitySelector).val(function () {
            return currentQuantity - 1;
        })
        $('.changeQuantity').removeClass('changeQuantity');
        $(quantitySelector).addClass('changeQuantity');
        let totalAreasQuery = 'a#' + roomId + ' span span.area, #totalArea';
        let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
        // subtract area 
        $(totalAreasQuery).text(function () {
            var currentArea = Number($(this).text());
            currentArea = currentArea - area;
            return Math.round((currentArea + Number.EPSILON) * 100) / 100;
        });

        $('#sendArea').val(function () {
            var currentArea = Number($(this).val());
            currentArea = currentArea - area;
            return Math.round((currentArea + Number.EPSILON) * 100) / 100;
        });
        // subtract price 
        $(totalPriceQuery).val(function () {
            var CurrentPrice = Number($(this).val());
            CurrentPrice = CurrentPrice - price;
            return CurrentPrice;
        });
        //show subtracted price
        $('.show-price-per-room').text(function () {
            return $(totalPriceQuery).val();
        })
        // subtract price from total
        $('.sum-price-value').text(function () {
            var CurrentPrice = Number($(this).text());
            CurrentPrice = CurrentPrice - price;
            return CurrentPrice;
        });
    }
}

