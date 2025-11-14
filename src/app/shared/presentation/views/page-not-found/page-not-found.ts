import {Component, inject, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import lottie from 'lottie-web';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-page-not-found',
  imports: [
    TranslatePipe,
    MatButton
  ],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  protected invalidPath: string = '';
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private animationItem: AnimationItem | null = null;

  ngOnInit(): void {
    this.invalidPath = this.route.snapshot.url.map(url => url.path).join('/');
  }

  ngAfterViewInit(): void {
    if (this.lottieContainer) {
      const container = this.lottieContainer.nativeElement;
      container.style.width = '400px';
      container.style.height = '400px';
      
      this.animationItem = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/i18n/Error 404.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet'
        }
      });
      
      // Asegurar que el SVG tenga el tamaño correcto
      setTimeout(() => {
        const svg = container.querySelector('svg');
        if (svg) {
          svg.style.width = '100%';
          svg.style.height = '100%';
          svg.style.maxWidth = '400px';
          svg.style.maxHeight = '400px';
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.animationItem) {
      this.animationItem.destroy();
    }
  }

  protected navigateToHome() {
    this.router.navigate(['/resource-1']).then();
  }
}
