import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitizenService } from '../../core/services/citizen.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private router = inject(Router);
  private citizenService = inject(CitizenService);

  currentYear = new Date().getFullYear();
  totalCitizens = 0; // ⭐ ADD COUNT HERE

  ngOnInit(): void {
    this.loadCitizenCount();
  }

  loadCitizenCount(): void {
    this.citizenService.getAllCitizens().subscribe({
      next: (res) => {
        this.totalCitizens = res.length; // ⭐ SET COUNT
      },
      error: () => {
        this.totalCitizens = 0; // fallback
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
<<<<<<< HEAD



    go(): void {
    this.router.navigate(['/Contracts']);
}
gowith():void
{
  this.router.navigate(['/Privacy']);
}
}
=======
}
>>>>>>> 4068505b33833408388651e0710285c6708edb3c
