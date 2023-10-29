import { useEffect, useState } from 'react';



export default function UpdateTodo({taskId,setY,setX}){
    
const [task,SetTask]=useState({
    id:0,
    title:'',
    description:''
  });
  const [data1,setData1]=useState('');
  console.log(taskId)
  async function handleUpdate(e){
    e.preventDefault();
   let res=await fetch(`http://127.0.0.1:8080/api/todos/${taskId}`,{
      method:'PUT',
      // mode: 'cors',
      // credentials:'origin',
      body:JSON.stringify({
        id:taskId,
        title:task.title,
        description:task.description,
        completed:'false'
      })
    });
    let data =res.json();
    setY(true);    
    setX(false);
    console.log(data);
  }
  
  
  
  
  
  return(<>
  <form className='form1'>
   <input type='text' className='form1-class ' onChange={(e)=>SetTask({...task,title:e.target.value})} value={task.title}/>
   <input type='text' className='form1-class' onChange={(e)=>SetTask({...task,description:e.target.value})} value={task.description}/>
   <button type='submit' onClick={(e)=>handleUpdate(e)} className=' button1'>save</button>
  </form>
  
  </>)
}