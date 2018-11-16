/* global $ */
$(document).ready(function(){
    $("#submitRequest").click(function(){
        var myobj = {Name:$("#name").val(),Request:$("#request").val(),Duration:$("#duration").val()};
        var jobj = JSON.stringify(myobj);
      
        var url = "request";
        $.ajax({
            url:url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data,textStatus) {
                $("#done").html(url + " " + (textStatus == "success" ? "succeeded" : "failed"));
            }
        });
    });
    $("#getRequests").click(function(){
        var url = "getRequests";
        $.ajax({
            url:url,
            type: "GET",
            success: function(data, textStatus) {
                $("#requests").html("");
                $.each( data, function( i, val ) {
                    console.log(data[i]);
                    $("#requests").append("<br>" + data[i].Name + ": " + data[i].Request + " should take " + data[i].Duration + " minutes to complete.");
                });
                $("#done").html(url + " " + (textStatus == "success" ? "succeeded" : "failed"));
            }
        });
    });
    
    $("#deleteRequest").click(function(){
        var url = "deleteRequest";
        var name = {Name:$("#name").val()};
        $.ajax({
            url:url,
            type: "DELETE",
            data: name,
            success: function(data, textStatus) {
                $("#done").html(url + " for " + name + (textStatus == "success" ? " succeeded" : "failed"));
                $("#name").html("");
                $("#request").html("");
                $("#duration").html("");
            }
        })
    });
    $("#deleteAllRequests").click(function(){
       var url = "deleteAllRequests";
       $.ajax({
           url:url,
           type: "DELETE",
           success: function(data, textStatus) {
               $("#name").html("");
               $("#request").html("");
               $("#done").html(url + " " + (textStatus == "success" ? "succeeded" : "failed"));
           }
       })
    });
});