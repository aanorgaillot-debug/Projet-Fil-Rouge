import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FestivalCardComponent } from "./festival-card-component/festival-card-component"
import { FestivalService } from './festival-service';
import { FestivalForm } from './festival-form/festival-form';

@Component({
  imports: [RouterOutlet, FestivalCardComponent, FestivalForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('festival-AanorGaillot-app');
  readonly service = inject(FestivalService);

  AddFestival() {
    this.service.addFestival();
  }
}
