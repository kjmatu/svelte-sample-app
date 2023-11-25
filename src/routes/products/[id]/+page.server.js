import { loadProducts } from '$lib/server/product.js';
import {addToCart, loadCartItems} from '$lib/server/cart';

export async function load({params}) {
    const products = await loadProducts();
    const product = products.find(product => product.id === params.id);
    const relatedProducts = products.filter((product) => params.id !== product.id);
	const cart = [];
	if (locals.currentUser) {
		cart = await loadCartItems(locals.currentUser.userId);
	}
    return {product, relatedProducts, cart};
};

export const actions = {
	default: async ({locals, request}) => {
		if (locals.currentUser) {
			const data = await request.formData();
			await addToCart(locals.currentUser.userId, data.get("productId"));
		}
	}
};