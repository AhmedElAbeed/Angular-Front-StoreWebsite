import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/modules/product/model';
import { MENU } from 'src/app/shared/constant';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    .top-nav-menu,
    .bottom-nav-menu {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .top-nav-menu-item a,
    .top-nav-menu-item button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      font-size: 1.3rem;
      text-transform: uppercase;
      transition: all 0.5s;
    }
    .bottom-nav-menu-item a:hover {
      font-weight: 600;
      border-bottom: 4px solid #374151;
    }
    .active-link {
      font-weight: 600;
      border-bottom: 4px solid #374151;
    }
    .dropdown-menu {
      position: absolute;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      min-width: 200px;
    }
    .dropdown-item {
      padding: 10px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .dropdown-item:hover {
      background: #f0f0f0;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {
  cart: Product[] = [];
  menulist: { title: string; path: string }[] = MENU;
  isMenu = false;
  username: string | null = null;
  userRole: string | null = null;
  showDropdown = false;

  constructor(private cartService: CartService, public authService: AuthService) {}

  ngOnInit() {
    console.log('AuthService isLoggedIn:', this.authService.isLoggedIn());
    console.log('Stored username:', this.authService.getUsername());
    console.log('Stored user role:', this.authService.getUserRole());
  
    // Get the cart items as an observable
    this.cart = this.cartService.getCart; // Remove parentheses from method call

      if (this.authService.isLoggedIn()) {
        this.username = this.authService.getUsername();
        this.userRole = this.authService.getUserRole();
      } else {
        this.username = null;
        this.userRole = null;
      }
    }
    

  openMenu() {
    this.isMenu = true;
  }

  closeMenu() {
    this.isMenu = false;
  }

  logOut() {
    this.authService.logout();
    this.username = null; // Clear username
    this.userRole = null; // Clear role when logged out
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
