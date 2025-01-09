$( document ).ready( ()=>{

    const header = $('.header')[0];
    let prevScroll = window.scrollY;

    $(window).on(' scroll' , ()=>{

        let currentScroll = window.scrollY;

        if( currentScroll >= prevScroll ) { $(header).css( 'top' , '-100%'); }
        else { $(header).css( 'top' , '0%'); }

        prevScroll = currentScroll ;

    });

});