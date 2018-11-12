/* global $ */
$(document).ready(function(){
    $("#postComment").click(function(){
        var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
      
        var url = "comment";
        $.ajax({
            url:url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data,textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    $("#getComments").click(function(){
        var url = "getComments";
        $.ajax({
            url:url,
            type: "GET",
            success: function(data, textStatus) {
                console.log(data);
                $.each( data, function( i, val ) {
                    $("#comments").append("<br>" + data[i].Name + ": " + data[i].Comment);
                });
            }
        })
    });
});