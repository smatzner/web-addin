import { Injectable } from '@angular/core'
import { TextBlock } from '../domain/textBlock'

@Injectable({
  providedIn: 'root',
})
export class TextBlockService {
  getTextBlockData(): TextBlock[] {
    return [
      {
        id: 1,
        name: 'Einführung',
        content: 'Willkommen zu unserem System. Diese Einführung soll Ihnen helfen, die Grundlagen zu verstehen.',
      },
      {
        id: 2,
        name: 'Benutzeranleitung',
        content: 'Diese Anleitung führt Sie durch die verschiedenen Funktionen und Möglichkeiten unseres Systems.',
      },
      {id: 3, name: 'FAQ', content: 'Hier finden Sie Antworten auf häufig gestellte Fragen zu unserem System.'},
      {id: 4, name: 'Support', content: 'Wenn Sie Hilfe benötigen, wenden Sie sich bitte an unseren Support.'},
      {
        id: 5,
        name: 'Abschluss',
        content: 'Vielen Dank, dass Sie unser System nutzen. Wir hoffen, dass es Ihnen gefällt!',
      },
    ]
  }
}
