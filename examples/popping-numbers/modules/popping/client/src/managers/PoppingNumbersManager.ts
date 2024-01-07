export interface PoppingNumberOptions {
    text: string,
    color: number,
    fontFamily?: string,
    fontSize?: number,
    duration?: number,
}

export class PoppingNumbersManager {
    poppingNumber: PoppingNumberOptions | null;

    popText(options: PoppingNumberOptions) {
        this.poppingNumber = options;
    }
}
