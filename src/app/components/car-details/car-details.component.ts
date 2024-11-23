import { Component, OnInit } from '@angular/core';
import { Car, Service } from '../../interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-car-details',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})

export class CarDetailsComponent implements OnInit {
  car!: Car;
  newService: Service = { part: '', cost: 0 }

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const carId = +this.route.snapshot.paramMap.get('id')!;
    const cars: Car[] = this.localStorageService.getItem('cars') || [];
    this.car = cars.find(car => car.id === carId)!;
  }

  addService(): void {
    if (this.newService.part.trim() && this.newService.cost > 0) {
      this.car.services.push({ ...this.newService });
      this.updateCarInStorage();
      this.newService = { part: '', cost: 0 };
    }
  }

  deleteService(index: number): void {
    this.car.services.splice(index, 1);
    this.updateCarInStorage();
  }

  private updateCarInStorage(): void {
    const cars: Car[] = this.localStorageService.getItem('cars') || [];
    const index = cars.findIndex(car => car.id === this.car.id);
    if (index !== -1) {
      cars[index] = this.car;
      this.localStorageService.setItem('cars', cars);
    }
  }
}
