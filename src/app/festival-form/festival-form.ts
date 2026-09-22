import { Component,signal } from '@angular/core';
import { Festival } from '../festival';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-festival-form',
  styleUrl: './festival-form.css',
  templateUrl: './festival-form.html',
})
export class FestivalForm {
  readonly model = signal<FestivalFormModel>({name: '', location: '', year: null,});

 readonly editorForm = form(this.model, path => {
  required(path.name, { message: 'Nom obligatoire.' });
  required(path.location, { message: 'Lieu obligatoire.' });
  required(path.year, { message: 'Année obligatoire.' });
  });
}



type FestivalDraft = Pick<Festival, 'name' | 'location' | 'year'>;
type FestivalFormModel = Omit<FestivalDraft, 'year' | 'name' | 'location'> & { year: number | null; } & {name: string | ""} & {location: string | ""};