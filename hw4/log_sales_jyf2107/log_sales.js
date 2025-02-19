let clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

let sales = [
    {
        "salesperson": "James D. Halpert",
        "client": "Shake Shack",
        "reams": 100
    },
    {
        "salesperson": "Stanley Hudson",
        "client": "Toast",
        "reams": 400
    },
    {
        "salesperson": "Michael G. Scott",
        "client": "Computer Science Department",
        "reams": 1000
    },
]

function enterSale(userClient, userReams) {
    const name = "Jennifer Fu"
    // adds input for client to autocomplete list
    if (!clients.includes(userClient)) {
        clients.push(userClient);
        console.log("Client option added: " + userClient);
    }

    // prepends user inputs to sales array (model)
    sales.unshift({
        "salesperson": name,
        "client": userClient,
        "reams": userReams
    });

    // regenerates entire display (view/controller)
    displaySales();
    console.log("New entry submitted");

    // resets inputs and focus
    $("#client-input").val("").focus()
    $("#ream-input").val("")
}

function displaySales() {
    $("#sales-table").empty()
    let uid = 0

    // regenerates table by section
    $.each(sales, function (index, value) {
        let newRow = $("<div class='row draggable'>")
        let newCol = $("<div class='col-3'>")
        $(newCol).append(value["salesperson"])
        $(newRow).append(newCol)

        newCol = $("<div class='col-4'>")
        $(newCol).append(value["client"])
        $(newRow).append(newCol)

        newCol = $("<div class='col-3'>")
        $(newCol).append(value["reams"])
        $(newRow).append(newCol)

        newCol = $("<div class='col-2'>")
        let deleteButton = $("<button type='button' " +
            "class='btn btn-danger delete'>X</button>")
        $(newCol).append(deleteButton)
        $(newRow).append(newCol)

        // commits changes to html
        $("#sales-table").append(newRow);
        $(".draggable").draggable({
            revert: "invalid",
            start: function () {
                $(this).css('z-index', 9999);
            }
        });
        $(deleteButton).click(function(){
            // deletes data from array (model)
            sales.splice(index, 1)

            // changes ui to match (view/controller)
            displaySales()
        })
    })
}

function isValid(userC, userR) {
    $(".warning").remove();

    if (userC.trim() === "" && userR.trim() === "") {
        $("#client-input").after($("<span class='warning'>" +
            "Error: Both input fields empty.</span>"))
        $("#client-input").val("").focus()
        return false;
    }
    if (userC.trim() === "") {
        $("#client-input").after($("<span class='warning'>" +
            "Error: Client input empty.</span>"))
        $("#client-input").val("").focus()

        return false;
    }
    if (userR.trim() === "") {
        $("#ream-input").after($("<span class='warning'>" +
            "Error: Ream input empty.</span>"))
        $("#ream-input").val("").focus()
        return false;
    }
    if (isNaN(userR.trim())) {
        $("#ream-input").after($("<span class='warning'>" +
            "Error: Ream input not a valid number.</span>"))
        $("#ream-input").focus();
        return false;
    }
    return true;
}

$(function() {
    $("#client-input").autocomplete({
        source: clients
    });

    // event listeners for submitting entry
    $("#submit").click(function() {
        if (isValid($("#client-input").val(), $("#ream-input").val())) {
            enterSale($("#client-input").val(), $("#ream-input").val())
        }
    })
    $("#ream-input").on("keyup", function(event) {
        if (event.key === "Enter" &&
            isValid($("#client-input").val(), $("#ream-input").val())) {
            enterSale($("#client-input").val(), $(this).val());
        }
    })

    $("#trash").droppable({
        over: function(event, ui) {
            $(this).addClass("yellow");
        },
        out: function(event, ui) {
            $(this).removeClass("yellow");
        },
        drop: function(event, ui) {
            let index = ui.helper.data('index');
            sales.splice(index, 1);
            displaySales();
        }
    });
});