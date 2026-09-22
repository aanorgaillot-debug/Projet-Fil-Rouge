export type FestivalStatus = 'planned' | 'open' | 'closed';

export interface Festival {
    id: number;
    name: string;
    location: string;
    year: number;
    status: FestivalStatus;
    featured: boolean;
}