import {} from './header-module.js';
import ShoppingCart from './shopping-cart.js';

const items = $('.shopping-cart-item').toArray();
const shoppingCart = new ShoppingCart( items );