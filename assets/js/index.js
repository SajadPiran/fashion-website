import {} from './shared/header.js';
import {} from './shared/swiper.js';

$(document).ready( ()=>{

    const counters = $('.counter').toArray();
    $( counters ).each( ( index , counter ) =>{

        const counterCount = + $( counter ).attr('data-count');
        function updateCounter(){

            const counterInnerNumber =  + counter.innerText ;
            const increment = counterCount / 80 ;

            if ( counterInnerNumber < counterCount ) {

                counter.innerText = ` ${Math.ceil(counterInnerNumber + increment)}`;
                setTimeout(updateCounter, 10);

            } else { counter.innerText = `${counterCount}+`; }
        }
        updateCounter();

    });


});
