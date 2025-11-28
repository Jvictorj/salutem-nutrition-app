import { Component, Input } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-content',
  templateUrl: './splash-content.component.html',
  styleUrls: ['./splash-content.component.scss'],
})
export class SplashContentComponent {
  
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageSrc!: string;
  @Input() nextRoute!: string;

  constructor(private router: Router) {}

  goToNext() {
    const route = this.nextRoute || '/login';
    this.router.navigate([route]);
  }
}
