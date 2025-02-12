import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _router: Router,
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

  deleteDraft(draft: BlogPost) {
    this._blogservice.deleteDraft(draft._id!).subscribe({
      next: (data) => {
        console.log('Draft deleted', data);
        this.drafts = this.drafts.filter((post) => post._id !== draft._id);
      },
      error: (err) => {
        console.log('Drafts not found');
      },
    });
  }

  publish(postId: string, blogForm: BlogPost) {
    this._blogservice.updateBlog(postId, blogForm);
    this._router.navigate(['/']);
  }
}
