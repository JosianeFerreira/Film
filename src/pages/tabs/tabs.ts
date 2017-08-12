import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ContactsPage } from '../contacts/contacts';
import { MoviesPage } from '../movies/movies';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactsPage;
  tab3Root = MoviesPage;

  constructor() {

  }
}
