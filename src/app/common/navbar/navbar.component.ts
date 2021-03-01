import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isMenuOpen = false;

  constructor(
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    if (!this.isMenuOpen) {
      document.querySelector('body')?.classList.add('nav-open');
    } else {
      document.querySelector('body')?.classList.remove('nav-open');
    }

    this.isMenuOpen = !this.isMenuOpen;

  }

}
