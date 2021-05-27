import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';
import { WishlistService } from 'src/app/SERVICES/wishlist.service';
import { OrderPlacedService } from 'src/app/SERVICES/order-placed.service';


@Component({
  selector: 'app-checkout-products',
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.css']
})
export class CheckoutProductsComponent implements OnInit {
  @Input() checkout_products: any [];
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter()

  constructor(
    public shopping_cart_service: ShoppingCartService,
    public orderlist: OrderPlacedService,
    public wishlist: WishlistService) { }

  ngOnInit(): void {
    console.log('products ', this.checkout_products)
  }

  removeItem(p){
    if(confirm("Are you sure to delete product?")){
      this.shopping_cart_service.removerItem(p)
      this.deleteEvent.emit(p)
    }
  }
  addToWishlist(p){
    alert("Product moved to wishlist")
    this.shopping_cart_service.removerItem(p)
    this.deleteEvent.emit(p)
    this.wishlist.addProduct(p)
  }

  orderPlaced(p) {
    this.shopping_cart_service.removerItem(p)
    this.deleteEvent.emit()
    this.orderlist.addProduct(p)
  }
  OrderItems() {
    console.log('check out: ', this.checkout_products)
    for (var product of this.checkout_products) {
      console.log('products is going for check out: ', product)
      this.orderPlaced(product);
    }
    alert('list moved')
  }
}
