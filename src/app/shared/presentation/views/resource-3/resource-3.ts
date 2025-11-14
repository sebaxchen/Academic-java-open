import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Codemirror6Component } from '../../components/codemirror6/codemirror6';
import { java } from '@codemirror/lang-java';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { highlightSelectionMatches } from '@codemirror/search';
import { foldGutter, foldKeymap, bracketMatching } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { lineNumbers, highlightActiveLine, keymap } from '@codemirror/view';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import lottie from 'lottie-web';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-resource-3',
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule,
    Codemirror6Component
  ],
  templateUrl: './resource-3.html',
  styleUrl: './resource-3.css'
})
export class Resource3 implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  code: string = '';
  result: string = 'Escribe código en el editor para ver los resultados aquí...';
  videoUrl: SafeResourceUrl;
  private animationItem: AnimationItem | null = null;
  exampleCode: string = `// Ejemplo de código JavaScript
function saludar(nombre) {
  return "¡Hola, " + nombre + "!";
}

console.log(saludar("Mundo"));
// Resultado: ¡Hola, Mundo!`;

  readonly exercises = [
    {
      title: 'Ejercicio 1',
      code: `public class HolaSalida {

    public static void main(String[] args) {

        System.out.println("Hola, bienvenido al curso de programación en Java");

        System.out.println("Este es un ejemplo de salida por consola");

    }

}`
    },
    {
      title: 'Ejercicio 2',
      code: `import java.util.Scanner;

public class LeerEdad {

    public static void main(String[] args) {

        // Creamos el Scanner para leer desde el teclado

        Scanner teclado = new Scanner(System.in);



        System.out.println("¿Cuántos años tienes?");

        int edad = teclado.nextInt(); // Leemos un número entero



        System.out.println("Tú tienes " + edad + " años.");

        

        teclado.close(); // Cerramos el Scanner

    }

}`
    },
    {
      title: 'Ejercicio 3',
      code: `import java.util.Scanner;

public class LeerNombre {

    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);



        System.out.println("¿Cómo te llamas?");

        String nombre = teclado.nextLine(); // Leemos una línea de texto completa



        System.out.println("Hola " + nombre + ", ¡bienvenido a Java!");



        teclado.close();

    }

}`
    },
    {
      title: 'Ejercicio 4',
      code: `public class ArregloEnteros {

    public static void main(String[] args) {

        // Arreglo de 3 notas

        int[] notas = new int[3];



        // Asignamos valores manualmente

        notas[0] = 15;

        notas[1] = 18;

        notas[2] = 20;



        System.out.println("Notas del estudiante:");

        System.out.println("Primera nota: " + notas[0]);

        System.out.println("Segunda nota: " + notas[1]);

        System.out.println("Tercera nota: " + notas[2]);

    }

}`
    },
    {
      title: 'Ejercicio 5',
      code: `public class ArregloCadenas {

    public static void main(String[] args) {

        // Arreglo de 3 materias favoritas

        String[] materias = new String[3];



        materias[0] = "Matemática";

        materias[1] = "Comunicación";

        materias[2] = "Programación";



        System.out.println("Materias favoritas:");

        System.out.println("1: " + materias[0]);

        System.out.println("2: " + materias[1]);

        System.out.println("3: " + materias[2]);

    }

}`
    },
    {
      title: 'Ejercicio 6',
      code: `import java.util.Scanner;

public class ArregloNombres {

    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);



        String[] amigos = new String[3];



        System.out.println("Ingresa el nombre de tu primer amigo:");

        amigos[0] = teclado.nextLine();



        System.out.println("Ingresa el nombre de tu segundo amigo:");

        amigos[1] = teclado.nextLine();



        System.out.println("Ingresa el nombre de tu tercer amigo:");

        amigos[2] = teclado.nextLine();



        System.out.println("Los nombres que ingresaste son:");

        System.out.println(amigos[0]);

        System.out.println(amigos[1]);

        System.out.println(amigos[2]);



        teclado.close();

    }

}`
    }
  ];

  currentExerciseIndex = 0;
  get currentExercise() {
    return this.exercises[this.currentExerciseIndex] ?? null;
  }

  extensions: Extension[] = [
    lineNumbers(),
    history(),
    foldGutter(),
    bracketMatching(),
    closeBrackets(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...historyKeymap,
      ...foldKeymap
    ]),
    java(),
    syntaxHighlighting(HighlightStyle.define([
      { tag: tags.keyword, color: '#569cd6' },
      { tag: tags.string, color: '#ce9178' },
      { tag: tags.comment, color: '#6a9955' },
      { tag: tags.number, color: '#b5cea8' },
      { tag: tags.definition(tags.variableName), color: '#9cdcfe' },
      { tag: tags.variableName, color: '#9cdcfe' },
      { tag: tags.typeName, color: '#4ec9b0' },
      { tag: tags.function(tags.variableName), color: '#dcdcaa' },
      { tag: tags.className, color: '#4ec9b0' },
      { tag: tags.propertyName, color: '#9cdcfe' },
      { tag: tags.operator, color: '#d4d4d4' },
      { tag: tags.punctuation, color: '#d4d4d4' },
      { tag: tags.bracket, color: '#d4d4d4' },
      { tag: tags.meta, color: '#d4d4d4' }
    ])),
    EditorView.theme({
      '&': {
        height: '100%',
        fontSize: '0.8rem',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4'
      },
      '.cm-editor': {
        height: '100%',
        backgroundColor: '#1e1e1e'
      },
      '.cm-scroller': {
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#1e1e1e'
      },
      '.cm-content': {
        padding: '0.75rem',
        fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        caretColor: '#d4d4d4'
      },
      '.cm-focused': {
        outline: 'none'
      },
      '.cm-line': {
        color: '#d4d4d4'
      },
      '.cm-gutters': {
        backgroundColor: '#1e1e1e',
        border: 'none',
        color: '#858585'
      },
      '.cm-lineNumbers .cm-gutterElement': {
        color: '#858585'
      },
      '.cm-activeLine': {
        backgroundColor: '#2a2d2e'
      },
      '.cm-activeLineGutter': {
        backgroundColor: '#2a2d2e',
        color: '#d4d4d4'
      }
    })
  ];

  constructor(private sanitizer: DomSanitizer) {
    const videoId = 'koyu8qYot_Y';
    const url = `https://www.youtube.com/embed/${videoId}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    // La animación se carga en ngAfterViewInit
  }

  ngAfterViewInit(): void {
    if (this.lottieContainer) {
      const container = this.lottieContainer.nativeElement;
      container.style.width = '250px';
      container.style.height = '250px';
      
      this.animationItem = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/i18n/STUDENT.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet'
        }
      });
      
      // Asegurar que el SVG tenga el tamaño correcto
      setTimeout(() => {
        const svg = container.querySelector('svg');
        if (svg) {
          svg.style.width = '250px';
          svg.style.height = '250px';
          svg.style.transform = 'scale(1)';
          svg.style.transformOrigin = 'center center';
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.animationItem) {
      this.animationItem.destroy();
    }
  }

  showNextExercise() {
    if (this.exercises.length === 0) {
      return;
    }

    this.currentExerciseIndex = (this.currentExerciseIndex + 1) % this.exercises.length;
  }

  onCodeChange() {
    if (!this.code || this.code.trim() === '') {
      this.result = 'Escribe código en el editor para ver los resultados aquí...';
      return;
    }

    try {
      const output: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;
      
      console.log = (...args: any[]) => {
        output.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };

      console.error = (...args: any[]) => {
        output.push('ERROR: ' + args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };

      eval(this.code);
      
      console.log = originalLog;
      console.error = originalError;
      
      this.result = output.length > 0 ? output.join('\n') : '✓ Código ejecutado correctamente (sin salida)';
    } catch (error: any) {
      this.result = `✗ Error: ${error.message}`;
    }
  }

  loadExample() {
    this.code = this.exampleCode;
    this.onCodeChange();
  }
}
