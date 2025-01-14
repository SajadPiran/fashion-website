import {} from './shared/header.js';

const filterButton = $('#filter-button')[0];
const closeFilterButton = $('#close-filter-button')[0];

$( filterButton ).on( 'click' , ()=>{

    $('.filters-container').css( 'top' , '0%' );

    $( closeFilterButton ).on( 'click' , () => {
        $('.filters-container').css( 'top' , '-100%' );
    })

});

const rangeInput = $('input[type="range"]').toArray();
const progress = $('.progress')[0];
const rangePrices = $('.price').toArray();
const priceGap = 300;

$(rangeInput).each( ( index , input ) => {

    $( input ).on( 'input' , (e) => {

        let currentMinVal = + rangeInput[0].value;
        let currentMaxVal = + rangeInput[1].value;

        if( currentMaxVal - currentMinVal < priceGap ) {

            if( 'range-min' === e.target.className ){
                rangeInput[0].value = currentMaxVal - priceGap;
            }else{
                rangeInput[1].value = currentMinVal + priceGap;
            }

        }else{

            let progressLeft = `${ ( currentMinVal / rangeInput[0].max ) * 100}% ` ;
            progress.style.left = progressLeft;
            rangePrices[0].style.left = progressLeft;
            rangePrices[0].innerText = ` $${currentMinVal} `

            let progressRight = `${ 100 -  ( currentMaxVal / rangeInput[1].max ) * 100 }% ` ;
            progress.style.right = progressRight;
            rangePrices[1].style.right = progressRight;
            rangePrices[1].innerText = ` $${currentMaxVal} `
        }

    })

});


const filterButtons = $('.filter').toArray();
$( filterButtons ).each( ( index , button ) => {

    $( button ).on( 'click' , () => {

        const svg = $(button).find('svg')[0];
        const section = $(button.parentElement).find('section')[0];
        const sectionScrollHeight = section.scrollHeight ;

        if ( '' ===  section.style.height ){

            $(section).css( 'height' , `${sectionScrollHeight}px` );
            $(svg).css( 'rotate' , '180deg');

        }else{
            $(section).css( 'height' , '' );
            $(svg).css( 'rotate' , '');

        }

    });

});