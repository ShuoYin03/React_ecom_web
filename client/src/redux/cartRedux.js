import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
          state.quantity += action.payload.quantity;
          state.products.push(action.payload);
          state.total += action.payload.price * action.payload.quantity;
        },
        updateQuantity: (state, action) => {
            const { productId, type } = action.payload;
            const product = state.products.find((product) => product._id === productId);
            if (product && type === "inc") {
                product.quantity += 1;
                state.quantity += 1;
                state.total += product.price;
            } else if (product && type === "dec" && product.quantity > 1) {
                product.quantity -= 1;
                state.quantity -= 1;
                state.total -= product.price;
            }
        },
        removeProduct: (state, action) => {
            const { productId } = action.payload;
            const productIndex = state.products.findIndex((product) => product._id === productId);
            if (productIndex !== -1) {
                const removedProduct = state.products.splice(productIndex, 1);
                state.quantity -= removedProduct[0].quantity;
                state.total -= removedProduct[0].price * removedProduct[0].quantity;
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }, 
        updateCart: (state, action) => {
            const { products, quantity, total } = action.payload;
            state.products = products;
            state.quantity = quantity;
            state.total = total;
        }
    },
});

export const { addProduct, updateQuantity, removeProduct, clearCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer