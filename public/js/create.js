$('.toggle-rooms').click(function () {
    roomId=$(this).attr('id');
    furnitureContainerSelector='#'+roomId+'.toggle-target';
    // $(this).html("<i class='fa fa-caret-up'></i>");
    $(furnitureContainerSelector).toggle();
    $("i", this).toggleClass("fa-caret-up fa-caret-down");
    // if ($(this).next('.toggle-target').css('display', 'none')) {
    //     $(this).next('.toggle-target').show();
    //     console.log($(this).next('.toggle-target').html());
    // }
}
)