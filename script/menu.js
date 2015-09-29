$(function () {
    $home = $("#home");
    $menu = $("#click-menu");
    
    $($home).on('mousemove', function(e) {
        
        $($home).click(function(e) {
                    
            if($menu.is(':visible')){
                $($menu).delay(90).fadeOut();
            }                
            else {
                $($menu).fadeIn('fast').offset({left: e.pageX-100, top: e.pageY-43});
            }
                
            
            e.stopImmediatePropagation();

        
        });
        
    })
    
    
    
    
})