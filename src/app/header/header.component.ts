import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faUserCircle = faUserCircle;
  readonly faHeart = faHeart;
  readonly faCartShopping = faCartShopping;
}
