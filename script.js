// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    // Update icon
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Navigation
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Tool Selection
const modal = document.getElementById('file-upload-modal');
const selectedToolTitle = document.getElementById('selected-tool-title');
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const processBtn = document.getElementById('process-btn');
const htmlUrlInput = document.getElementById('html-url-input');
const htmlUrl = document.getElementById('html-url');
const passwordInput = document.getElementById('password-input');
const pdfPassword = document.getElementById('pdf-password');
const rotationOptions = document.getElementById('rotation-options');
const rotateButtons = document.querySelectorAll('.rotate-btn');
const closeModal = document.querySelector('.close-modal');

let selectedTool = null;
let files = [];
let selectedRotation = 0;

// Handle tool selection from navigation dropdown
document.querySelectorAll('.nav-dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tool = item.getAttribute('data-tool');
        const toolTitle = item.querySelector('span').textContent;
        handleToolSelection(tool, toolTitle);
    });
});

// Handle tool selection from tool cards
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.select-tool')) {
            const tool = card.getAttribute('data-tool');
            const toolTitle = card.querySelector('h3').textContent;
            handleToolSelection(tool, toolTitle);
        }
    });
});

// Handle select buttons in tool cards
document.querySelectorAll('.select-tool').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = button.closest('.tool-card');
        const tool = card.getAttribute('data-tool');
        const toolTitle = card.querySelector('h3').textContent;
        handleToolSelection(tool, toolTitle);
    });
});

function handleToolSelection(tool, toolTitle) {
    selectedTool = tool;
    selectedToolTitle.textContent = toolTitle;
    
    // Reset all input sections
    htmlUrlInput.classList.add('hidden');
    passwordInput.classList.add('hidden');
    rotationOptions.classList.add('hidden');
    document.getElementById('compare-inputs').classList.add('hidden');
    document.getElementById('drop-area').classList.remove('hidden');
    
    // Show appropriate input section based on selected tool
    if (tool === 'html-to-pdf') {
        htmlUrlInput.classList.remove('hidden');
    } else if (tool === 'protect' || tool === 'unlock-pdf') {
        passwordInput.classList.remove('hidden');
    } else if (tool === 'rotate-pdf') {
        rotationOptions.classList.remove('hidden');
    } else if (tool === 'compare-pdf' || tool === 'compare-word') {
        document.getElementById('compare-inputs').classList.remove('hidden');
        document.getElementById('drop-area').classList.add('hidden');
    }
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

// Close modal
function closeModalHandler() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }, 300);
    files = [];
    htmlUrl.value = '';
    pdfPassword.value = '';
    selectedRotation = 0;
    rotateButtons.forEach(btn => btn.classList.remove('active'));
    updateFileList();
}

// Close modal when clicking close button or outside modal
closeModal.addEventListener('click', closeModalHandler);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Rotation buttons
rotateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        rotateButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedRotation = parseInt(btn.dataset.rotation);
    });
});

// File Upload
dropArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', handleFiles);
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = 'rgba(13, 148, 136, 0.1)';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.backgroundColor = '';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = '';
    handleFiles({ target: { files: e.dataTransfer.files } });
});

function handleFiles(e) {
    const newFiles = Array.from(e.target.files);
    files = [...files, ...newFiles];
    updateFileList();
}

function updateFileList() {
    fileList.innerHTML = '';
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div>
                <i class="fas ${getFileIcon(file)}"></i>
                <span>${file.name}</span>
            </div>
            <button onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        fileList.appendChild(fileItem);
    });
}

function removeFile(index) {
    files.splice(index, 1);
    updateFileList();
}

function getFileIcon(file) {
    if (file.type === 'application/pdf') {
        return 'fa-file-pdf';
    } else if (file.type.startsWith('image/')) {
        return 'fa-file-image';
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               file.type === 'application/msword') {
        return 'fa-file-word';
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
               file.type === 'application/vnd.ms-excel') {
        return 'fa-file-excel';
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || 
               file.type === 'application/vnd.ms-powerpoint') {
        return 'fa-file-powerpoint';
    } else {
        return 'fa-file';
    }
}

