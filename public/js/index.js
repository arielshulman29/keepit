$(document).ready(function () {
    const id = $('.active').attr('id');
    let filterOtherClass = ':not(#' + id + ')';
    $('div.furniture').filter(filterOtherClass).css('display', 'none');
})
$('a.room').click(function () {
    $('.active').removeClass("active");
    $(this).addClass("active");
    $('div.furniture').show();
    var id = $(this).attr('id');
    var titleSelector = 'a#' + id + ' .title';
    var priceSelector = 'a#' + id + ' input[type=hidden][name=price-per-room]';
    var pricePerRoom = $(priceSelector).val();
    let filterOtherClass = ':not(#' + id + ')';
    $('div.furniture').filter(filterOtherClass).css('display', 'none');
    $('.show-price-per-room').text(pricePerRoom);
    deleteTopBorders();
    $('.room-name').text(function () {
        return $(titleSelector).text();
    })
    $('input[type=hidden][name=room-id]').val(function () {
        return id;
    })
    if (pricePerRoom === 0) {
        $('span#hideEmptyButton').hide();
    }
    toggleMenu();
});
$('.add').click(function () {
    let dataDiv = '#' + $(this).parent().attr('id');
    let quantitySelector = dataDiv + ' input[type=button]';
    let areaSelector = dataDiv + ' input[type=hidden][name=area]'
    let priceSelector = dataDiv + ' input[type=hidden][name=price]';
    let roomSelector = dataDiv + ' input[type=hidden][name=room]';
    var currentQuantity = Number($(quantitySelector).val());
    var area = Number($(areaSelector).val());
    var price = Number($(priceSelector).val());
    var roomId = $(roomSelector).val();
    $('span#hideEmptyButton').show();
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
        currentArea = Number(currentArea + area);
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

});
$('.sub').click(function () {
    let dataDiv = '#' + $(this).parent().attr('id');
    let quantitySelector = dataDiv + ' input[type=button]';
    let areaSelector = dataDiv + ' input[type=hidden][name=area]'
    let priceSelector = dataDiv + ' input[type=hidden][name=price]';
    let roomSelector = dataDiv + ' input[type=hidden][name=room]';
    var currentQuantity = Number($(quantitySelector).val());
    var area = Number($(areaSelector).val());
    var price = Number($(priceSelector).val());
    var roomId = $(roomSelector).val();
    console.log(area);
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
            currentArea = Number(currentArea - area);
            if (currentArea == 0) {
                $('span#hideEmptyButton').hide();
            }
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
});
$('#emptyRoomBtn').click(function () {
    var sumArea = Number($('.sum-area-value').text());
    var roomId = $(this).next().val();
    let roomAreaSelector = 'a#' + roomId + ' span span.area';
    var roomArea = Number($(roomAreaSelector).text());
    var sumPrice = Number($('.sum-price-value').text());
    let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
    var roomPrice = Number($(totalPriceQuery).val());
    let quantitySelector = 'div#' + roomId + ' input[type=button]';
    //subtract from total sum price
    $('.sum-price-value').text(function () {
        return sumPrice - roomPrice;
    })
    $(totalPriceQuery).val(0);
    //initialize room price
    $('.show-price-per-room').text("0");
    //subtract from general area  
    $('.sum-area-value').text(function () {
        return sumArea - roomArea;
    })
    //initialize room area
    $(roomAreaSelector).text("0");
    $(quantitySelector).val(0);
    $('span#hideEmptyButton').hide();
})

$('.toggle-rooms-mobile').click(function () {
    toggleMenu();
})

$(window).resize(function () {
    deleteTopBorders();
    toggleMenu();
});

function toggleMenu() {
    if ($(window).width() < 768) {
        $('.toggle-rooms-mobile i').toggleClass('fa-angle-down');
        $('.toggle-rooms-mobile i').toggleClass('fa-angle-up');
        $('a.room:not(.active)').toggleClass('d-none');
        $('a.room:not(.active)').toggleClass('d-block');
    }
}
function deleteTopBorders() {
    initializeBorders();
    if ($(window).width() >= 768) {
        findFirstVisible(2);
    }
    else {
        findFirstVisible(1);
    }
}
function initializeBorders() {
    $('.furniture-single').css({ borderTop: '2px solid rgb(219, 217, 217)' });
}
function findFirstVisible(column) {
    var counter = 0;
    $('.container .row .furniture:visible').children().each(function () {
        counter++;
        $(this).css('border-top-color', 'white');
        if (counter === column) {
            return false;
        }
    })
}
