// ==============================
// LOGIN
// ==============================

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("loginError");

    if (username === "admin" && password === "admin123") {

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainSystem").style.display = "block";

        showPage("dashboard");
        updateDashboard();

    } else {

        error.innerHTML = "Invalid Username or Password";

    }

}

// ==============================
// LOGOUT
// ==============================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        document.getElementById("mainSystem").style.display = "none";
        document.getElementById("loginPage").style.display = "flex";

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("loginError").innerHTML = "";

    }

}

// ==============================
// SHOW PAGE
// ==============================

function showPage(pageId) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.style.display = "none";

    });

    document.getElementById(pageId).style.display = "block";

    if (pageId === "records") {

        loadStudents();

    }

    if (
        pageId === "transferCertificate" ||
        pageId === "studyCertificate" ||
        pageId === "conductCertificate"
    ) {

        loadStudentDropdown();

    }

}

// ==============================
// DASHBOARD
// ==============================

function updateDashboard() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    document.getElementById("studentCount").innerHTML = students.length;

}

// ==============================
// SAVE STUDENT
// ==============================

function saveStudent() {

    let name = document.getElementById("studentName").value.trim();
    let parent = document.getElementById("parentName").value.trim();
    let admissionNo = document.getElementById("admissionNumber").value.trim();
    let roll = document.getElementById("rollNumber").value.trim();
    let course = document.getElementById("course").value.trim();
    let department = document.getElementById("department").value.trim();
    let classFrom = document.getElementById("classFrom").value.trim();
    let classTo = document.getElementById("classTo").value.trim();
    let admissionDate = document.getElementById("admissionDate").value;
    let leavingDate = document.getElementById("leavingDate").value;
    let reason = document.getElementById("reason").value.trim();
    let conduct = document.getElementById("conduct").value;

    let message = document.getElementById("studentMessage");

    if (
        name === "" ||
        parent === "" ||
        admissionNo === "" ||
        roll === "" ||
        course === "" ||
        department === "" ||
        classFrom === "" ||
        classTo === "" ||
        admissionDate === "" ||
        leavingDate === "" ||
        reason === "" ||
        conduct === ""
    ) {

        message.style.color = "red";
        message.innerHTML = "Please fill all fields.";

        return;

    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let duplicate = students.find(student => student.roll === roll);

    if (duplicate) {

        message.style.color = "red";
        message.innerHTML = "Roll Number already exists.";

        return;

    }

    students.push({

        name,
        parent,
        admissionNo,
        roll,
        course,
        department,
        classFrom,
        classTo,
        admissionDate,
        leavingDate,
        reason,
        conduct

    });

    localStorage.setItem("students", JSON.stringify(students));

    message.style.color = "green";
    message.innerHTML = "Student Saved Successfully.";

    resetForm();

    updateDashboard();

}

// ==============================
// RESET FORM
// ==============================

function resetForm() {

    document.getElementById("studentName").value = "";
    document.getElementById("parentName").value = "";
    document.getElementById("admissionNumber").value = "";
    document.getElementById("rollNumber").value = "";
    document.getElementById("course").value = "";
    document.getElementById("department").value = "";
    document.getElementById("classFrom").value = "";
    document.getElementById("classTo").value = "";
    document.getElementById("admissionDate").value = "";
    document.getElementById("leavingDate").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("conduct").selectedIndex = 0;

}
// ==============================
// LOAD STUDENTS
// ==============================

function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let table = document.getElementById("studentTableBody");

    table.innerHTML = "";

    students.forEach(function(student, index) {

        table.innerHTML += `

        <tr>

            <td>${student.name}</td>

            <td>${student.roll}</td>

            <td>${student.course}</td>

            <td>${student.department}</td>

            <td>${student.conduct}</td>

            <td>

                <button class="btn btn-warning btn-sm"
                onclick="editStudent(${index})">

                <i class="fa-solid fa-pen"></i>

                </button>

                <button class="btn btn-danger btn-sm"
                onclick="deleteStudent(${index})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// ==============================
// SEARCH STUDENT
// ==============================

function searchStudent() {

    let input = document.getElementById("searchBox").value.toLowerCase();

    let rows = document.querySelectorAll("#studentTableBody tr");

    rows.forEach(function(row) {

        let text = row.innerText.toLowerCase();

        row.style.display = text.includes(input) ? "" : "none";

    });

}

// ==============================
// DELETE STUDENT
// ==============================

function deleteStudent(index) {

    if (!confirm("Delete this student?")) return;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();

    updateDashboard();

}

// ==============================
// EDIT STUDENT
// ==============================

function editStudent(index) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("parentName").value = student.parent;
    document.getElementById("admissionNumber").value = student.admissionNo;
    document.getElementById("rollNumber").value = student.roll;
    document.getElementById("course").value = student.course;
    document.getElementById("department").value = student.department;
    document.getElementById("classFrom").value = student.classFrom;
    document.getElementById("classTo").value = student.classTo;
    document.getElementById("admissionDate").value = student.admissionDate;
    document.getElementById("leavingDate").value = student.leavingDate;
    document.getElementById("reason").value = student.reason;
    document.getElementById("conduct").value = student.conduct;

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    showPage("addStudent");

    updateDashboard();

}

// ==============================
// LOAD STUDENT DROPDOWNS
// ==============================

function loadStudentDropdown() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let tc = document.getElementById("studentSelect");
    let study = document.getElementById("studyStudent");
    let conduct = document.getElementById("conductStudent");

    tc.innerHTML =
        '<option value="">Select Student</option>';

    study.innerHTML =
        '<option value="">Select Student</option>';

    conduct.innerHTML =
        '<option value="">Select Student</option>';

    students.forEach(function(student, index) {

        let option =
        `<option value="${index}">
        ${student.roll} - ${student.name}
        </option>`;

        tc.innerHTML += option;
        study.innerHTML += option;
        conduct.innerHTML += option;

    });

}

// ==============================
// INITIALIZE
// ==============================

window.onload = function () {

    updateDashboard();

};
// ======================================
// TRANSFER CERTIFICATE
// ======================================

function generateCertificate() {

    let index = document.getElementById("studentSelect").value;

    if (index === "") {
        document.getElementById("certificateArea").style.display = "none";
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let s = students[index];

    document.getElementById("certificateArea").style.display = "block";

    document.getElementById("tcNumber").innerHTML =
        "TC-" + (1001 + Number(index));

    document.getElementById("tcAdmissionNo").innerHTML =
        s.admissionNo;

    document.getElementById("tcName").innerHTML =
        s.name;

    document.getElementById("tcParent").innerHTML =
        s.parent;

    document.getElementById("tcRoll").innerHTML =
        s.roll;

    document.getElementById("tcCourse").innerHTML =
        s.course;

    document.getElementById("tcDepartment").innerHTML =
        s.department;

    document.getElementById("tcClassFrom").innerHTML =
        s.classFrom;

    document.getElementById("tcClassTo").innerHTML =
        s.classTo;

    document.getElementById("tcAdmissionDate").innerHTML =
        s.admissionDate;

    document.getElementById("tcLeavingDate").innerHTML =
        s.leavingDate;

    document.getElementById("tcReason").innerHTML =
        s.reason;

    document.getElementById("tcConduct").innerHTML =
        s.conduct;

    document.getElementById("tcCurrentDate").innerHTML =
        new Date().toLocaleDateString();

}

// ======================================
// STUDY CERTIFICATE
// ======================================

function generateStudyCertificate() {

    let index = document.getElementById("studyStudent").value;

    if (index === "") {

        document.getElementById("studyArea").style.display = "none";
        return;

    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let s = students[index];

    document.getElementById("studyArea").style.display = "block";

    document.getElementById("studyAdmissionNo").innerHTML =
        s.admissionNo;

    document.getElementById("studyName").innerHTML =
        s.name;

    document.getElementById("studyParent").innerHTML =
        s.parent;

    document.getElementById("studyClassFrom").innerHTML =
        s.classFrom;

    document.getElementById("studyClassTo").innerHTML =
        s.classTo;

    document.getElementById("studyAdmissionYear").innerHTML =
        new Date(s.admissionDate).getFullYear();

    document.getElementById("studyLeavingYear").innerHTML =
        new Date(s.leavingDate).getFullYear();

    document.getElementById("studyCurrentDate").innerHTML =
        new Date().toLocaleDateString();

}

// ======================================
// CONDUCT CERTIFICATE
// ======================================

function generateConductCertificate() {

    let index = document.getElementById("conductStudent").value;

    if (index === "") {

        document.getElementById("conductArea").style.display = "none";
        return;

    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let s = students[index];

    document.getElementById("conductArea").style.display = "block";

    document.getElementById("conductAdmissionNo").innerHTML =
        s.admissionNo;

    document.getElementById("conductName").innerHTML =
        s.name;

    document.getElementById("conductParent").innerHTML =
        s.parent;

    document.getElementById("conductValue").innerHTML =
        s.conduct;

    document.getElementById("conductCurrentDate").innerHTML =
        new Date().toLocaleDateString();

}
// ======================================
// PRINT FUNCTIONS
// ======================================
function printSection(sectionId){

    document.getElementById("certificateArea").classList.remove("print-active");
    document.getElementById("studyArea").classList.remove("print-active");
    document.getElementById("conductArea").classList.remove("print-active");

    const section=document.getElementById(sectionId);

    section.classList.add("print-active");

    setTimeout(()=>{
        window.print();
        section.classList.remove("print-active");
    },100);

}
function printCertificate(){

    printSection("certificateArea");

}

function printStudy(){

    printSection("studyArea");

}

function printConduct(){

    printSection("conductArea");

}





function downloadPDF() {
    saveElementAsPDF("certificateArea", "Transfer_Certificate.pdf");
}

function downloadStudyPDF() {
    saveElementAsPDF("studyArea", "Study_Certificate.pdf");
}

function downloadConductPDF() {
    saveElementAsPDF("conductArea", "Conduct_Certificate.pdf");
}
// Common PDF Function
async function saveElementAsPDF(elementId, fileName) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.error("Element not found:", elementId);
        return;
    }
const canvas = await html2canvas(element,{
    scale:4,
    useCORS:true,
    allowTaint:false,
    backgroundColor:"#fcf5e5"
});    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save(fileName);
}