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
  @Input() progress!: number;


  constructor(private router: Router) {}

  goToNext() {
    if (this.nextRoute) {
      this.router.navigate([this.nextRoute]);
    } else {
      this.router.navigate(['/login']); 
    }
  }
}