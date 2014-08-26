$(document).ready(function(event) {
    
    $("#addButton").click(function() {
        addItem();
    });

    $("#itemInput").keypress(function(event) {
        if (event.keyCode == 13) {
            addItem();

        }
    });

});

function addClickHandler() {
    $("li.item").dblclick(function() { //toggles list item with a strikeout.
        var item = $(this);
        if (item.parent().is("strike")) {
            $(item).unwrap();
        } else {
            $(item).wrap("<strike>");
        }
    });

    $("a.item-close").click(function(event) { //removes item from list
        $(this).parent("li").remove();
    });
}

function addItem() {
    var newItem = $("#itemInput").val();
    if ((newItem !== "") && (newItem !== null)) {
        var newItemNode = "<li class='item'>" + newItem + "<a class='item-close'>close</a></li>";
        $("#shoppingList").append(newItemNode);
        $("li.item").unbind();
        addClickHandler();
        $("#itemInput").val("");
    } else {
        alert("No value found");
    }
}
