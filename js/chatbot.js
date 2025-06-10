document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // GitHub projects data - All 5 projects
    const projects = [
        {
            name: "Nginx Website Deployer",
            description: "A tool to automate the deployment of websites using Nginx as a reverse proxy.",
            githubUrl: "https://github.com/sethysatyajit/Nginx-Website-Deployer",
            technologies: ["Bash", "Nginx", "Linux", "Automation"],
            features: [
                "Automated website deployment process",
                "SSL certificate management",
                "Reverse proxy configuration",
                "Server security hardening"
            ],
            liveDemo: null
        },
        {
            name: "Number Converter",
            description: "A utility for converting numbers between different bases (binary, decimal, hexadecimal, etc).",
            githubUrl: "https://github.com/sethysatyajit/Number-Converter",
            technologies: ["JavaScript", "HTML5", "CSS3", "Algorithms"],
            features: [
                "Convert between binary, decimal, octal and hexadecimal",
                "Real-time conversion as you type",
                "Copy to clipboard functionality",
                "Responsive design for all devices"
            ],
            liveDemo: "https://sethysatyajit.github.io/Number-Converter/"
        },
        {
            name: "Subnet Calculator",
            description: "A tool for calculating subnet details such as network address, broadcast address, and more for IPv4 networks.",
            githubUrl: "https://github.com/sethysatyajit/Subnet-Calculator",
            technologies: ["JavaScript", "HTML5", "CSS3", "Networking"],
            features: [
                "Calculate subnet details from IP address and CIDR",
                "Display network address, broadcast address, subnet mask",
                "Show usable host range and number of hosts",
                "Responsive design for all devices"
            ],
            liveDemo: "https://sethysatyajit.github.io/Subnet-Calculator/"
        },
        {
            name: "Students Details Search Engine",
            description: "A search engine for student details, allowing filtering and searching of student records.",
            githubUrl: "https://github.com/sethysatyajit/Students-Details-Search-Engine",
            technologies: ["JavaScript", "HTML5", "CSS3", "Search Algorithms"],
            features: [
                "Search student records by name, ID, or other fields",
                "Filter and sort functionality",
                "Responsive design",
                "Local storage for data persistence"
            ],
            liveDemo: "https://sethysatyajit.github.io/Students-Details-Search-Engine/"
        },
        {
            name: "Shyama Main",
            description: "A web application for managing and visualizing data related to Shyama Prasad Mukherji Rurban Mission (SPMRM).",
            githubUrl: "https://github.com/rahulpatle1308/shyama-main.git",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            features: [
                "Data visualization using charts",
                "User authentication and authorization",
                "CRUD operations for data management",
                "Responsive dashboard design"
            ],
            liveDemo: "https://shyama-main-1.onrender.com/"
        }
    ];
    
    // Initial bot message
    setTimeout(() => {
        addBotMessage("You can ask me about any project. Try commands like:<br>'Show me the Nginx project' or 'Open Students Details Search Engine repo'");
    }, 1000);
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Suggestion buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-btn')) {
            const command = e.target.dataset.command;
            if (command === 'show-projects') {
                showProjects();
            } else if (command === 'nginx-deployer') {
                showRepo('Nginx Website Deployer');
            } else if (command === 'number-converter') {
                showRepo('Number Converter');
            } else if (command === 'subnet-calculator') {
                showRepo('Subnet Calculator');
            } else if (command === 'students-search') {
                showRepo('Students Details Search Engine');
            }
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                processUserMessage(message);
            }, 800);
        }
    }
    
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.innerHTML = `<i class="fas fa-user" style="margin-right: 8px;"></i> ${text}`;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function addBotMessage(text, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        
        if (isHTML) {
            messageDiv.innerHTML = `<i class="fas fa-robot" style="margin-right: 8px;"></i> ${text}`;
        } else {
            messageDiv.innerHTML = `<i class="fas fa-robot" style="margin-right: 8px;"></i> ${text}`;
        }
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function processUserMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            addBotMessage("Hello! I'm your Project Assistant. You can ask about any GitHub project or repository.");
        }
        else if (lowerMsg.includes('project') || lowerMsg.includes('show') || lowerMsg.includes('list')) {
            showProjects();
        }
        else if (lowerMsg.includes('github') || lowerMsg.includes('profile')) {
            showGitHubProfile();
        }
        else if (lowerMsg.includes('help')) {
            showHelp();
        }
        else {
            // Check if message contains a project name
            let foundProject = null;
            
            for (const project of projects) {
                const projectLower = project.name.toLowerCase();
                const repoKeywords = ['repo', 'repository', 'code', 'github', 'link', 'source'];
                
                // Check if message contains project name and a repo keyword
                if (lowerMsg.includes(projectLower) && 
                    repoKeywords.some(keyword => lowerMsg.includes(keyword))) {
                    foundProject = project;
                    break;
                }
                
                // Check if message is just the project name
                if (lowerMsg === projectLower) {
                    foundProject = project;
                    break;
                }
            }
            
            if (foundProject) {
                showRepo(foundProject.name);
            } else {
                // Try to find the closest project match
                const closestProject = findClosestProject(lowerMsg);
                if (closestProject) {
                    addBotMessage(`Did you mean ${closestProject.name}? Here's its repository:`);
                    showRepo(closestProject.name);
                } else {
                    addBotMessage("I'm not sure which project you're referring to. Here are all my projects:");
                    showProjects();
                }
            }
        }
    }
    
    function findClosestProject(input) {
        // Simple approach to find closest project name
        for (const project of projects) {
            const projectLower = project.name.toLowerCase();
            if (projectLower.includes(input) || input.includes(projectLower)) {
                return project;
            }
        }
        return null;
    }
    
    function showProjects() {
        let html = `<h4><i class="fas fa-folder-open"></i> My Projects</h4>
                    <p>Click any project to get its repository:</p>
                    <div class="projects-grid">`;
        
        projects.forEach(project => {
            html += `
            <div class="project-card" onclick="document.querySelector('.chat-input input').value='${project.name} repo'; document.getElementById('send-btn').click()">
                <h4><i class="fas fa-project-diagram"></i> ${project.name}</h4>
                <p>${project.description}</p>
                <div class="tech-list">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <div class="btn">
                    <i class="fab fa-github"></i> Get Repository
                </div>
            </div>
            `;
        });
        
        html += `</div>`;
        addBotMessage(html, true);
    }
    
    function showRepo(projectName) {
        const project = projects.find(p => p.name === projectName);
        
        if (!project) {
            addBotMessage(`Sorry, I couldn't find the "${projectName}" project. Here are all my projects:`);
            showProjects();
            return;
        }
        
        const liveDemoHtml = project.liveDemo ? 
            `<a href="${project.liveDemo}" target="_blank" class="action-btn view-btn">
                <i class="fas fa-external-link-alt"></i> View Live Demo
            </a>` : 
            `<div class="action-btn" style="background:#6c757d; cursor:not-allowed;">
                <i class="fas fa-exclamation-circle"></i> No Live Demo
            </div>`;
        
        const html = `
        <div class="repo-response">
            <h4><i class="fab fa-github"></i> ${project.name} Repository</h4>
            <p>${project.description}</p>
            
            <a href="${project.githubUrl}" target="_blank" class="github-link">
                <i class="fab fa-github"></i> Open ${project.name} Repository
            </a>
            
            <p style="margin-top: 20px;"><strong>Key Features:</strong></p>
            <ul>
                ${project.features.map(feature => 
                    `<li>${feature}</li>`
                ).join('')}
            </ul>
            
            <div class="project-actions">
                <a href="${project.githubUrl}" target="_blank" class="action-btn repo-btn">
                    <i class="fab fa-github"></i> Open Repository
                </a>
                ${liveDemoHtml}
            </div>
        </div>
        `;
        
        addBotMessage(html, true);
    }
    
    function showGitHubProfile() {
        const html = `
        <div class="project-details">
            <h4><i class="fab fa-github"></i> GitHub Profile</h4>
            <p>You can explore all my repositories on GitHub:</p>
            <a href="https://github.com/sethysatyajit" target="_blank" class="github-link">
                <i class="fab fa-github"></i> Visit sethysatyajit on GitHub
            </a>
            <p style="margin-top: 20px;">My repositories include:</p>
            <ul>
                <li>Nginx Website Deployer</li>
                <li>Number Converter</li>
                <li>Subnet Calculator</li>
                <li>Students Details Search Engine</li>
                <li>Shyama Main (Collaborative project)</li>
            </ul>
        </div>
        `;
        addBotMessage(html, true);
    }
    
    function showHelp() {
        const html = `
        <div class="project-details">
            <h4><i class="fas fa-question-circle"></i> How to Use This Assistant</h4>
            <p>This chatbot helps you explore my GitHub projects. Here's how you can interact:</p>
            
            <p><strong>Available Commands:</strong></p>
            <ul>
                <li><strong>"Show projects"</strong> - View all available GitHub projects</li>
                <li><strong>"Tell me about [project]"</strong> - Get details about a specific project</li>
                <li><strong>"Open [project] repo"</strong> - Open the repository for a project</li>
                <li><strong>"GitHub"</strong> - Get a link to my GitHub profile</li>
                <li><strong>"Help"</strong> - Show this help information</li>
            </ul>
            
            <p><strong>Examples:</strong></p>
            <ul>
                <li>"Show me the Nginx project"</li>
                <li>"Open Number Converter repo"</li>
                <li>"Tell me about Subnet Calculator"</li>
                <li>"What is Students Details Search Engine?"</li>
            </ul>
        </div>
        `;
        addBotMessage(html, true);
    }
});