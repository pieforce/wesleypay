export class BillItem {
    id: number;
    title: string = '';
    cost: number;
    paid: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
