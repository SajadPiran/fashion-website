import Swiper from  '../swiper/swiper-bundle.min.mjs';

$(document).ready( ()=>{

    const swipers = $('.swiper').toArray();
    const swipersRegex = new RegExp(/[a-z-]+(?:swiper)/) ;
    function calculateSlides( slidesContainer , slides ){

        for (let slide = 0; slide < slides.length; slide++) {

            let slideNumber = slide + 1;
            if( ( slides[slide].clientWidth ) * slideNumber > slidesContainer.clientWidth ){

                const totalSlides = ( slides[slide].clientWidth ) * slide ;
                $( slidesContainer ).css( 'width' , totalSlides + ( slides[slide].clientWidth / 2 ) );
                return slide;

            }

        }

    }

    $( swipers ).each( ( index , swiper )=>{

        const swiperClassName = `.${ swipersRegex.exec( swiper.classList.value )}`;
        const swiperSlides = $(swiper).find('.swiper-slide').toArray();
        const swiperObject = new Swiper( swiperClassName , {

            slidesPerView : calculateSlides( $( swiperClassName )[0] , swiperSlides ),
            autoplay : true,
            speed:1000,
            on: {

                beforeTransitionStart : function (swiper){

                    const itemWidth = + getComputedStyle( swiper.slides[0] ).width
                        .replace('px' , '');
                    const itemMarginLeft = + getComputedStyle( swiper.slides[0] ).marginLeft
                        .replace('px' , '');

                    const swiperSlidesCount = swiper.slides.length;
                    const swiperSlidePerView = swiper.params.slidesPerView;
                    function getFinalTranslateValue(){

                        let currentSwiperTranslateValue = swiper.getTranslate() ;
                        let swiperTranslateValue = - ( itemWidth + itemMarginLeft ) ;
                        let value = 0;

                        if( 0 === currentSwiperTranslateValue ) { value = swiperTranslateValue }
                        else { value = swiperTranslateValue + currentSwiperTranslateValue }

                        if( -( ( itemWidth + itemMarginLeft) * ( swiperSlidesCount - swiperSlidePerView ) ) === currentSwiperTranslateValue )
                        { value = -0; }

                        return Math.ceil( value );
                    }
                    swiperObject.setTranslate( getFinalTranslateValue() , 0 )

                },
                sliderMove : function (swiper) {

                    let currentX = swiper.touches.startX;
                    let x = swiper.touches.currentX ;
                    let isRight = currentX > x ;
                    const event = swiper.eventsListeners.beforeTransitionStart[1];

                    if( isRight ) { swiperObject.slideNext( 1000 , event(swiper) ) }

                }
            }

        });

    });

})