// Process Files
processBtn.addEventListener('click', async () => {
    if (selectedTool === 'html-to-pdf') {
        if (htmlUrl.value.trim() === '' && files.length === 0) {
            alert('Please enter a URL or upload HTML files');
            return;
        }
    } else if (selectedTool === 'compare-pdf' || selectedTool === 'compare-word') {
        const file1 = document.getElementById('file-input-1').files[0];
        const file2 = document.getElementById('file-input-2').files[0];
        if (!file1 || !file2) {
            alert('Please select both files to compare');
            return;
        }
        files = [file1, file2];
    } else if (files.length === 0) {
        alert('Please select files to process');
        return;
    }

    // Validate file types based on selected tool
    if (selectedTool === 'pdf-to-jpg' && !files.every(file => file.type === 'application/pdf')) {
        alert('Please select PDF files for PDF to JPG conversion');
        return;
    }
    if (selectedTool === 'jpg-to-pdf' && !files.every(file => file.type.startsWith('image/'))) {
        alert('Please select image files for JPG to PDF conversion');
        return;
    }
    if (selectedTool === 'html-to-pdf' && files.length > 0 && !files.every(file => file.type === 'text/html')) {
        alert('Please select HTML files for HTML to PDF conversion');
        return;
    }
    if ((selectedTool === 'edit-pdf' || selectedTool === 'sign-pdf' || 
         selectedTool === 'rotate-pdf' || selectedTool === 'unlock-pdf' ||
         selectedTool === 'repair-pdf' || selectedTool === 'compare-pdf') && 
        !files.every(file => file.type === 'application/pdf')) {
        alert('Please select PDF files');
        return;
    }
    if (selectedTool === 'compare-word' && !files.every(file => 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        file.type === 'application/msword')) {
        alert('Please select Word documents (.doc or .docx)');
        return;
    }
    if (selectedTool === 'unlock-pdf' && !pdfPassword.value.trim()) {
        alert('Please enter the PDF password');
        return;
    }
    if (selectedTool === 'rotate-pdf' && selectedRotation === 0) {
        alert('Please select a rotation angle');
        return;
    }

    processBtn.disabled = true;
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        // Here you would typically send the files to your backend
        // For demonstration, we'll simulate processing
        await simulateProcessing();
        
        // Show appropriate success message based on the selected tool
        let successMessage = 'Files processed successfully!';
        if (selectedTool === 'pdf-to-word') {
            successMessage = 'PDF converted to Word successfully!';
        } else if (selectedTool === 'pdf-to-excel') {
            successMessage = 'PDF converted to Excel successfully!';
        } else if (selectedTool === 'pdf-to-powerpoint') {
            successMessage = 'PDF converted to PowerPoint successfully!';
        } else if (selectedTool === 'pdf-to-jpg') {
            successMessage = 'PDF converted to JPG images successfully!';
        } else if (selectedTool === 'jpg-to-pdf') {
            successMessage = 'Images converted to PDF successfully!';
        } else if (selectedTool === 'html-to-pdf') {
            successMessage = 'HTML converted to PDF successfully!';
        } else if (selectedTool === 'edit-pdf') {
            successMessage = 'PDF edited successfully!';
        } else if (selectedTool === 'sign-pdf') {
            successMessage = 'PDF signed successfully!';
        } else if (selectedTool === 'rotate-pdf') {
            successMessage = `PDF rotated ${selectedRotation}° successfully!`;
        } else if (selectedTool === 'unlock-pdf') {
            successMessage = 'PDF unlocked successfully!';
        } else if (selectedTool === 'word-to-pdf') {
            successMessage = 'Word document converted to PDF successfully!';
        } else if (selectedTool === 'repair-pdf') {
            successMessage = 'PDF repaired successfully!';
        } else if (selectedTool === 'compare-pdf') {
            successMessage = 'PDFs compared successfully!';
        } else if (selectedTool === 'compare-word') {
            successMessage = 'Word documents compared successfully!';
        }
        
        alert(successMessage);
        closeModalHandler();
    } catch (error) {
        alert('Error processing files: ' + error.message);
    } finally {
        processBtn.disabled = false;
        processBtn.textContent = 'Process Files';
    }
});

function simulateProcessing() {
    return new Promise(resolve => setTimeout(resolve, 2000));
} 