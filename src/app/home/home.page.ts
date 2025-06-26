import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  resultado: number = 0;  // Resultado numérico
  operacion: string = ''; // Guarda la operación actual


  pantalla: string = '';
  botonesNumericos: string[][] = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '(']
  ];

  agregar(valor: string) {
    this.pantalla += valor;
  }

  borrar() {
    this.pantalla = '';
  }

  sumar(a: number, b: number): number {
    return a + b;
  }

  restar(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    if (b === 0) {
      throw new Error("División por cero");
    }
    return a / b;
  }

  raizCuadrada(a: number): number {
    if (a < 0) throw new Error("Raíz cuadrada de número negativo");
    return Math.sqrt(a);
  }

  potencia(base: number, exponente: number): number {
    return Math.pow(base, exponente);
  }

  logaritmoNatural(a: number): number {
    if (a <= 0) throw new Error("Logaritmo de número no positivo");
    return Math.log(a); // log natural
  }

  logaritmoBase10(a: number): number {
    if (a <= 0) throw new Error("Logaritmo de número no positivo");
    return Math.log10(a);
  }

  calcular() {
    try {
      let expr = this.pantalla;

      // 1. Reemplazo implícito: 8(2+2) => 8*(2+2)
      expr = expr.replace(/(\d+)\s*\(/g, '$1*('); // número seguido de paréntesis

      // 2. Reemplazo para porcentaje con base: 100 + 10% → 100 + (100 * 10 / 100)
      expr = expr.replace(/(\d+(?:\.\d+)?)\s*([\+\-])\s*(\d+(?:\.\d+)?)%/g, (match, base, operador, porcentaje) => {
        return `${base} ${operador} (${base} * ${porcentaje} / 100)`;
      });

      // 3. Reemplazo de porcentaje directo: 30% → (30 / 100)
      expr = expr.replace(/(\d+(?:\.\d+)?)%/g, (match, num) => {
        return `(${num} / 100)`;
      });

      // 4. Reemplazos científicos
      expr = expr
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/\^/g, '**');

      this.resultado = eval(expr);

      if (isNaN(this.resultado) || !isFinite(this.resultado)) {
        this.pantalla = 'Error matemático';
      } else {
        this.pantalla = this.resultado.toString();
      }
    } catch (error) {
      this.pantalla = 'Error';
    }
  }








}
