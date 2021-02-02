$(document).ready(function () {
    const id = $('.active').attr('id');
    toggleIcon(id);
    let filterOtherClass = ':not(#' + id + ')';
    $('div.products').filter(filterOtherClass).css('display', 'none');
})
$('a.room').click(function () {
    toggleIcon($('.active').attr('id'));
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
});
$('.add').click(function () {
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

});
$('.sub').click(function () {
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
});
$('.hide-room').click(function () {
    let id = $(this).attr('id');
    $('#' + id+'.products').css('display', 'none');
    $('a#' + id).removeClass('active');
    $('a#' + id+ ' i').removeClass('fa-minus');
    $('a#' + id+ ' i').addClass('fa-plus');;
});
// $('a').change(function () {
//     toggleIcon($(this).attr('id'));
// })
function toggleIcon(id) {
    let linkSelector = 'a.room#' + id + ' .toggle-icon i';
    $(linkSelector).toggleClass('fa-plus');
    $(linkSelector).toggleClass('fa-minus');
}
// $('#emptyRoomBtn').click(function () {
//     var sumArea = Number($('.sum-area-value').text());
//     var roomId = $(this).next().val();
//     let roomAreaSelector = 'a#' + roomId + ' span span.area';
//     var roomArea = Number($(roomAreaSelector).text());
//     var sumPrice = Number($('.sum-price-value').text());
//     let totalPriceQuery = 'a#' + roomId + ' input[type=hidden][name=price-per-room]';
//     var roomPrice = Number($(totalPriceQuery).val());
//     let quantitySelector = 'div#' + roomId + ' input[type=button]';
//     //subtract from total sum price
//     $('.sum-price-value').text(function () {
//         return sumPrice - roomPrice;
//     })
//     $(totalPriceQuery).val(0);
//     //initialize room price
//     $('.show-price-per-room').text("0");
//     //subtract from general area  
//     $('.sum-area-value').text(function () {
//         return sumArea - roomArea;
//     })
//     //initialize room area
//     $(roomAreaSelector).text("0");
//     $(quantitySelector).val(0);
//     $('span#hideEmptyButton').hide();
// })

// $('.toggle-rooms-mobile').click(function () {
//     toggleMenu();
// })

// $(window).resize(function () {
//     deleteTopBorders();
// });

// function toggleMenu() {
//     if ($(window).width() < 768) {
//         $('.toggle-rooms-mobile i').toggleClass('fa-angle-down');
//         $('.toggle-rooms-mobile i').toggleClass('fa-angle-up');
//         $('a.room:not(.active)').toggleClass('d-none');
//         $('a.room:not(.active)').toggleClass('d-block');
//     }
// }
// function deleteTopBorders() {
//     initializeBorders();
//     if ($(window).width() >= 768) {
//         findFirstVisible(2);
//     }
//     else {
//         findFirstVisible(1);
//     }
// }
// function initializeBorders() {
//     $('.furniture-single').css({ borderTop: '2px solid rgb(219, 217, 217)' });
// }
// function findFirstVisible(column) {
//     var counter = 0;
//     $('.container .row .furniture:visible').children().each(function () {
//         counter++;
//         $(this).css('border-top-color', 'white');
//         if (counter === column) {
//             return false;
//         }
//     })
// }
