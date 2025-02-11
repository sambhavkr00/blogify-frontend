import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/models/blogpost.model';
import { BlogService } from 'src/app/services/blogpost.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mydrafts',
  templateUrl: './mydrafts.component.html',
  styleUrls: ['./mydrafts.component.css'],
})
export class MydraftsComponent implements OnInit {
  drafts: BlogPost[] = [];
  isLoggedIn: boolean = false;
  draftId: string = '';

  constructor(
    private _dataService: DataService,
    private _blogservice: BlogService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this._dataService.getUserId();

    this._dataService.user$.subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
      },
    });

    this._activatedRoute.paramMap.subscribe((params) => {
      this.draftId = params.get('draftId')!;
    });

    this._blogservice.getAllDrafts(userId).subscribe({
      next: (data) => {
        this.drafts = data;
      },
      error: (err) => {
        console.log('Drafts not found');
      },
    });
  }

  deleteDraft() {
    this._blogservice.deleteDraft(this.draftId).subscribe({
      next: (data) => {
        console.log('Draft deleted', data);
      },
      error: (err) => {
        console.log('Drafts not found');
      },
    });
  }
}
