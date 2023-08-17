import React from 'react'

//Interfaces
import { ITask } from '../interfaces/Task'

//CSS
import styles from "./TaskList.module.css";

type Props = {
  taskList: ITask[] // É uma prop e espera-se que seja um array de objetos que correspondam à interface `ITask`
  handleDelete(id: number): void // Handle é uma função, (id: number)especifica o parâmetro que a função aceita,  void indica o retorno void é. // Ou seja,  está descrevendo uma funçãohandleDeleteque leva um numéricoidparâmetro e não retorna nenhum valor.
  handleEdit(task: ITask): void;
}

const TaskList = ({taskList, handleDelete, handleEdit} : Props) => {
  return (
    <> 
    {TaskList.length > 0 ? (
      taskList.map((task) => (
        <div key={task.id} className={styles.task}>
          <div className={styles.details}>
            <h4>{task.title}</h4>
            <p> Dificuldade: {task.difficulty} </p>
          </div>
          <div className={styles.actions}> {/* Abaixo o que estou usando são exemplos de elementos HTML que use FontAwesome icons. Essas classes são comuns em bibliotecas de ícones como FontAwesome, nesse caso é o bootstrap.*/}
            <i className='bi bi-pencil' onClick={() => handleEdit(task)}></i> {/*representar um icone de edição. */}
            <i
            className='bi bi-trash' //E esse um ícone de lixeira 
            onClick={() => { // está definindo um manipulador de eventos `onClick` para um elemento, como um botão, que aciona a função `handleDelete` com o `id` de uma tarefa quando o elemento é clicado.
              handleDelete (task.id) // Este código chama a função `handleDelete` e passa o `id` de uma tarefa como um argumento
            }}>
            </i>
          </div>
        </div>
      ))
    ) : (
      <p>Não há tarefas cadastradas</p>
    )}
    </>
  )
}

export default TaskList

/*Sobre div key={task.id}:
No React, quando você renderiza uma lista de elementos (como a lista de tarefas ), cada elemento precisa de um identificador exclusivo, conhecido como "chave".
A chave ajuda o React a rastrear e atualizar com eficiência os elementos na lista à medida que eles mudam.
No contexto do seu componente `TaskList`, o atributo `key={task.id}` atribui o `id` de cada tarefa como a chave exclusiva para o elemento `div` correspondente. 
Isso ajuda o React a acompanhar as tarefas individuais quando elas são adicionadas, removidas ou atualizadas na lista.
*/
