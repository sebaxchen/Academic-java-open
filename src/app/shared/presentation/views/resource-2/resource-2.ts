import { Component } from '@angular/core';
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

@Component({
  selector: 'app-resource-2',
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule,
    Codemirror6Component
  ],
  templateUrl: './resource-2.html',
  styleUrl: './resource-2.css'
})
export class Resource2 {
  code: string = '';
  result: string = 'Escribe código en el editor para ver los resultados aquí...';
  videoUrl: SafeResourceUrl;
  exampleCode: string = `// Ejemplo de código JavaScript
function saludar(nombre) {
  return "¡Hola, " + nombre + "!";
}

console.log(saludar("Mundo"));
// Resultado: ¡Hola, Mundo!`;
  readonly videoId = 'dQw4w9WgXcQ';
  readonly videoLink = `https://youtu.be/${this.videoId}`;

  readonly exercises = [
    {
      title: 'Ejercicio 1',
      code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Número: " + i);
        }
    }
}`
    },
    {
      title: 'Ejercicio 2',
      code: `public class Main {
    public static void main(String[] args) {
        int numero = 8;

        if (numero % 2 == 0) {
            System.out.println("Es par");
        } else {
            System.out.println("Es impar");
        }
    }
}`
    },
    {
      title: 'Ejercicio 3',
      code: `public class Main {
    public static void main(String[] args) {
        int suma = 0;

        for (int i = 1; i <= 10; i++) {
            suma += i;
        }

        System.out.println("La suma de 1 a 10 es: " + suma);
    }
}`
    },
    {
      title: 'Ejercicio 4',
      code: `public class Main {
    public static void main(String[] args) {
        int contador = 5;

        while (contador > 0) {
            System.out.println("Cuenta regresiva: " + contador);
            contador--;
        }

        System.out.println("¡Despegue!");
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
    const url = `https://www.youtube.com/embed/${this.videoId}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
