import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage implements OnInit {
  private readonly title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Sobre nosotros');
  }
}
