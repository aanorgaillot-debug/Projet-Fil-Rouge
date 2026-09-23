import { computed, Service, signal } from '@angular/core';
import { Festival } from './festival';

@Service()
export class FestivalService {
    readonly _listeFestival = signal<Festival[]>(initFesti())
    readonly festivals = this._listeFestival.asReadonly()
    readonly festivalCount = computed(() => this._listeFestival().length)
    private _nextId = this._listeFestival.length + 1;

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

    addFestival(draft: FestivalDraft): void {
        const festival: Festival = {
            id: this._nextId,
            name: draft.name,
            location: draft.location,
            year: draft.year,
            status: "planned",
            featured: false
        };
        this._nextId += 1

        this._listeFestival.update(
            festivals => [...festivals, festival]
        );
    }

    update(id: number, draft: FestivalDraft): boolean {
        const exist = this._listeFestival().filter(
            festival => festival.id === id
        );

        if (!exist) {
            return false;
        }
        this._listeFestival.update(festivals =>festivals.map(festival =>
            festival.id === id ? {...festival,
                name: draft.name,
                location: draft.location,
                year: draft.year}: festival
            )
        );
        return true;
    }

}

function initFesti(): Festival[] {
  return [
    {id: 1, name : "RoseFestival", location : "Toulouse", year: 2025, status: "open", featured : true},
    {id: 2, name : "GaroRock", location : "Marmande", year: 2025, status: "planned", featured : true}];
}

export type FestivalDraft = Pick<Festival, 'name' | 'location' | 'year'>;
export type FestivalFormModel = Omit<FestivalDraft, 'year' | 'name' | 'location'> & { year: number | null; } & {name: string | ""} & {location: string | ""};
export type FestivalUpdate = Partial<Festival> & { id: number };
