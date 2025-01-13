
export default class ShoppingCart {

    items = {} ;
    constructor( shoppingCartItems ) {

        $( shoppingCartItems ).each( ( index , item ) => {

            const quantity = $( item ).find('.shopping-cart-item__counter')[0];
            const price = $( item ).find('.shopping-cart-item__price')[0];
            const discount = + $(item).find('[data-discount]').attr('data-discount');
            const deleteButton = $( item ).find('.shopping-cart-item__delete')[0];
            const increaseButton = $( item ).find('.shopping-cart-item__increase')[0];
            const decreaseButton = $( item ).find('.shopping-cart-item__decrease')[0];
            Object.defineProperty( this.items , `item-${ index }` , {

                value: {

                    element : item,
                    quantity :  + quantity.innerText,
                    quantityElement : quantity,
                    price : + price.innerText.replace( '$' , '' ),
                    priceElement : price,
                    discount : isNaN( discount ) ? null : discount,
                    deleteButton : deleteButton,
                    increaseButton : increaseButton,
                    decreaseButton : decreaseButton
                },
                configurable : true,
                enumerable: true,
                writable : true

            });
        });
        this.addClickEvent();

    }
    addClickEvent () {

        const regex = new RegExp( /[a-z]+(?:Button)/ );
        for (const [key , value] of Object.entries(this.items) ) {

            for (const property in value) {

                const matchedProperty = value[ regex.exec( property ) ] ;
                if( undefined !== matchedProperty ) {

                    $( matchedProperty ).on( 'click' , () =>{

                        const relatedMethod = property.replace( 'Button' , '' ) ;
                        this[relatedMethod]( key );

                    })

                }

            }

        }

    }
    fromString( key ) { return this.items[ key ]; }
    increase( key ) {

        const object = this.fromString( key );
        object.quantity += 1 ;

        this.updateUi( key );

    }
    decrease( key ) {

        const object = this.fromString( key );
        object.quantity -= 1 ;

        this.updateUi( key );

    }
    totalPrice(){

        let totalPrice = 0 ;
        for (const [key , value] of Object.entries(this.items) ) {

            totalPrice += value.price * value.quantity;

        }
        return totalPrice;

    }
    calculateDiscount(){

        let discount = 0 ;
        for (const [key , value] of Object.entries(this.items) ) {

            if( null !== value.discount ) {

                discount += Math.ceil( ( value.discount / 100 ) * (value.price * value.quantity) ) ;
            }

        }
        return discount;
    }
    updateUi( key ) {

        const object = this.fromString( key );
        const realPrice = object.price * object.quantity ;

        $( object.quantityElement ).text( object.quantity );
        $( object.priceElement ).text( `$${ realPrice }` );
        $('.shopping-cart-total').text( `$${this.totalPrice()}` );
        $('.shopping-cart-discount').text( `-$${this.calculateDiscount()}` );

        $('.shopping-cart-subtotal').text( `$${ this.totalPrice() }` )
        $('.shopping-cart-total').text( `$${ this.totalPrice() - this.calculateDiscount() }` )

    }


}