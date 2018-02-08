import { shoppingCartItems } from "../../interfaces/shopping-cartItems";

export class shoppingCart {
    item: shoppingCartItems[];
    totalItemCount(){
         let count = 0;
        // for(let productId in this.item){
        //     console.log(productId)
        //     count += this.item[productId].quantity;
        // }
        return count;
    }
}