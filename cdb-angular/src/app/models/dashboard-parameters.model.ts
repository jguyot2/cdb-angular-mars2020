import { Page } from './page.model'
import { VirtualTimeScheduler } from 'rxjs';

export class DashboardParameters {
    page: Page;
    search: string;
    sort: string;


    constructor() {
        this.page = new Page();
        this.search = null;
        this.sort = "";
    }

    toString() {
        return "Page : " + this.page.toString()
            + "\nsearch : " + this.search
            + "\nsort : " + this.sort;
    }
}

