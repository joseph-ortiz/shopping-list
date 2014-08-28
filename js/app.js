$(document).ready(function(event) {

removeOnlyCheckedItems();
    $("#removeCheckedButton").hide();

    $("#addButton").click(function() {
        addItem();
    });
    $("#itemInput").keypress(function(event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });
    addMarkAllItemsCompleteEvent();

    $(".select-all").hide();
    //$("#shoppingList").change(function(){
    $("#shoppingList").bind('DOMNodeInserted', function(e) {
        var list = $("#shoppingList");
        if ($(list).find("li").length > 0)
            $(".select-all").show();
    });
});

function addClickHandler() {

    $(".item").click(function() { //toggles list item with a strikeout.
        var item = $(this);
        if ($(item).hasClass('strike-through')) {
            markItemIncomplete(item);
            var list = $("#shoppingList");
            if ($(list).find("li").length === 0)
                $(".select-all").hide();
        } else {
            markItemCompleted(item);
            $("#removeCheckedButton").show();
        }

        if( $("#shoppingList").find("li.item.strike-through").length === 0)
                     $("#removeCheckedButton").hide();
    });

    $("a.item-close").click(function(event) { //removes item from list
        $(this).parent("li").remove();
        if ($("#shoppingList").find("li").length === 0) {
            $(".select-all").hide();
            InitializeMarkAllCompleteButton();

        }

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

function InitializeMarkAllCompleteButton() {
    var button = $(".mark-all-complete");
    $(button).text("Mark All Complete");
    $(button).parent().removeClass("marked");
    $(button).attr("toggle-checked", "false");

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
            InitializeMarkAllCompleteButton();
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

function removeOnlyCheckedItems() {
    $("#removeCheckedButton").click(function() {
        $("#shoppingList").find("li.item.strike-through").remove();
        $("#removeCheckedButton").hide();

    });
}
