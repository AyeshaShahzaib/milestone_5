document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d, _e;
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateResume();
    });
    (_a = document.getElementById('add_education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return addField('education'); });
    (_b = document.getElementById('add_experience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return addField('experience'); });
    (_c = document.getElementById('add_skill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return addField('skills'); });
    // Add listener for the Edit button
    (_d = document.getElementById('edit_resume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return editResume(); });
    // Add listener for the Download PDF button
    (_e = document.getElementById('download_pdf')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return downloadPDF(); });
});
function addField(sectionId) {
    var section = document.getElementById(sectionId);
    var textarea = document.createElement('textarea');
    textarea.name = sectionId;
    textarea.placeholder = "Your ".concat(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
    textarea.required = true;
    section.appendChild(textarea);
}
function generateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contactNo = document.getElementById('contact_no').value;
    var education = getValues('education');
    var experience = getValues('experience');
    var skills = getValues('skills');
    updateResume(name, email, contactNo, education, experience, skills);
    var resumeSection = document.getElementById('Resume');
    resumeSection.style.display = "block";
    alert("Scroll down to see your resume");
}
function getValues(sectionId) {
    var section = document.getElementById(sectionId);
    var textareas = section.querySelectorAll('textarea');
    return Array.from(textareas).map(function (textarea) { return textarea.value; });
}
function updateResume(name, email, contactNo, education, experience, skills) {
    var resumeSection = document.getElementById('Resume');
    resumeSection.querySelector('.Header2 h1').textContent = name;
    resumeSection.querySelector('.PersonalInfo .p1').innerHTML = "<strong>Name:</strong> ".concat(name);
    resumeSection.querySelector('.PersonalInfo p:nth-child(2)').innerHTML = "<strong>Email:</strong> ".concat(email);
    resumeSection.querySelector('.PersonalInfo p:nth-child(3)').innerHTML = "<strong>Contact:</strong> ".concat(contactNo);
    updateSection('education', education);
    updateSection('experience', experience);
    updateSection('skills', skills);
}
function updateSection(sectionId, items) {
    var section = document.querySelector(".".concat(sectionId.charAt(0).toUpperCase() + sectionId.slice(1), " ul"));
    section.innerHTML = '';
    items.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        section.appendChild(li);
    });
}
function editResume() {
    var name = document.querySelector('.Header2 h1').textContent;
    var email = document.querySelector('.PersonalInfo p:nth-child(2)').textContent.split(': ')[1];
    var contactNo = document.querySelector('.PersonalInfo p:nth-child(3)').textContent.split(': ')[1];
    document.getElementById('name').value = name || '';
    document.getElementById('email').value = email || '';
    document.getElementById('contact_no').value = contactNo || '';
    var education = getTextValues('.Education ul');
    var experience = getTextValues('.Experience ul');
    var skills = getTextValues('.Skills ul');
    repopulateSection('education', education);
    repopulateSection('experience', experience);
    repopulateSection('skills', skills);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function getTextValues(selector) {
    var items = document.querySelectorAll("".concat(selector, " li"));
    return Array.from(items).map(function (item) { return item.textContent || ''; });
}
function repopulateSection(sectionId, values) {
    var section = document.getElementById(sectionId);
    section.innerHTML = ''; // Clear existing fields
    values.forEach(function (value) {
        var textarea = document.createElement('textarea');
        textarea.name = sectionId;
        textarea.placeholder = "Your ".concat(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        textarea.required = true;
        textarea.value = value;
        section.appendChild(textarea);
    });
}
// Function to download resume as PDF
function downloadPDF() {
    var resumeSection = document.getElementById('Resume');
    // Hide buttons before generating PDF
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) { return button.style.display = 'none'; });
    // Use html2pdf to generate and download the PDF
    html2pdf(resumeSection, {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).then(function () {
        // Show buttons again after generating PDF
        buttons.forEach(function (button) { return button.style.display = 'inline-block'; });
    });
}
