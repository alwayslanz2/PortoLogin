document.addEventListener('DOMContentLoaded', function() {
    // This is where you would fetch and display portfolio data
    // For now, we'll use static data
    
    // In a real app, you might fetch this from an API or GitHub repository
    const projects = [
        { title: "Project 1", description: "A web application built with React and Node.js" },
        { title: "Project 2", description: "Mobile app for iOS and Android using Flutter" },
        { title: "Project 3", description: "Data analysis tool with Python and Pandas" }
    ];
    
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        projectGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `).join('');
    }
});
