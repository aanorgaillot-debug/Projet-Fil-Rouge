import { Component,signal, inject } from '@angular/core';
import { Festival } from '../festival';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { FestivalService, FestivalFormModel, FestivalDraft } from '../festival-service';

@Component({
  imports: [FormField],
  selector: 'app-festival-form',
  styleUrl: './festival-form.css',
  templateUrl: './festival-form.html',
})
export class FestivalForm {

  readonly service = inject(FestivalService);
  readonly selectedId = signal<number | null>(null);
  readonly statusMessage = signal('');


  readonly model = signal<FestivalFormModel>({name: '', location: '', year: null,});

  readonly editorForm = form(this.model, path => {
    required(path.name, { message: 'Nom obligatoire.' });
    required(path.location, { message: 'Lieu obligatoire.' });
    required(path.year, { message: 'Année obligatoire.' });
  });

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.statusMessage.set('');
    const id = this.selectedId();
    const success = await submit(this.editorForm, {
      action: async formulaire => {
        const draft = toStudentDraft(formulaire().value());
        if (id === null) this.service.addFestival(draft);
        else if (!this.service.update(id, draft)) {
        return { kind: 'missing', message: 'Festival supprimé du catalogue.' };
        } 
        return undefined
      },
      });
    this.statusMessage.set(success ? 'Enregistrement effectué.' : 'Enregistrement non effectué.');
  }
}


export function toStudentDraft(v: FestivalFormModel): FestivalDraft {
  if (v.name === null || !Number.isInteger(v.year) || v.location === null || !v.name.trim() || !v.location.trim) {
    throw new Error('La saisie doit respecter le contrat avant sa conversion.');
  }
  return { name: v.name.trim(), location: v.location.trim(),year: v.year! };
}