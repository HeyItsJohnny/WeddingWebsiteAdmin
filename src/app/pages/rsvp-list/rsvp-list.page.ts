import { Component } from '@angular/core';
import { RsvpService } from 'src/app/services/rsvp.service';
import { LoadingController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rsvp-list',
  templateUrl: './rsvp-list.page.html',
  styleUrls: ['./rsvp-list.page.scss'],
})

export class RsvpListPage {

  public rsvps: Array<any>;
  public loadedRsvps: Array<any>;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  searchCategory: string;

  constructor(
    private rsvpService: RsvpService,
    private router: Router,
    public menuController: MenuController,
    private loadingController: LoadingController) { 
      this.searchControl = new FormControl();
    }

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.getRsvpData();
  }

  viewDetails(item){
    this.router.navigateByUrl('/rsvp-details/' + item.payload.doc.id);
  }

  getRsvpData() {
    this.rsvpService.getRsvps()
    .then(data => {
      this.rsvps = data;
      this.loadedRsvps = data;
    })
  }

  initializeRsvps() {
    this.rsvps = this.loadedRsvps;
  }

  getItems(searchbar) {
    if (searchbar.srcElement.value == "") {
      this.getRsvpData();
    } else {
      var value = searchbar.srcElement.value;
      var valueTmp: string;
      valueTmp = value.toLowerCase();   
  
      if ((this.searchCategory == 'name') || (this.searchCategory == null)) {
        this.rsvpService.searchRSVPName(valueTmp).then(res => {
          this.rsvps = res;
        })
      } else if (this.searchCategory == 'email') {
        this.rsvpService.searchRSVPEmail(valueTmp).then(res => {
          this.rsvps = res;
        })
      } else if (this.searchCategory == 'rsvpcode') {
        this.rsvpService.searchRSVPCode(valueTmp).then(res => {
          this.rsvps = res;
        })
      }
    }
  }

}
