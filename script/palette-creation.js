var height;

var colorHex;
var posX = 0;
var posY = 0;
var posZ = 0;

//used for creating user generated palette
var numberPalette = 0;
var margin = 0;
var marginLoad = 0;

//used for save and load
var colorObj = {};

$(function () {
    if (!localStorage.nbPalette)
        localStorage.nbPalette = 0;
    
    //load the saved color palettes (if any)
    for (var j = 0; j< localStorage.nbPalette; j++)
    {
        $("#color-load-box ul").append("<li data-id=" + j + ">" +JSON.parse(localStorage.getItem("palette"+j)).name +"</li>");
    }
    
    height = $("#main-title").height();

    $("#start").click(function() {        
        $(this).parent().animate({
            "margin-top" : -height,
            "opacity": 0
        }, 1500, "swing", function() {
            
            $(this).remove();  
            $('body').append("<div id='color-canvas'><p class='caption top-padding'  id=indicator>Move the mouse around... <hr /> Ipad/Ipod and any kind of full touch device is not supported ... yet. I know it's lame.</p><p id='color-code'></p></div>");
            $("#action-bar").fadeIn();
        });
    });
    
    //Bind the mousewheel event to the third component of RGB colors (B)
    $(window).bind('mousewheel DOMMouseScroll', function(e){
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            
            if (posZ >= 255) 
                posZ = 255;
            else
                posZ++;
        }
        else {
            if (posZ <= 0)
                posZ = 0;
            else    
                posZ--;
        }
        
        colorHex = "rgb(" + posX + ", " + posY + ", "+  posZ + ")";
        $("#color-code").html(rgbToHex(posX, posY, posZ));
        $("#color-canvas").css("background", colorHex);
        
    });
    
    //Main event : the mouse is always moving!!
    $("body").on('mousemove', "#color-canvas", function(e) {     
        
        //remove the "Move the mouse around" paragraph
        $("#indicator").remove();
        
        posX = Math.floor(e.pageX / ($('body').width() / 256));
        posY = Math.floor(e.pageY / ($('body').height() / 256));
        colorHex = "rgb(" + posX + ", " + posY + ", "+  posZ + ")";
        
        $("#color-code").html(rgbToHex(posX, posY, posZ));
        $(this).css("background", colorHex);
        
        //Live display of the colors after a double click
        $("#color-canvas").dblclick(function(e) {
            if (numberPalette > 4)
            {
                e.stopImmediatePropagation();
            }                             
            else
            {                             
                $("<div class=palette data-hex=" + rgbToHex(posX, posY, posZ) + " data-rgb = rgb(" + posX + ',' + posY + ',' + posZ + ') ' + "style='background-color:" +rgbToHex(posX, posY, posZ)+"; margin-left:" + margin +"%;'>" +
                  "<div id=color-detail><p>" + rgbToHex(posX, posY, posZ) +"</p><p> rgb("+ posX+ ", " + posY + ", " + posZ + ")</div>" +            
                  "<div id=cross></div></div>")
                .hide()
                .appendTo('#color-canvas')
                .fadeIn();
                
                $("#color-code").animate({
                    "margin-left" : '+=15.8%'
                });
            
                margin+=15.8;
                numberPalette++;
                
                $("#action-bar li:nth-child(2)").fadeIn();
                
                e.stopImmediatePropagation();
            }            
        });
        
        
        
        //Display the load panel
        $("#action-bar li").first().click(function(e) {
            $("#color-load-box").fadeIn();
            
            if (!$("#color-save-box").is(":hidden"))
                $("#color-save-box").fadeOut('fast');
            
            e.stopImmediatePropagation();
        });
        
                
        
        //Load a palette when clicked on its name
        $("#color-load-box").on("click", "li", function(e) {
            id = $(this).data("id");
            
            $(".palette").remove();
            marginLoad = 0;            
            
            for (var j = 0; j<JSON.parse(localStorage.getItem("palette"+id)).number; j++)
            {
                $("<div class='palette loaded' style='background-color: " + JSON.parse(localStorage.getItem("palette"+id))["Hex"+j] + "; margin-left:" + marginLoad + "%; '>" 
                  + "<div id=color-detail><p>" 
                  + JSON.parse(localStorage.getItem("palette"+id))["Hex"+j] +"</p><p>" + JSON.parse(localStorage.getItem("palette"+id))["Rgb"+j] +
                  "</p></div><div id=cross></div> </div>")
                .hide()
                .appendTo("#color-canvas")
                .fadeIn();
                
                marginLoad += 15.8;
            }
            
            margin = marginLoad;
            numberPalette = JSON.parse(localStorage.getItem("palette"+id)).number
            
            $("#color-code").animate({
                    "margin-left" : marginLoad + "%"
                });
            
            e.stopImmediatePropagation();
        });
        
        
        
        
        //Fade out the Load panel
        $("#color-load-box #cancel").click(function() { 
            $(this).parent().fadeOut();
        });
        
        
        
        
        //Save the palette
        $("#action-bar li").first().next().click(function(e) {
            if (!$("#color-load-box").is(":hidden"))
                $("#color-load-box").fadeOut('fast');
            
            
            $("#color-save-box").fadeIn();
            $("#color-save-box input").focus();
            
            $("#color-save-box #save").click(function(e) {
                colorObj.name = $("input[name='color-save-name']").val();
                colorObj.number = i;
                                
                t = $(".palette").toArray();
                
                for (var j = 0; j<t.length; j++)
                {
                    colorHex = "Hex" + j;
                    colorRgb = "Rgb" + j;
                    colorObj[colorHex] = t[j].getAttribute("data-hex");
                    colorObj[colorRgb] = t[j].getAttribute("data-rgb");
                                        
                    localStorage.setItem("palette" + localStorage.nbPalette, JSON.stringify(colorObj));
                }
                
                localStorage.nbPalette = parseInt(JSON.parse(localStorage.nbPalette) + 1);
                
                $(this).parent().fadeOut();
                $(this).prev().val("");
                e.stopImmediatePropagation();
            })
            
            e.stopImmediatePropagation();
        });
        
        
        
        //Fade out the Save panel
        $("#color-save-box #cancel").click(function() { 
            $(this).next().val("");
            $(this).parent().fadeOut();
        });
        
        
        
        //Delete single palette div when clicked on the cross
        $(document).on("click", "#cross", function(e) {
            if ($(this).parent().is(":last-child"))
            {                
                // setTimeOut sets the $(this) to window!
                var context = $(this);
                
                // fades out the last element in 400ms
                $(this).parent().fadeOut(400);
                                
                // clear the div from the dom in 500ms (delay for smoothness)
                setTimeout(function(){
                    context.parent().remove();                    
                }, 500);
                
                // set the color-code margin
                $("#color-code").delay(450).animate({
                    "margin-left" : "-=15.8%"
                });
            }
            else
            {
                var context = $(this);                                
                
                //nextAll to select all the descendants until the end
                $(this).parent().nextAll().animate( {
                    "margin-left" : "-=15.8%"
                },400);
                
               
                setTimeout(function(){
                    context.parent().remove();                    
                }, 500);
                
                
                $("#color-code").delay(450).animate({
                    "margin-left" : "-=15.8%"
                });                
            }
                   
            
            //decrement the margin and the number of div.
            margin -= 15.8;
            numberPalette--;
            
            if (numberPalette == 0)
                $("#action-bar li:nth-child(2)").fadeOut();
        
            e.stopImmediatePropagation();
        })
    });
});



//Fonction utilitaires
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1? "0" + hex: hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
