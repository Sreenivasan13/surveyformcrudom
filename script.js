var selectedRow = null;
var formData = {};
var count = parseInt(formData["id"]);
function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
    count++;
}

//Retrieve the data

function readFormData(){
    // var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["password"] = document.getElementById("password").value;
    formData["state"] = document.getElementById("state").value;
    formData["city"] = document.getElementById("city").value;
    formData["country"] = document.getElementById("country").value;
    formData["pincode"] = document.getElementById("pincode").value;
    formData["education"] = document.getElementById("education").value;
    return formData;
}

//Insert the data
function insertNewRecord(data){
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.name;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.email;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.phone;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.password;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.state;
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.city;
    var cell7 = newRow.insertCell(6);
        cell7.innerHTML = data.country;
    var cell8 = newRow.insertCell(7);
        cell8.innerHTML = data.pincode;
    var cell9 = newRow.insertCell(8);
        cell9.innerHTML = data.education;
    var cell10 = newRow.insertCell(9);
    cell10.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`;

    // var request = new XMLHttpRequest();
    // request.open('GET', 'https://61c1954e9dbcca0017c81fbb.mockapi.io/api/form', true);
    // request.send();

    // request.onload = function(){
    // //conversion of string to array of json objects...
    // var data = JSON.parse(request.response);
    // console.log(data);
    // }
    fetch('https://61c1954e9dbcca0017c81fbb.mockapi.io/api/form', {
        method: 'POST',
        body:  JSON.stringify(formData),
        headers: {
            "content-type": "application/json"
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

//Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("password").value = selectedRow.cells[3].innerHTML;
    document.getElementById("state").value = selectedRow.cells[4].innerHTML;
    document.getElementById("city").value = selectedRow.cells[5].innerHTML;
    document.getElementById("country").value = selectedRow.cells[6].innerHTML;
    document.getElementById("pincode").value = selectedRow.cells[7].innerHTML;
    document.getElementById("education").value = selectedRow.cells[8].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.phone;
    selectedRow.cells[3].innerHTML = formData.password;
    selectedRow.cells[4].innerHTML = formData.state;
    selectedRow.cells[5].innerHTML = formData.city;
    selectedRow.cells[6].innerHTML = formData.country;
    selectedRow.cells[7].innerHTML = formData.pincode;
    selectedRow.cells[8].innerHTML = formData.education;

}

//Delete the data
function onDelete(td){
    if(confirm('Do you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();

    fetch('https://61c1954e9dbcca0017c81fbb.mockapi.io/api/form/', {
        method: 'DELETE',
        body:  JSON.stringify(formData),
        headers: {
            "content-type": "application/json"
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

//Reset the data
function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("country").value = "";
    document.getElementById("pincode").value = "";
    document.getElementById("education").value = "";
}
