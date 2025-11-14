import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-complete',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './course-complete.html',
  styleUrl: './course-complete.css'
})
export class CourseComplete implements OnInit, OnDestroy {
  userName = signal<string>('');
  greetingText = signal<string>('');
  private langChangeSubscription?: Subscription;
  
  constructor(private translate: TranslateService) {}
  
  ngOnInit(): void {
    this.updateUserName();
    
    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateUserName();
    });
  }
  
  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
  
  private updateUserName(): void {
    const name = localStorage.getItem('userName');
    let displayName: string;
    
    if (name && name.trim().length > 0) {
      displayName = name.trim();
    } else {
      displayName = this.translate.instant('courseComplete.defaultName');
    }
    
    this.userName.set(displayName);
    this.updateGreeting(displayName);
  }
  
  private updateGreeting(name: string): void {
    const greetingKey = 'courseComplete.greeting';
    this.greetingText.set(
      this.translate.instant(greetingKey, { name })
    );
  }
}

