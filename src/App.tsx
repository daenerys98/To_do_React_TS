import React, {useState} from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

// CSS
import styles from "./App.module.css";

// Interface
import {ITask} from "./interfaces/Task";

function App() {
  const [taskList, setTaskList] = useState <ITask[]>([]) // Lista de tarefas, por enquanto vazia
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id // Retorna todos os elementos diferentes do que eu quero remover, ou seja, retorna toda lista, menos o que desejo remover
      })
    )
  }

  const hideOrShowModal = (display: boolean) => { // Ative e desativa o modal
    const modal = document.querySelector("#modal") // ativa o modal
    if(display){
      modal!.classList.remove("hide") // Se vim como true, remove a classlist -  se vem é para exibir
    } else { // esconde o modal
      modal!.classList.add("hide")
    }
  }
  
  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  };

  // Item que vai ser atualizado lá na lista de tarefas
  const updateTask = (id: number, title: string, difficulty: number) => {

    const updateTask:  ITask = {id, title, difficulty} // cada um corresponde ao valor dito acima, como title ser uma string

    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task // verifica cada tarefa da lista, e quando acha a tarefa certa por meio do id, ele vai trocar os dados dela e dar tarefa atualizada, se não for, ele mantem a tarefa antiga
    })

    setTaskList(updatedItems) // atualiza a lista do componente, para exibir as atualizadas e antigas

    hideOrShowModal(false)
  }
 
  return (
    <div>
      <Modal
      children={ // componente de atualização
      <TaskForm
      btnText='Editar Tarefa'
      taskList={taskList}
      task={taskToUpdate}
      handleUpdate={updateTask}
      />}/>
      <Header/>
      <main className={styles.main}>
        <div>
          <h2> O que você irá fazer?</h2>
          <TaskForm
          btnText='Criar tarefa'
          taskList={taskList}
          setTaskList={setTaskList} /> 
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList
          taskList={taskList}
          handleDelete={deleteTask}
          handleEdit={editTask}
          />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
