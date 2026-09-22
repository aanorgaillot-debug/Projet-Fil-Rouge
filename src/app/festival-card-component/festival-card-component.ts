import { Component, computed, effect, inject, input } from '@angular/core';
import { FestivalService } from '../festival-service';

@Component({
    imports: [],
    selector: 'app-festival-card-component',
    styleUrl: './festival-card-component.css',
    templateUrl: './festival-card-component.html',
})
export class FestivalCardComponent {

    readonly id = input.required<number>();

    readonly service = inject(FestivalService);

    readonly festi = computed(() =>
        this.service.findById(this.id())
    );

    constructor() {
      effect(() => {
          const festival = this.festi();

          if (festival) {
            console.log("L'année courante de ",festival.name," est ",festival.year);
          }
      });
    }

    selected = false;

    SelectFesti() {
      this.selected = !this.selected;
    }

    ChangeEdition() {
      this.service.ChangeEdition(this.id());
    }

    remove() {
      this.service.remove(this.id());
    }
}

