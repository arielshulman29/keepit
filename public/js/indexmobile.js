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
});
$('.add').click(addClick());
$('.add').dblclick(addClick());

$('.sub').click(subClick());
$('.sub').dblclick(subClick());

$('.hide-room').click(function () {
    let id = $(this).attr('id');
    $('#' + id + '.products').css('display', 'none');
    $('a#' + id).removeClass('active');
    $('a#' + id + ' i').removeClass('fa-minus');
    $('a#' + id + ' i').addClass('fa-plus');;
});
function toggleIcon(id) {
    let linkSelector = 'a.room#' + id + ' .toggle-icon i';
    $(linkSelector).toggleClass('fa-plus');
    $(linkSelector).toggleClass('fa-minus');
}
function addClick() {
    let idSelector = '#' + $(this).parent().attr('id');
    let quantitySelector = idSelector + ' input[type=button]';
    let areaSelector = idSelector + ' input[type=hidden][name=area]'
    let priceSelector = idSelector + ' input[type=hidden][name=price]';
    let roomSelector = idSelector + ' input[type=hidden][name=room]';
    var currentQuantity = Number($(quantitySelector).val());
    var area = Number($(areaSelector).val());
    var price = Number($(priceSelector).val());
    var roomId = $(roomSelector).val();
    // add quantity
    $(quantitySelector).val(function () {
        currentQuantity = currentQuantity + 1;
        return currentQuantity
    })
    let totalAreasQuery = 'a#' + roomId + ' span span.area, .sum-area-value';
    let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
    // add area 
    $(totalAreasQuery).text(function () {
        var currentArea = Number($(this).text());
        currentArea = currentArea + area;
        return currentArea;
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
function subClick() {
    let idSelector = '#' + $(this).parent().attr('id');
    let quantitySelector = idSelector + ' input[type=button]';
    let areaSelector = idSelector + ' input[type=hidden][name=area]'
    let priceSelector = idSelector + ' input[type=hidden][name=price]';
    let roomSelector = idSelector + ' input[type=hidden][name=room]';
    var currentQuantity = Number($(quantitySelector).val());
    var area = Number($(areaSelector).val());
    var price = Number($(priceSelector).val());
    var roomId = $(roomSelector).val();
    if (currentQuantity > 0) {
        // subtract quantity
        $(quantitySelector).val(function () {
            currentQuantity = currentQuantity - 1;
            return currentQuantity
        })
        let totalAreasQuery = 'a#' + roomId + ' span span.area, .sum-area-value';
        let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
        // subtract area 
        $(totalAreasQuery).text(function () {
            var currentArea = Number($(this).text());
            currentArea = currentArea - area;
            return currentArea;
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
