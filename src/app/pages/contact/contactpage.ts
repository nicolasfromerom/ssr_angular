import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit {
  private readonly title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Contacto');
  }
}
