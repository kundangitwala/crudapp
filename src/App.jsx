import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData";
function App() {
  const [data, setData] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState(0);
  const [id, setid] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);
  const handleedit = (id) => {
    setIsUpdate(true);
    const dt = data.filter((item) => item.id === id);
    setfirstName(dt[0].firstName);
    setlastName(dt[0].lastName);
    setage(dt[0].age);
    setid(dt[0].id);
  };

  const handledelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are Your sure to delete this Item")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    const dt = [...data];
    const newobj = {
      id: EmployeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    dt.push(newobj);
    setData(dt);
  };
  let handleUpdate = () => {
    let index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    let dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };
  const handleClear = () => {
    setfirstName("");
    setlastName("");
    setage("");
    setIsUpdate(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "800px",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Age"
            onChange={(e) => setage(e.target.value)}
            value={age}
          />
        </div>
        <div>
          {isUpdate === true ? (
            <button className="btn btn-danger" onClick={() => handleUpdate()}>
              Update
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleSave(e)}>
              Save
            </button>
          )}
        </div>

        <div>
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
      <table className=" table table-hover">
        <thead>
          <tr>
            <td>Sr . No</td>
            <td> Id </td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleedit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handledelete(item.id)}
                >
                  Delete
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

// USE REDUCER CONCEPT
// import React, { useReducer } from 'react'
// import { useState } from 'react'
// const reducer= (state,action ) => {

//  if(action.type === "INCREMENT")
//  {
//     return state+1;
//  }
//  if(action.type==="DECREMENT")
//  {
//   return state-1;
//  }

// }
// const iniitialState=0;
// function App() {
//   let [state,dispatch] = useReducer(reducer,iniitialState)
//   return (
//     <div>
//       <h1>{state}</h1>
//       <button onClick={()=>dispatch({type : "INCREMENT"})} > INC</button>
//       <button onClick={()=>dispatch({type : "DECREMENT"})}> DEC</button>
//     </div>
//   )
// }

// export default App

// USEMEMO HOOK IN REACTJS
// import React, { useState , useMemo} from 'react'

// function App() {
//   let [num,setnum]=useState(0)
//   let [word,setword]=useState(false)
// let rock = () => {
//   return setnum(num+1)
// }
// const countnumber =(num) => {
//   for (let index = 0; index < 90000000; index++) {}
//   return num;
// }
// let checkData = useMemo(()=>{
//  return countnumber(num)
// },[num])

//   return (
//     <div>

//       <button onClick={rock} className='m-5 bg-yellow-500 p-3 rounded-e-2xl font-bold text-red-700 text-3xl'>Counter  </button>
//       <p className='ml-9 text-4xl font-bold '>My new number : {checkData}</p>
//       <button onClick={()=>setword(!word)} className='m-5 bg-yellow-500 p-3 rounded-e-2xl font-bold text-red-700 text-3xl' >{word ? "You have clicked me.." : "Click me plz"}</button>
//     </div>
//   )
// }

// export default App

// USECALLBACK HOOKS IN REACT JAVASCRIPT-------------- )  )  )  )  )  )  )
// WHAT IS THE MAJOR DIFFERENCE BETWEEN USECALLBACK AND USEMEMO HOOKS => USECALLBACK RETURN A MEMOIC FUNCTION WHERE USEMEMO RETURN A MEMOIC VALUE AND BOTH HOOKS ARE USED TO UTILIZE THE PERFORMANCE OF THE REACT APPLICATION
// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const handleTaskChange = (e) => {
//     setTask(e.target.value);
//   };

//   const addTask = () => {
//     if (task.trim() === '') return;
//     setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
//     setTask('');
//   };

//   const toggleTaskCompletion = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>To-Do List</h1>
//         <input
//           type="text"
//           value={task}
//           onChange={handleTaskChange}
//           placeholder="Enter a task"
//         />
//         <button onClick={addTask}>Add Task</button>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
//               {task.text}
//               <button onClick={() => toggleTaskCompletion(task.id)}>
//                 {task.completed ? 'Undo' : 'Complete'}
//               </button>
//               <button onClick={() => deleteTask(task.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
