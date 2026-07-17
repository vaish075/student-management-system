 const form = document.getElementById("studentForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value,
        age: document.getElementById("age").value
    };

    console.log(student);

    try {
        const response = await fetch("http://localhost:3000/addStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        alert(data.message);

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
}); 
async function loadStudents() {

    try {

        const response = await fetch("http://localhost:3000/students");

        const students = await response.json();

        const tbody = document.querySelector("#studentTable tbody");

        tbody.innerHTML = "";

        students.forEach(student => {

            tbody.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.course}</td>
                    <td>${student.age}</td>
                </tr>
            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

loadStudents();