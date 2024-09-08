document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form') as HTMLFormElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateResume();
    });

    document.getElementById('add_education')?.addEventListener('click', () => addField('education'));
    document.getElementById('add_experience')?.addEventListener('click', () => addField('experience'));
    document.getElementById('add_skill')?.addEventListener('click', () => addField('skills'));

    document.getElementById('edit_resume')?.addEventListener('click', () => editResume());
    document.getElementById('download_pdf')?.addEventListener('click', () => downloadPDF());
    document.getElementById('copy_link')?.addEventListener('click', () => generateUniqueURL());
});

function addField(sectionId: string) {
    const section = document.getElementById(sectionId) as HTMLElement;
    const textarea = document.createElement('textarea');
    textarea.name = sectionId;
    textarea.placeholder = `Your ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
    textarea.required = true;
    section.appendChild(textarea);
}

function generateResume() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contactNo = (document.getElementById('contact_no') as HTMLInputElement).value;

    const education = getValues('education');
    const experience = getValues('experience');
    const skills = getValues('skills');

    updateResume(name, email, contactNo, education, experience, skills);

    const resumeSection = document.getElementById('Resume') as HTMLElement;
    resumeSection.style.display = "block";

    alert("Scroll down to see your resume");
}

function getValues(sectionId: string): string[] {
    const section = document.getElementById(sectionId) as HTMLElement;
    const textareas = section.querySelectorAll('textarea');
    return Array.from(textareas).map(textarea => textarea.value);
}

function updateResume(name: string, email: string, contactNo: string, education: string[], experience: string[], skills: string[]) {
    const resumeSection = document.getElementById('Resume') as HTMLElement;

    resumeSection.querySelector('.Header2 h1')!.textContent = name;
    resumeSection.querySelector('.PersonalInfo .p1')!.innerHTML = `<strong>Name:</strong> ${name}`;
    resumeSection.querySelector('.PersonalInfo p:nth-child(2)')!.innerHTML = `<strong>Email:</strong> ${email}`;
    resumeSection.querySelector('.PersonalInfo p:nth-child(3)')!.innerHTML = `<strong>Contact:</strong> ${contactNo}`;

    updateSection('education', education);
    updateSection('experience', experience);
    updateSection('skills', skills);
}

function updateSection(sectionId: string, items: string[]) {
    const section = document.querySelector(`.${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} ul`) as HTMLElement;
    section.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        section.appendChild(li);
    });
}

function editResume() {
    const name = document.querySelector('.Header2 h1')!.textContent;
    const email = document.querySelector('.PersonalInfo p:nth-child(2)')!.textContent.split(': ')[1];
    const contactNo = document.querySelector('.PersonalInfo p:nth-child(3)')!.textContent.split(': ')[1];

    (document.getElementById('name') as HTMLInputElement).value = name || '';
    (document.getElementById('email') as HTMLInputElement).value = email || '';
    (document.getElementById('contact_no') as HTMLInputElement).value = contactNo || '';

    const education = getTextValues('.Education ul');
    const experience = getTextValues('.Experience ul');
    const skills = getTextValues('.Skills ul');

    repopulateSection('education', education);
    repopulateSection('experience', experience);
    repopulateSection('skills', skills);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getTextValues(selector: string): string[] {
    const items = document.querySelectorAll(`${selector} li`);
    return Array.from(items).map(item => item.textContent || '');
}

function repopulateSection(sectionId: string, values: string[]) {
    const section = document.getElementById(sectionId) as HTMLElement;
    section.innerHTML = ''; 

    values.forEach(value => {
        const textarea = document.createElement('textarea');
        textarea.name = sectionId;
        textarea.placeholder = `Your ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
        textarea.required = true;
        textarea.value = value;
        section.appendChild(textarea);
    });
}

function generateUniqueURL() {
    const name = (document.getElementById('name') as HTMLInputElement).value.trim().replace(/\s+/g, '').toLowerCase();
    const resumeSection = document.getElementById('Resume') as HTMLElement;

  
    const resumeContent = resumeSection.innerHTML;

    
    localStorage.setItem(`resume_${name}`, resumeContent);

  
    const uniqueUrl = `${window.location.origin}/resume.html?user=${name}`;

 
    alert(`Your unique URL: ${uniqueUrl}`);
}

function copyResumeLink() {
    const name = (document.getElementById('name') as HTMLInputElement).value.trim().replace(/\s+/g, '').toLowerCase();
    const uniqueUrl = `${window.location.origin}/resume.html?user=${name}`;


    if (navigator.clipboard) {
        navigator.clipboard.writeText(uniqueUrl).then(() => {
            alert('Resume link copied to clipboard!');
        }).catch(err => {
            console.error('Error copying text: ', err);
            alert('Failed to copy the link. Please try again.');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = uniqueUrl;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Resume link copied to clipboard!');
        } catch (err) {
            console.error('Error copying text: ', err);
            alert('Failed to copy the link. Please try manually.');
        }
        document.body.removeChild(textarea);
    }
}

function downloadPDF() {
    const resumeSection = document.getElementById('Resume') as HTMLElement;
    
  
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    
    html2pdf(resumeSection, {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).then(() => {
     
        buttons.forEach(button => button.style.display = 'inline-block');
    });
}
