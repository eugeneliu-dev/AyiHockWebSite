import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsGet } from '../model/news-model';
import { Result } from '../model/result-format';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NewsUtilsService {

  newsList: NewsGet[] = [];

  constructor(private conf: ConfigService, private http: HttpClient) { }

  getNewsList(): Observable<NewsGet[]> {
    return this.http.get<Result>(this.conf.apiUrl + "news")
    .pipe(map(res => {
      if (res.Success) {
        return this.newsList = res.Data as NewsGet[];
      }
      else {
        return this.newsList = [];
      }
    }))
  }


}
