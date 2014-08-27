$(document).ready(function(event) {
    $("#addButton").click(function() {
        addItem();
    });
    $("#itemInput").keypress(function(event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });
    addMarkAllItemsCompleteEvent();
});

function addClickHandler() {

    $(".item").click(function() { //toggles list item with a strikeout.
        var item = $(this);
        if ($(item).hasClass('strike-through')) {
            markItemIncomplete(item);
        } else {
            markItemCompleted(item);
        }
    });

    $("a.item-close").click(function(event) { //removes item from list
        $(this).parent("li").remove();
    });
}

function markItemCompleted(li) {
    $(li).addClass('strike-through');
}

function markItemIncomplete(li) {
    $(li).removeClass('strike-through');
}

function addItem() {
    var newItem = $("#itemInput").val();
    if ((newItem !== "") && (newItem !== null)) {
        var newItemNode = "<li class='item no-select'>" + newItem + "<a class='item-close'>x</a></li>";
        $("#shoppingList").append(newItemNode);
        $(".item").unbind();
        addClickHandler();
        $("#itemInput").val("");
    } else {
        alert("No value found");
    }
}

function addMarkAllItemsCompleteEvent() {
    var button = $(".mark-all-complete");
    $(button).click(function() {
        var areAllItemsChecked = $(button).attr("toggle-checked");
        var listItems = $("#shoppingList").find("li");
        if (areAllItemsChecked === "true") {
            $(listItems).each(function(index) {
                markItemIncomplete(listItems[index]);
            });
            $(button).text("Mark All Complete");
            $(button).parent().removeClass("marked");
            $(button).attr("toggle-checked", "false");
        } else {
            $(listItems).each(function(index) {
                markItemCompleted(listItems[index]);
            });
            $(button).text("Undo All");
            $(button).parent().addClass("marked");
            $(button).attr("toggle-checked", "true");
        }
    });

}
