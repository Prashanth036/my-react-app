import { useEffect, useState } from 'react';
import './App.css'
import UpdateTodo from './components/update';

export default function App() {
  const [count, setCount] = useState('');
  const [addTask, setAddTask] = useState({
                                          title:'',
                                          description:''});
  const [x, setX] = useState(true);

  useEffect(() => {
    if (x) {
      return async () => {
        const response = await fetch('http://127.0.0.1:8080/api/todos', {
          // method: 'DELETE',
          // mode: 'no-cors',
          /* headers: {
            "Content-Type": "application/json" 
                  } */
        });
        // console.log(response);
        const data = await response.json();
        setCount(data);
      }
    }


    return () => setX(false);
  }
    , [x]);

  console.log(count);

  async function handleSubmit(addTask) {
    setX(!x);
    await fetch('http://127.0.0.1:8080/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        'title': addTask.title,
        'description':addTask.description,
        'completed': false
      })
    })
  }



  return (
    <>
      <div className='container'>
        <h1 style={{textAlign:'center'}}>Todo's</h1>
        <p>{count.title}</p>
        
        <div className='form'>
          <form className='form'>
            <input type='text' onChange={(e) => setAddTask({...addTask,title:e.target.value})} value={addTask.title} className='form-class'/>
            <input type='text' onChange={(e) =>  setAddTask({...addTask,description:e.target.value})} value={addTask.description} className='form-class'/>
            <button onClick={()=>handleSubmit(addTask)} className='form-class button'>submit</button>
          </form>
        </div>
        <div>
        <ul className='list'>
          {count && count.map((e, id) => {
            let x = `${e.id}`;
            return <TaskList x={x} task={e} id={id} key={id} setX={setX}/>
          })}
        </ul>
        </div>
      </div>
    </>
  )
}


function TaskList({ x, task, id ,setX}) {
  const [y, setY] = useState(true);
  const [checkTodo,setCheckTodo]=useState(false);

 /*  async function handleDelete(id) {
    console.log(id);
    setX(!x);
    await fetch(`http://127.0.0.1:8080/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
      }
    })
  }; */

  async function handleUpdate(e){
    e.preventDefault();
   let res=await fetch(`http://127.0.0.1:8080/api/todos/${x}`,{
      method:'PUT',
      // mode: 'cors',
      // credentials:'origin',
      body:JSON.stringify({
        id:x,
        title:task.title,
        description:task.description,
        completed:checkTodo
      })
    });
    let data =res.json();
    console.log(data);
  }

  return (

    <li key={id} > <p><input type='checkbox' onChange={(e)=>{
      handleUpdate();
     return setCheckTodo(e.target.checked);
    }} checked={checkTodo}/></p>
    {checkTodo?<> 
        <p className='strike'><span className='strike'  >Title:</span>{task.title}</p>
        <p className='strike'><span className='strike' >Description:</span>{task.description}</p>
          <button onClick={() => {
            setY(!y)
          }
          } className='button1'>Edit</button></>:<>
      {y ?
        <> 
        <p ><span className='text' >Title:</span>{task.title}</p>
        <p ><span className='text'>Description:</span>{task.description}</p>
          <button onClick={() => {
            setY(!y)
          }
          } className='button1'>Edit</button></> :
        <>
           <UpdateTodo taskId={x} setY={setY} setX={setX}/>
        </>
      }</>}
      {/* <button onClick={(e) => handleDelete(x)} className='button1'>Delete</button> */}
    </li>
  )
}





