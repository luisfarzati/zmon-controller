import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class AlertDefinition {
    id: number;
    name: string;
    tags: string[];
    priority: number;
}

export class AlertValue {
    start_time: number;
    captures: Map<string, string>;
    value: string;
    worker: string;
}

export class Entity {
    entity: string;
    result: AlertValue;
}

export class Alert {
    alert_definition: AlertDefinition;
    entities: Entity[];
}

@Injectable()
export class AlertService {

    constructor(private http: Http) {
        console.log('Creating service...');
    }

    getAlerts(): Observable<Alert[]> {
        // rest/allAlerts?team=*
        return Observable.interval(3000).switchMap(() => this.http
               .get('/rest/allAlerts?team=*')
        .map((r: Response) => { return r.json() as Alert[]; } ));
    }
}
