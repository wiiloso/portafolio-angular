import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  constructor(private http: HttpClient) {
     this.cargarProductos();
   }

   private cargarProductos() {
     this.http.get('https://angularhtmldb.firebaseio.com/productos_idx.json').subscribe((res: Producto[]) => {
        this.productos = res;
        setTimeout(() => {
          this.cargando = false;
        }, 2000);
        console.log(res);
     });
   }
}
