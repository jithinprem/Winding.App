import { Injectable } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root'
})
export class ModalCommonService {

  constructor(
    private modalService: BsModalService,
  ) { }

  public closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }
}
