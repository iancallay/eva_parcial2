import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.page.html',
  styleUrls: ['./nuevo-libro.page.scss'],
  standalone: false,
})
export class NuevoLibroPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  backPage() {
    this.router.navigate(['/libros']);
  }
}
