import { Component, signal, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';

@Component({
  selector: 'app-layout',
  imports: [
    MatButton,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  private document: Document;
  
  isDarkMode = signal<boolean>(false);

  options = [
    {link: '/resource-1', label: 'option.home'},
    {link: '/resource-2', label: 'option.about'},
    {link: '/resource-3', label: 'option.courses'},
    {link: '/resource-4', label: 'option.categories'}
  ];

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private renderer: Renderer2
  ) {
    this.document = doc;
    // Cargar el tema guardado o usar el predeterminado
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      this.isDarkMode.set(true);
    }
  }

  ngOnInit() {
    // Aplicar el tema inicial
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

  toggleDarkMode() {
    this.isDarkMode.update(value => !value);
    // Aplicar inmediatamente para asegurar que funcione
    this.applyTheme();
  }
}
