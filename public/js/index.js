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
    var itemsInRoom = $('a#' + id + ' input[type=hidden][name=items-in-room]').val();
    var pricePerRoom = $(priceSelector).val();
    let filterOtherClass = '';
    if (id === 'myItems') {
        filterOtherClass = ':not(.checked)';
        if ($('.checked').length == 0) {
            $('.no-items').removeClass('d-none')
        }
        else {
            $('.no-items').addClass('d-none')
        }
    }
    else {
        filterOtherClass = ':not(#' + id + ')';
        $('.no-items').addClass('d-none')
    }
    $('div.furniture').filter(filterOtherClass).css('display', 'none');
    $('input[type=hidden][name=room-id]').val(function () {
        return id;
    })
    $('.show-price-per-room').text(pricePerRoom);
    deleteTopBorders();
    $('.room-name').text(function () {
        return $(titleSelector).text();
    })
    if (itemsInRoom == 0) {
        $('span#hideEmptyButton').hide();
    }
    else {
        $('span#hideEmptyButton').show();
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
    let totalAreasQuery = 'a#' + roomId + ' span span.area, a#myItems span span.area';
    let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
    let totalItemsQuery = 'a#' + roomId + ' input[type=hidden][name=items-in-room], a#myItems input[type=hidden][name=items-in-room]';
    //add number of items per room
    $(totalItemsQuery).val(function () {
        var currentNum = Number($(this).val());
        currentNum++;
        return currentNum;
    })
    //add number of items to total
    $('#sum-items').text(function () {
        var currentNum = Number($(this).text());
        currentNum++;
        return currentNum;
    })
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
    $(this).parents('div.furniture').addClass('checked');
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
    let emptiedRoom = false;
    if (currentQuantity > 0) {
        // subtract quantity
        $(quantitySelector).val(function () {
            currentQuantity = currentQuantity - 1;
            return currentQuantity
        })
        let totalAreasQuery = 'a#' + roomId + ' span span.area, a#myItems span span.area';
        let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
        let totalItemsQuery = 'a#' + roomId + ' input[type=hidden][name=items-in-room], a#myItems input[type=hidden][name=items-in-room]';
        //subtract number of items per room
        $(totalItemsQuery).val(function () {
            var currentNum = Number($(this).val());
            currentNum--;
            return currentNum;
        })
        //subtract number of items from total
        $('#sum-items').text(function () {
            var currentNum = Number($(this).text());
            currentNum--;
            return currentNum;
        })
        // subtract area 
        $(totalAreasQuery).text(function () {
            var currentArea = Number($(this).text());
            currentArea = currentArea - area;
            if (currentArea == 0) {
                emptiedRoom = true;
            }
            return currentArea;
        });
        if (emptiedRoom) {
            $(this).parents('div.furniture').removeClass('checked');
            $('span#hideEmptyButton').hide();
        }
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
        if(emptiedRoom){
            $('a.active').click()
        }
        
    }
});
$('#emptyRoomBtn').click(function () {
    let quantitySelector = 'input[type=button]:visible';
    var roomAreaSelector = 'a.active span span.area';
    var totalPriceQuery = 'a.active input[type=hidden][name=price-per-room]';
    var roomItemsQuery = 'a.active input[type=hidden][name=items-in-room]';
    var sumArea = Number($('a#myItems span span.area').text());
    var roomArea = Number($(roomAreaSelector).text());
    var sumPrice = Number($('.sum-price-value').text());
    var roomPrice = Number($(totalPriceQuery).val());
    let totalItems = Number($('#sum-items').text());
    let roomItems = Number($(roomItemsQuery).val());
    var emptyAllRooms = false;
    $('div.furniture.checked:visible').removeClass('checked');
    //subtract from total items
    $('#sum-items').text(function () {
        const itemsLeft = parseInt(totalItems - roomItems);
        if (itemsLeft == 0) {
            emptyAllRooms = true;
            return '0';
        }
        return itemsLeft
    })
    //subtract from total sum price
    $('.sum-price-value').text(function () {
        if (emptyAllRooms) {
            return '0';
        }
        return parseInt(sumPrice - roomPrice);
    })
    //subtract from general area  
    $('a#myItems span span.area').text(function () {
        if (emptyAllRooms) {
            return '0';
        }
        return sumArea - roomArea;
    })
    $(roomItemsQuery).val(0);
    $(totalPriceQuery).val(0);
    //initialize room price
    $('.show-price-per-room').text("0");
    //initialize room area
    $(roomAreaSelector).text("0");
    $(quantitySelector).val(0);
    $('span#hideEmptyButton').hide();
    if (emptyAllRooms) {
        $('a span span.area').text("0");
        $('a input[type=hidden][name=price-per-room]').val(0);
        $('a input[type=hidden][name=items-in-room]').val(0);
        $('a.active').click();
    }
})

$('.toggle-rooms-mobile').click(function () {
    toggleMenu();
})

$(window).resize(function () {
    deleteTopBorders();
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
