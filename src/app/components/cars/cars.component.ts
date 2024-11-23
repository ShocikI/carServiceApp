import { Component } from '@angular/core';
import { Car } from '../../interfaces';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cars',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  cars: Car[] = []
  newCarName: string = '';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.cars = this.localStorageService.getItem('cars') || []
  }

  addCar(): void {
    if (this.newCarName.trim()) {
      const newCar: Car = { id: this.getCarLength(), name: this.newCarName, services: [] };
      this.cars.push(newCar);
      this.localStorageService.setItem('cars', this.cars);
      this.newCarName = '';
    }
  }

  deleteCar(carId: number): void {
    this.cars = this.cars.filter(car => car.id !== carId);
    this.localStorageService.setItem('cars', this.cars);
  }

  getCarLength(): number {
    return this.localStorageService.getCarListLength();
  }
}

