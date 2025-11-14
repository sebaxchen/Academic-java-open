import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resource-5',
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule,
    Codemirror6Component
  ],
  templateUrl: './resource-5.html',
  styleUrl: './resource-5.css'
})
export class Resource5 implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  code: string = '';
  result: string = '';
  videoUrl: SafeResourceUrl;
  private animationItem: AnimationItem | null = null;
  private langChangeSubscription?: Subscription;
  exampleCode: string = `// Ejemplo de código JavaScript
function saludar(nombre) {
  return "¡Hola, " + nombre + "!";
}

console.log(saludar("Mundo"));
// Resultado: ¡Hola, Mundo!`;
  readonly videoId = 'WxFKylEuC4M';
  readonly videoLink = `https://youtu.be/${this.videoId}`;

  readonly exercises = [
    {
      title: 'resources.exercise1',
      code: `// MINIPROYECTO POO - ALCANCIA

public class Alcancia {



    private double saldo;



    public Alcancia() {

        this.saldo = 0.0;

    }



    public double verSaldo() {

        return this.saldo;

    }



    public boolean ahorrar(double cantidad) {

        if (cantidad <= 0) {

            return false;

        }

        this.saldo += cantidad;

        return true;

    }



    public boolean gastar(double cantidad) {

        if (cantidad <= 0 || cantidad > this.saldo) {

            return false;

        }

        this.saldo -= cantidad;

        return true;

    }



    public static void main(String[] args) {

        Alcancia miAlcancia = new Alcancia();

        System.out.println("Saldo inicial: " + miAlcancia.verSaldo());



        miAlcancia.ahorrar(10.0);

        System.out.println("Después de ahorrar 10: " + miAlcancia.verSaldo());



        miAlcancia.gastar(3.5);

        System.out.println("Después de gastar 3.5: " + miAlcancia.verSaldo());

    }

}`
    },
    {
      title: 'resources.exercise2',
      code: `// BUENA PRÁCTICA 1: Comparación de Strings

public class TestString {

    public static void main(String[] args) {

        String a = "hola";

        String b = new String("hola");



        // ❌ INCORRECTO: Compara referencias, no el contenido

        if (a == b) {

            System.out.println("Son iguales");

        } else {

            System.out.println("No son iguales");

        }



        // ✅ CORRECTO: Compara el contenido de los Strings

        if (a.equals(b)) {

            System.out.println("Son iguales");

        } else {

            System.out.println("No son iguales");

        }

    }

}`
    },
    {
      title: 'resources.exercise3',
      code: `// BUENA PRÁCTICA 2: Encapsulación

// ❌ MALA PRÁCTICA: Atributos públicos

public class Persona {

    public String nombre;  

}



// ✅ BUENA PRÁCTICA: Atributos privados con getters y setters

public class Persona {

    private String nombre;



    public String getNombre() {

        return this.nombre;

    }



    public void setNombre(String nombre) {

        this.nombre = nombre;

    }

}`
    },
    {
      title: 'resources.exercise4',
      code: `// BUENA PRÁCTICA 3: Uso de constantes

// ❌ MALA PRÁCTICA: Números mágicos en el código

double total = precio * 12;



// ✅ BUENA PRÁCTICA: Usar constantes con nombres descriptivos

final int MESES = 12;

double total = precio * MESES;



// Ejemplo completo:

public class Calculadora {

    private static final int MESES_EN_ANIO = 12;

    private static final double TASA_INTERES = 0.05;



    public static double calcularInteres(double capital) {

        return capital * TASA_INTERES * MESES_EN_ANIO;

    }

}`
    },
    {
      title: 'resources.exercise5',
      code: `// BUENA PRÁCTICA 4: Validación de datos

// ❌ MALA PRÁCTICA: Sin validación

public class BadAlcancia {

    public double saldo;



    public void add(double c) {

        saldo += c;

    }



    public static void main(String[] args) {

        BadAlcancia a = new BadAlcancia();

        a.add(-100);  // Permite valores negativos!

        System.out.println(a.saldo);

    }

}



// ✅ BUENA PRÁCTICA: Con validación y encapsulación

public class GoodAlcancia {

    private double saldo;



    public GoodAlcancia() {

        this.saldo = 0.0;

    }



    public boolean ahorrar(double cantidad) {

        if (cantidad <= 0) {  // Validación

            return false;

        }

        this.saldo += cantidad;

        return true;

    }



    public double verSaldo() {

        return this.saldo;

    }



    public static void main(String[] args) {

        GoodAlcancia a = new GoodAlcancia();

        boolean ok = a.ahorrar(50.0);      // ✅ Válido

        boolean bad = a.ahorrar(-100.0);   // ❌ Rechazado

        System.out.println("Saldo: " + a.verSaldo());

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

  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {
    const url = `https://www.youtube.com/embed/${this.videoId}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.updateResultMessage();
  }

  ngOnInit(): void {
    // La animación se carga en ngAfterViewInit
    this.updateResultMessage();
    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateResultMessage();
      if (!this.code || this.code.trim() === '') {
        this.result = this.translate.instant('resources.codePlaceholder');
      }
    });
  }

  private updateResultMessage() {
    this.result = this.translate.instant('resources.codePlaceholder');
  }

  ngAfterViewInit(): void {
    if (this.lottieContainer) {
      const container = this.lottieContainer.nativeElement;
      container.style.width = '300px';
      container.style.height = '300px';
      
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
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
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
      this.result = this.translate.instant('resources.codePlaceholder');
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
      
      const successMessage = this.translate.instant('resources.codeExecutedSuccessfully');
      this.result = output.length > 0 ? output.join('\n') : successMessage;
    } catch (error: any) {
      const errorLabel = this.translate.instant('resources.error');
      this.result = `${errorLabel}: ${error.message}`;
    }
  }

  loadExample() {
    this.code = this.exampleCode;
    this.onCodeChange();
  }
}

