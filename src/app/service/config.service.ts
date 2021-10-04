import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  get apiUrl() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }

    return this.config.apiUrl;
  }

  get uniqueKey() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }

    return this.config.uniqueKey; 
  }

  get uniqueIv() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }

    return this.config.uniqueIv;
  }
}

