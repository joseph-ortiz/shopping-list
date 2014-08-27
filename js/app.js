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
   
    $(".item").click(function() { //toggles list item with a strikeout.
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
        var newItemNode = "<li class='item'>" + newItem +"<a class='item-close'>x</a></li>";
        $("#shoppingList").append(newItemNode);
        $(".item").unbind();
        addClickHandler();
        $("#itemInput").val("");
    } else {
        alert("No value found");
    }
}
