$("button").click(function(){
    let x = $("div");
    x.prop("color", "red");
    x.append("The color property: " + x.prop("color"));
    x.removeProp("color");
    x.append("<br>Now the color property has the following value: " + x.prop("color"));
});
