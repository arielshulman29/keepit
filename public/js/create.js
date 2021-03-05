$('.toggle-rooms').click(function () {
    roomId = $(this).attr('id');
    furnitureContainerSelector = '#' + roomId + '.toggle-target';
    $(furnitureContainerSelector).toggle();
    $("i", this).toggleClass("fa-angle-up fa-angle-down");
}
)