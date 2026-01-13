import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage implements OnInit {
  private readonly title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Precios');
  }
}
