import { computed, Service, signal } from '@angular/core';
import { Festival } from './festival';

@Service()
export class FestivalService {
    readonly _listeFestival = signal<Festival[]>(initFesti())
    readonly festivals = this._listeFestival.asReadonly()
    readonly festivalCount = computed(() => this._listeFestival().length)
    
    remove(id: number): boolean {
        const exists = this._listeFestival().some(s => s.id === id);
        if (!exists) return false;
        this._listeFestival.update(items => items.filter(s => s.id !== id));
        return true;
    }

    findById(id: number): Festival | undefined {
        return this._listeFestival().find(s => s.id === id);
    }

    ChangeEdition(id: number): void {
        this._listeFestival.update(festivals =>festivals.map(festi =>
            festi.id === id
                ? { ...festi, year: festi.year + 1 }
                : festi
            )
        );
    }

    addFestival(): void {
        const festival: Festival = {
            id: 3,
            name: "Hellfest",
            location: "Clisson",
            year: 2026,
            status: "planned",
            featured: true
        };

        this._listeFestival.update(
            festivals => [...festivals, festival]
        );
    }
}

function initFesti(): Festival[] {
  return [
    {id: 1, name : "RoseFestival", location : "Toulouse", year: 2025, status: "open", featured : true},
    {id: 2, name : "GaroRock", location : "Marmande", year: 2025, status: "planned", featured : true}];
}