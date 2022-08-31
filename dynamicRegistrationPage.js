
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

//here we are sending data through axios in crudcrud server having 'appointmentApp' rout and behind this rout is base that genrated on crudcrud

axios.post("https://crudcrud.com/api/f546f4e39944421a868f9bd782f683fb/appointmentApp",obj)
.then((res)=>
{
    // when promise get resoloved(i.e data get sended), we will print it on screen by calling onScreen function
    // note that here we have to print data of resourse, not complete respourse , therefor (res.data)
    onScreen(res.data)
    console.log(res.data)
})
.catch((err)=>
{
    console.log(err)
})

}

// creating DOMContent event which fire when page is reloaded or refreshed

window.addEventListener('DOMContentLoaded',onload); 

function onload(e)
{
    axios.get("https://crudcrud.com/api/f546f4e39944421a868f9bd782f683fb/appointmentApp")  //getting resourse from the server which contains all the post values
    .then((res)=>                                                                          // this res is complete resourse
    {                                                                                      //res.data is an array containing data in form of objects [{},{},{}]
        
        for(let i=0;i<res.data.length;i++)
        {
            onScreen(res.data[i])
        }
        
        // iterating through the array and calling function to print values on screen

        // let z=res.data
        // z.forEach((key)=>
        // {
        //     console.log(key)
        //     onScreen(key)

        // })
    })
    .catch((err)=>
    {
        console.log(err)
    })
    

    // let localstorage=Object.keys(localStorage);
    // for(let i=0;i<localstorage.length;i++)
    // {
    //     let key=localstorage[i];
    //     let stringifiedObj=localStorage.getItem(key);
    //     let unstringifyobject=JSON.parse(stringifiedObj)
    //     onScreen(unstringifyobject);
    // }
}

//Showing name and email on screen
function onScreen(user)  //function (A)
{
    let parentNode=document.querySelector('#users');
    let childNode= `<li id=${user.email} > ${user.name} - ${user.email} <button onclick=editUser('${user.email}','${user.name}')>Edit</button>  <button onclick=deleteUser('${user.email}')> Delete </button> </li>`  //delete button is calling function (B) when clicked
    parentNode.innerHTML=childNode+parentNode.innerHTML;
}
//Edit function to delete delail from screen and storage but highlight name and value in box that to be edit (function called bt edit button)
function editUser(emailId,username)
{
    document.querySelector('#mail').value=emailId;
    document.querySelector('#name').value=username;
    deleteUser(emailId);
}


//Delete
function deleteUser(emailId)     //function(B)  //Note it will work with remove from screen function because if you dont remove it from screen it will form a loop and start printing same values insted of delete them.
{
    localStorage.removeItem(emailId)
    removeFromScreen(emailId)   //calling function(C)
}
//it work with screen simultaneously
function  removeFromScreen(emailId)  //function (C)
{
    let parent1=document.querySelector('#users');
    let child1=document.getElementById(emailId)   /////Here  querySelector() is not work because in query selector we have to use '#' and here we are putting function parameter emailId ,so cananot use # therefor we use .getElementBtId  
    if(child1)
    {
        parent1.removeChild(child1);
    }
    
}
