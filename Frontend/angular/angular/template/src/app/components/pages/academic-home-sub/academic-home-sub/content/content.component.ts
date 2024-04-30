import { Component, OnInit } from '@angular/core';
import { AcademicHomeSubService } from '../../academic-home-sub.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  liste: any[] | undefined;
  
  constructor(private monService: AcademicHomeSubService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.monService.getListe().subscribe((liste : any) => {
      this.liste = liste;
      console.table(this.liste)
    });

  }

  remove(id:any) {
    this.monService.deleteSubscription(id).subscribe({
      next:(result:any) => {
        alert("Abonnement a été supprimé avec succès")
      }
    })
  }

  addSubscription(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
  }
  closeResult = '';

	



	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}