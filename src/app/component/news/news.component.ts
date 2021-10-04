import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsGet } from 'src/app/model/news-model';
import { NewsUtilsService } from 'src/app/service/news-utils.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList!: Observable<NewsGet[]>;

  constructor(private newsUtils: NewsUtilsService) { }

  ngOnInit(): void {
    this.newsList = this.newsUtils.getNewsList();
  }

}
