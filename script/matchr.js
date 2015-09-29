var height, colorHex, colorHsl, componentRGB = [], hue = 161, light = Math.floor(Math.random() * 100), numberPalette = 0,margin = 0, 
    marginLoad = 0, colorObj = {};

//Fonction utilitaires
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1? "0" + hex: hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function loadPalette() {
    for (var j = 0; j< localStorage.nbPalette; j++)
    {
        if (!localStorage.getItem("palette"+j)) 
            continue;
        else{
            $("#color-load-box ul").append("<i class='icon-cancel' style='cursor:pointer'></i><li data-id=" + j + ">" +JSON.parse(localStorage.getItem("palette"+j)).name +"</li>");
        }     
    }
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 
 * SOURCE : http://stackoverflow.com/a/9493060
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/*
* After converting from hsl to rgb, we convert it to hex here.
*
* @params no parameters : uses the hue and light which are global variables. (Reaaally bad I know...)
*/
function colorConvertion(){
    colorHsl = "hsl(" + hue + ", 100%, " + light  +"%, 1)";    

    componentRGB = hslToRgb(hue/360, 1, light/100);

    colorRgb = "rgb(" + componentRGB[0] + ", " + componentRGB[1] + ", " + componentRGB[2] +")";
    colorHex = rgbToHex(componentRGB[0], componentRGB[1], componentRGB[2]);

    $("#color-code").html(colorHex);
    $("#color-canvas").css("background", colorHex);
}

$(document).ready(function () {    
    if (!localStorage.nbPalette) {
        localStorage.nbPalette = 0;
    }
    
    //load the saved color palettes (if any)
    loadPalette();
    
    height = $("#main-title").height();

    $("#start").click(function () {
        $(this).parent().animate({
            "margin-top" : -height,
            "opacity": 0
        }, 1500, "swing", function () {
            $(this).remove();
            $('body').append("<div id='color-canvas'><p id='color-code'></p></div>");
            $("#action-bar").fadeIn();
        });
    });
    
    //Bind the mousewheel event to the luminosity
    $(window).bind('mousewheel DOMMouseScroll', function (e) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            if (light >= 100) {
                light = 100;
            } else {
                light++;
            }
        } else {
            if (light <= 0) {
                light = 0;
            }                
            else {
                light--;
            }                
        }
        
        //call the hsl to rgb function
        colorConvertion();                
    });
    
    //Main event : the mouse is always moving!!
    $("body").on('mousemove', "#color-canvas", function (e) {     

        
        hue = Math.floor(e.pageX / ($('body').width() / 361));
        ligth = Math.floor(e.pageX / ($('body').width() / 101));
        
        //call the hsl to rgb function
        colorConvertion();
        
        
        
        //Live display of the colors after a double click
        $("#color-canvas").dblclick(function (e) {
            if (numberPalette > 4)
            {
                e.stopImmediatePropagation();
            }                             
            else
            {                             
                $("<div class=palette data-hex=" + colorHex + " data-rgb = '" + colorRgb + "'style='background-color:" + colorHex + "; margin-left:" + margin +"%;'>" +
                  "<div id=color-detail><p>" + colorRgb +"</p><p>" + colorHex + "</div>" +            
                  "<div id=cross></div></div>")
                .hide()
                .appendTo('#color-canvas')
                .fadeIn();
                
                $("#color-code").animate({
                    "margin-left" : '+=15.8%'
                });
            
                margin+=15.8;
                numberPalette++;
                
                $("#action-bar li:nth-child(2)").fadeIn().css("display", "inline-block");
                
                e.stopImmediatePropagation();
            }            
        });
        
        
        
        //Display the load panel
        $("#action-bar li").first().click(function (e) {
            $("#color-load-box").fadeIn();
            
            if (!$("#color-save-box").is(":hidden"))
                $("#color-save-box").fadeOut('fast');
            
            e.stopImmediatePropagation();
        });
        
        
        
        //Load a palette when clicked on its name
        $("#color-load-box").on("click", "li", function (e) {
            id = $(this).data("id");
            
            $(".palette").remove();
            marginLoad = 0;            
            
            for (var j = 0; j<JSON.parse(localStorage.getItem("palette"+id)).number; j++)
            {
                $("<div class='palette loaded'" + "data-hex=" + JSON.parse(localStorage.getItem("palette"+id))["Hex"+j] + " data-rgb =" + JSON.parse(localStorage.getItem("palette"+id))["Rgb"+j] + " style='background-color: " + JSON.parse(localStorage.getItem("palette"+id))["Hex"+j] + "; margin-left:" + marginLoad + "%; '>" 
                  + "<div id=color-detail><p>" 
                  + JSON.parse(localStorage.getItem("palette"+id))["Hex"+j] +"</p><p>" + JSON.parse(localStorage.getItem("palette"+id))["Rgb"+j] +
                  "</p></div><div id=cross></div> </div>")
                .hide()
                .appendTo("#color-canvas")
                .fadeIn();
                
                marginLoad += 15.8;
            }
            
            margin = marginLoad;
            numberPalette = JSON.parse(localStorage.getItem("palette"+id)).number;
            
            $("#color-code").animate({
                    "margin-left" : marginLoad + "%"
                });
            
            e.stopImmediatePropagation();
        });
        
        
        
        //Delete a palette when clicked on the cross in front
        $("#color-load-box").on("click", "i", function (e) {
            id=$(this).next().data("id");
            
            localStorage.removeItem("palette" + id);
            localStorage.nbPalette = parseInt(JSON.parse(localStorage.nbPalette) - 1);
            
            $(this).fadeOut();
            $(this).next().fadeOut();
            
            
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
                colorObj.number = numberPalette;
                                
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
            });
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
            
            //display the save icon when modifications are made.
            $("#action-bar li:nth-child(2)").fadeIn();
            
            if (numberPalette == 0)
                $("#action-bar li:nth-child(2)").fadeOut();
        
            e.stopImmediatePropagation();
        })
    });
});
