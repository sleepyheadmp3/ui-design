$( function() {
    $( "#draggable" ).draggable({
        revert: "invalid"
    });
    $( "#droppable" ).droppable({
        over: function(event, ui) {
            $( this ).addClass("pink");
        },
        out: function(event, ui) {
            $(this).removeClass("pink");
        },
        drop: function( event, ui ) {
            $( this )
                .removeClass("pink")
                .addClass( "ui-state-highlight" )
                .find( "p" )
                .html( "Dropped!" );
        }
    });
} );
