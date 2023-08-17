import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'

// CSS
import styles from "./TaskForm.module.css"

// Interface
import {ITask} from "../interfaces/Task"

interface Props  {
  btnText: string;
  taskList: ITask[]; // Recebe a lista como props
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>> // Generic que aceita um react, despacha um evento que é o setstate, assim alterammos um state de uma lista, o ? diz que ele pode vir ou não vir. Tem que ser opcional, para enviar quando precisar
  task?: ITask | null;
  handleUpdate? (id: number, title: string, difficulty: number): void // É opcional ( por isso tem ? ) e retorna como null
}

const TaskForm = ({
  btnText, // todas props
  taskList,
  setTaskList,
  handleUpdate,
  task}: Props) => {

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState <string>("")
  const [difficulty, setDifficulty] = useState <number>(0)

  useEffect (() => {

    if(task) {
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }

  }, [task]) // quando rolar um update ele será atualizado e ocorrerá um userEffect

  const addTaskHandler = (e: FormEvent <HTMLFormElement>) => {
    e.preventDefault() // enviar o formulario sem que ele submeta, não recarrega a tela

    if(handleUpdate){
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000) // Arredonda pra baixo um número, basicamente ele gera um id aleatorio para facilmente referenciar para poder deletar o que desejar

      const newTask : ITask = {id, title, difficulty} // Adição de novo to do
  
      setTaskList! ([...taskList, newTask]); // para concretizar a adição - unindo numa lista maior todas as taks e as new task
  
      setTitle(""); // zerando os set
      setDifficulty(0);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { // PEGA O EVENTO DA TESKHANDLE, E MANDA O EVENTO PARA UM FORMULARIO
    const { name, value } = e.target
    
    if (name === "title") { setTitle(value) }
    else if (name === "difficulty") { setDifficulty(parseInt(value)) } }

  return (
  <form onSubmit={addTaskHandler} className={styles.form}>
    <div className={styles.input_container}> 
        <label htmlFor='title'> Título: </label>
        <input
        type="text"
        name="title"
        placeholder="Título da tarefa"
        onChange={handleChange}
        value={title}
        />
    </div>
    <div className={styles.input_container}> 
        <label htmlFor='difficulty'> Dificuldade: </label>
        <input
        type="text"
        name="difficulty"
        placeholder="Dificuldade da tarefa"
        onChange={handleChange}
        value={difficulty}
        /> 
    </div>
    <input type="submit" value={btnText}/>
    </form>
    )
    }

export default TaskForm