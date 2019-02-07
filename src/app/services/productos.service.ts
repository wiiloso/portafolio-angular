import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  constructor(private http: HttpClient) {
     this.cargarProductos();
   }

   private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angularhtmldb.firebaseio.com/productos_idx.json').subscribe((res: Producto[]) => {
        this.productos = res;
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
        resolve();
        console.log(res);
     });
       });
   }
   getPruducto(id: string) {
   return this.http.get(`https://angularhtmldb.firebaseio.com/productos/${id}.json`);
   }

   buscarProducto(termino: string) {
     if (this.productos.length === 0) {
        this.cargarProductos().then(() => {
    this.filtrarProductos(termino);
        });
     } else {
      this.filtrarProductos(termino);
     }
           console.log(this.productosFiltrado);
   }
   private filtrarProductos(termino: string) {
        console.log(this.productos);
        this.productosFiltrado = [];
        this.productos.forEach(prod => {
           if (prod.categoria.indexOf(termino) >= 0) {
               this.productosFiltrado.push(prod);
           }
        });
   }
}

