import React, { useEffect, useState } from "react";
// icons from react icons kit
// main Icon component
import Icon from "react-icons-kit";
// icons themselves
import { plus } from "react-icons-kit/feather/plus";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";


   //get todos from localstorage
   const getTodosFromLS = () => {
    const data = localStorage.getItem("todos");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }; 


const Form = () => {

  //todo value state
  const [todoValue, settodoValue] = useState("");

  //todo array of objects
  const [todos, settodos] = useState(getTodosFromLS());
  console.log(todos);

    
   
  //form submit event
  const handleSubmit = (e) => {

    e.preventDefault();
    //creating id for every todo item
    const date = new Date();
    const time = date.getTime();

    //creating a todo object
    let todoObjects = {
      ID: time,
      TodoValue: todoValue,
      completed: false
    }

    //update  todo states
    settodos([...todos, todoObjects]);

    //clearing field
    settodoValue(" ");
  };

    // saving data to localstorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    //delete a todo
    const handleDelete = (id) => {
        console.log(id);
        const filters = todos.filter((todo) => {
            return todo.ID !== id;
        })
        settodos(filters)
    }


    //edit format
    const [editForm, seteditForm] = useState(false)
    //id state
    const [id, setid] = useState()

     //edit todo
     const handleEdit = (todo, index) => {
       seteditForm(true);
       setid(index);
       settodoValue(todo.TodoValue)

    }


      // edit todo submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
          // copying todos state in items variable
        let items = [...todos];
         // storing the element at a particular index in item variable
        let item = items[id];
        // manipulating the item (object) keys
        item.TodoValue = todoValue;
    item.completed = false;

      // after manipulating item, saving it at the same index in items
    items[id] = item;

     // updating todos with items
    settodos(items);
    settodoValue('');
    seteditForm(false);
     }


      // handle checkbox
     const handleCheck = (id) => {
        let todoArray = []
        todos.forEach(todo => {
            if(todo.ID === id){
                if(todo.completed === false){
                    todo.completed = true
                }
                else if(todo.completed === true){
                    todo.completed = false
                }
            }

            todoArray.push(todo);
            settodos(todoArray)
        });
     }
  return (
    <div>
        {
            editForm===false&&(
        <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex justify-center"
      >
        <div className="flex relative w-2/3">
          <input type="text" placeholder="Add an Item" onChange={(e) => settodoValue(e.target.value)} value={todoValue}  className="w-full px-3 py-2" />
    
          <button
            type="submit"
            className="bg-indigo-600 text-white absolute right-0  h-full px-3"
          >
            <Icon icon={plus} size={20}/>
          </button>
        </div>
      </form>
            )
        }

{
            editForm===true&&(
        <form
        autoComplete="off"
        onSubmit={handleEditSubmit}
        className="flex justify-center"
      >
        <div className="flex relative w-2/3">
          <input type="text" placeholder="Add an Item" onChange={(e) => settodoValue(e.target.value)} value={todoValue}  className="w-full px-3 py-2" />
    
          <button
            type="submit"
            className="bg-yellow-500 text-white absolute right-0  h-full px-3"
          >
            Update
          </button>
        </div>
      </form>
            )
        }
 

    {todos.length > 0 && 
    <div className="w-2/3 mx-auto mt-5">
    {todos.map((singleTodo,index) =>(
        <div key={singleTodo.ID} className="flex justify-between p-2 bg-white mb-2">
          <div>
            {
                editForm===false&& (

                    <input type="checkbox" checked={singleTodo.completed} onChange={() => handleCheck(singleTodo.ID)} className="pr-2"/> 
                )
            }
           <span className={singleTodo.completed ? 'line-through pl-2 capitalize' : 'none pl-2 capitalize'}>{singleTodo.TodoValue}</span>
          </div>
             {/* no need to show edit and delete icons when edit
                  button is clicked */}
          {
              editForm===false&& (
                <div>
                <Icon icon={edit2} size={15} className="text-green-600" onClick={() => handleEdit(singleTodo, index)} />
                <Icon icon={trash} size={15} className="text-red-600" onClick={() => handleDelete(singleTodo.ID)}/>
               </div>
              )
          }
          
        </div>
    ))}
    {/* delete all todos */}
    <button className="bg-red-600 text-white font-medium px-3 py-2 rounded-md mt-3" onClick={() => settodos([])}>Delete All</button>
    </div>
    }
    </div>
  );
};

export default Form;
