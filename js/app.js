$(document).ready(function(event) {
    checkButtonStatus();
    
   // removeOnlyCheckedItems();
    $("#addButton").click(function() {
        addItem();

    });
    $("#itemInput").keypress(function(event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });
    addMarkAllItemsCompleteEvent();
    
    $("#shoppingList").bind('DOMNodeInserted', function(e) {
        var list = $("#shoppingList");
        if ($(list).find("li").length > 0)
            $(".select-all").show();
    });
});

function InitializeMarkAllCompleteButton() {
    var button = $(".mark-all-complete");
    $(button).text("Mark All Complete");
    $(button).parent().removeClass("marked");
    $(button).attr("toggle-checked", "false");

}
function addClickHandlers() {

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
        if ($("#shoppingList").find("li").length === 0) {
            $(".select-all").hide();
            InitializeMarkAllCompleteButton();
        }
    checkButtonStatus();
    });

    $("#removeCheckedButton").click(function() {
        $("#shoppingList").find("li.item.strike-through").remove();
        checkButtonStatus();
    });
}

function markItemCompleted(li) {
   $(li).removeClass('no-select');
    $(li).addClass('strike-through');
    checkButtonStatus();
}

function markItemIncomplete(li) {
     $(li).addClass('no-select');
    $(li).removeClass('strike-through');
    checkButtonStatus();
}

function addItem() {
    var newItem = $("#itemInput").val();
    if ((newItem !== "") && (newItem !== null)) {
        var newItemNode = "<li class='item no-select'>" + newItem + "<a class='item-close'>x</a></li>";
        $("#shoppingList").append(newItemNode);
        $(".item").unbind();
        addClickHandlers();
        $("#itemInput").val("");
    } else {
        alert("No value found");
    }
    checkButtonStatus();
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
        checkButtonStatus();
    });
}

function checkButtonStatus() {
    var markAllCompleteButton = $(".mark-all-complete");
    var removeAllCheckedItemsButton = $("#removeCheckedButton");
    var shoppingList = $("#shoppingList");
    shoppingList.items = $(shoppingList).find("li");

    if (shoppingList.items.length === 0) {
        $(markAllCompleteButton).hide();
        $(removeAllCheckedItemsButton).hide();
    }
    
    if (shoppingList.items.length > 0 && $(shoppingList.items).hasClass("strike-through")) 
        $(removeAllCheckedItemsButton).show();
    
    if (shoppingList.items.length > 0 && $(shoppingList.items).hasClass("no-select")) 
        $(markAllCompleteButton).show();

    if ($(shoppingList).find("li.item.strike-through").length === 0)
            $("#removeCheckedButton").hide();
}
    
