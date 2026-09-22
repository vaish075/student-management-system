const form = document.getElementById("studentForm");


// ADD STUDENT
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("name").value,
        studentNumber: document.getElementById("studentNumber").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value,
        age: document.getElementById("age").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value,
        guardianName: document.getElementById("guardianName").value,
        guardianPhone: document.getElementById("guardianPhone").value,
        admissionDate: document.getElementById("admissionDate").value,
        status: document.getElementById("status").value

    };


    try {

        const response = await fetch("/addStudent", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });


        const data = await response.json();


        alert(data.message);


        form.reset();


        // Refresh student list
        loadStudents();


    } catch(error) {

        console.error(error);

        alert("Something went wrong!");

    }

});



// LOAD ALL STUDENTS
async function loadStudents() {

    try {

        const params = new URLSearchParams();
        const search = document.getElementById("studentSearch").value.trim();
        const course = document.getElementById("courseFilter").value.trim();
        const status = document.getElementById("statusFilter").value;

        if (search) params.set("search", search);
        if (course) params.set("course", course);
        if (status) params.set("status", status);

        const response = await fetch(`/students?${params.toString()}`);


        const students = await response.json();


        const tbody = document.getElementById("studentTableBody");


        tbody.innerHTML = "";


        students.forEach(student => {


            tbody.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.student_number || "-"}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>${student.course}</td>

                <td>${student.age}</td>

                <td>${student.status || "Active"}</td>


                <td>

                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </td>


            </tr>

            `;


        });


    } catch(error) {

        console.error(error);

    }

}



// DELETE STUDENT
async function deleteStudent(id) {


    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if(confirmDelete) {


        try {


            const response = await fetch(
                `/students/${id}`,
                {
                    method: "DELETE"
                }
            );


            const data = await response.json();


            alert(data.message);


            // Refresh table
            loadStudents();



        } catch(error) {


            console.error(error);

            alert("Delete failed");


        }

    }

}



// Load students when page opens
loadStudents();

document.getElementById("searchBtn").addEventListener("click", loadStudents);
document.getElementById("studentSearch").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadStudents();
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}