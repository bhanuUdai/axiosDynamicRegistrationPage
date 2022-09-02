
// taking ID variable to put id of object to be edited
let ID;
function editid(id)
{
    
    ID=id;
}


function savetoLocalStorage(event)
{
    event.preventDefault();

    let name=event.target.username.value;
    let email=event.target.emailId.value;

// creating object (obj) in which key is name and email and values will the values that will be inserted in the form by user

    let obj={
        name,
        email
    }



 if(ID)
 {
        axios.put(`https://crudcrud.com/api/388a6deea4e941648343d6dc0c9dab8c/appointmentApp/${ID}`,obj)
    .then((res)=>
    {   
        onScreenAfterEdit()
        ID=''
    })
    .catch((err)=>
    {
        console.log(err)
    })
    }

else
{

    //here we are sending data through axios in crudcrud server having 'appointmentApp' rout and behind this rout is base that genrated on crudcrud

    axios.post("https://crudcrud.com/api/388a6deea4e941648343d6dc0c9dab8c/appointmentApp",obj)
    .then((res)=>
    {
        // when promise get resoloved(i.e data get sended), we will print it on screen by calling onScreen function
        // note that here we have to print data of resourse, not complete respourse , therefor (res.data)
        
        onScreen(res.data)
        
    })
    .catch((err)=>
    {
        console.log(err)
    })


}



}

//priniting all data agin o dom after wiping 
function onScreenAfterEdit()
{
    

    axios.get("https://crudcrud.com/api/388a6deea4e941648343d6dc0c9dab8c/appointmentApp")  
    .then((res)=>                                                                          
    {                                                                                      
        wipeScreen()

        for(let i=0;i<res.data.length;i++)
        {
            onScreen(res.data[i])
        }
       
    })
    .catch((err)=>
    {
        console.log(err)
    })
}

//wiping all data from screen from dom
function wipeScreen()
{
    let parentNode=document.querySelector('#users')
    let node=document.querySelectorAll('._list')
    node.forEach((key)=>
    {
        parentNode.removeChild(key)
    })

}

// creating DOMContent event which fire when page is reloaded or refreshed
window.addEventListener('DOMContentLoaded',onload); 

function onload(e)
{
    axios.get("https://crudcrud.com/api/388a6deea4e941648343d6dc0c9dab8c/appointmentApp")  //getting resourse from the server which contains all the post values
    .then((res)=>                                                                          // this res is complete resourse
    {                                                                                      //res.data is an array containing data in form of objects [{},{},{}]
        
        for(let i=0;i<res.data.length;i++)
        {
            onScreen(res.data[i])
        }
        
    })
    .catch((err)=>
    {
        console.log(err)
    })
    
}

//Showing name and email on screen
function onScreen(user)  //function (A)
{
    let parentNode=document.querySelector('#users');
    let childNode= `<li id=${user._id} class=_list > ${user.name} - ${user.email}
     <button class=_button  onclick=editUser('${user._id}','${user.name}','${user.email}')>Edit</button>
     <button  class=_button  onclick=deleteUser('${user._id}')> Delete </button> </li><br>`  //delete button is calling function (B) when clicked
    parentNode.innerHTML=childNode+parentNode.innerHTML;
}


//Edit function to delete detail from screen and put request will be submitted on submit
function editUser(id,username,emailId)
{
    document.querySelector('#mail').value=emailId;
    document.querySelector('#name').value=username;
    removeFromScreen(id);
    editid(id);
}


//Delete
function deleteUser(id)     //function(B)  
{ 
    axios.delete(`https://crudcrud.com/api/388a6deea4e941648343d6dc0c9dab8c/appointmentApp/${id}`)  // put it in backticks so that it can acess id, otherwise it will take rout as 'id'
    .then(()=>                                                                                      // that is string and not real id
    {
        removeFromScreen(id)
    })
    .catch((err)=>
    {
        console.log(err)
    })

}



function  removeFromScreen(id)  //function (C)
{
    let parent1=document.querySelector('#users');
    let child1=document.getElementById(id)   /////Here  querySelector() is not work because in query selector we have to use '#' and here we are putting function parameter emailId ,so cananot use # therefor we use .getElementBtId  
    if(child1)
    {
        parent1.removeChild(child1);
    }
    
}