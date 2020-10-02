import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', // <app-root >
  // O template pode ser por HTML ou mesmo uma url, como o caso abaixo(Arqiovo externalizado)
  templateUrl: './app.component.html',
  // Define todos os css que o componente tem
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = []; // Inicializando uma lista vazia
  public title: string = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {

    //this.form.value => { title: 'Titulo'} Outra forma de se fazer, mas que retorn JSON
    const title = this.form.controls['title'].value;

    // Id gerado pela quantidade de itens da tela
    const id = this.todos.length + 1;

    // Incluí dados
    this.todos.push(new Todo(id, title, false));

    // Limpa item
    this.clear();

    // Salva itens
    this.save();

    // Limpa itens
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    // Senão encontrou remove da lista
    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    // Salva estado
    this.save();
  }

  removeAsDone(todo: Todo) {
    todo.done = true;

    // Salva estado
    this.save();
  }

  removeAsUnDone(todo: Todo) {
    todo.done = false;

    // Salva estado
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);

    // Salva no local store
    localStorage.setItem('todos', data);

    // salva o item
    this.mode = "list"
  }

  load() {

    // Recupera dados
    const data = localStorage.getItem("todos");

    if (data) {
      // Move itens
      this.todos = JSON.parse(data);
      // Caso esteja nulo, move vazio para a lista
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

}
