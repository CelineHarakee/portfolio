// Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'flex';
            }
        });

        // Smooth scrolling and active nav links
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars when skills section is visible
                    if (entry.target.closest('#skills')) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 200);
                        });
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-fade').forEach(el => {
            observer.observe(el);
        });

        // Contact form submission
        function handleSubmit(event) {
            event.preventDefault();
            const messageDiv = document.getElementById('form-message');
            const messageParagraph = messageDiv.querySelector('p');
            
            // Show success message
            messageDiv.className = 'form-message success';
            messageDiv.style.display = 'block';
            messageParagraph.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            
            // Reset form
            event.target.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
            });
        });

        // --- Bento Box Spotlight Effect ---
        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.style.setProperty('--spotlight-color', card.getAttribute('data-spotlight') || 'rgba(99, 193, 50, 0.15)');
            });
        });

        // --- Typing Effect for Terminal Card ---
        const typingCodeElement = document.getElementById('typing-code');
        if (typingCodeElement) {
            const fullText = `const developer = {\n  languages: [\n    "Python", \n    "Java", \n    "C++", \n    "JavaScript", \n    "Swift"\n  ],\n  status: "Deploying intelligent systems..."\n};`;

            let currentIndex = 0;
            
            function formatCode(text) {
                return text
                    .replace(/const/g, '<span class="text-purple-600">const</span>')
                    .replace(/developer/g, '<span class="text-blue-600">developer</span>')
                    .replace(/languages/g, '<span class="text-gray-600">languages</span>')
                    .replace(/status/g, '<span class="text-gray-600">status</span>')
                    .replace(/"(.*?)"/g, '<span class="text-[#2a7221]">"$1"</span>');
            }

            function type() {
                if (currentIndex < fullText.length) {
                    typingCodeElement.innerHTML = formatCode(fullText.slice(0, currentIndex + 1));
                    currentIndex++;
                    setTimeout(type, 30 + Math.random() * 30);
                } else {
                    setTimeout(() => {
                        currentIndex = 0;
                        typingCodeElement.innerHTML = '';
                        type();
                    }, 5000);
                }
            }
            
            // Start the infinite typing loop
            type();
        }

// --- KNOWLEDGE ECOSYSTEM LOGIC ---
document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL CSS FIXES FOR MOBILE ---
    // Injecting CSS here ensures horizontal scroll, squished icons, and mobile grid issues are instantly fixed.
    const styleFix = document.createElement('style');
    styleFix.innerHTML = `
        /* 1. Prevent website from moving left/right on scroll */
        html, body {
            overflow-x: hidden !important;
            width: 100%;
            position: relative;
        }
        
        /* 2. Prevent Free Consultation icon from squishing */
        a[href^="mailto"] > div:first-child {
            flex-shrink: 0 !important;
            min-width: 4rem;
            min-height: 4rem;
        }

        /* 3. Force Projects and Papers to perfectly stack on top of each other on mobile */
        @media (max-width: 1023px) {
            #graph-area {
                flex-direction: column !important;
                gap: 2rem !important;
            }
            #col-projects, #col-papers, #section-projects, #section-papers,
            #grid-projects, #grid-papers {
                width: 100% !important;
                max-width: 100% !important;
                align-items: center !important;
            }
            .node-card {
                width: 100% !important;
                max-width: 100% !important;
            }
        }
    `;
    document.head.appendChild(styleFix);

    const networkData = [
        // Application (Projects) - Top Grid
        { 
            id: 'p0', 
            type: 'project', 
            title: 'AgentNation', 
            icon: 'fa-robot', 
            tags: ['Agentic AI', 'LLM', 'Governmental AI', 'Simulation', 'RAG', 'Knowledge Graph'], 
            link: 'https://github.com/CelineHarakee/AgentNation/', 
            desc: 'A multi-agent AI system that evaluates, compares, and monitors Saudi Vision 2030 workforce policies using LLM-powered specialist agents, RAG-grounded retrieval, and a Knowledge Graph for cross-policy conflict detection.',
            badge: 'Graduation Project',
            badgeIcon: 'fa-graduation-cap'
        },
        { id: 'p1', type: 'project', title: 'Semantic Traffic Coordination', icon: 'fa-car-side', tags: ['Agentic AI', 'LLM', 'RAG', 'NLP', 'Knowledge Graph'], link: 'https://github.com/CelineHarakee/edge-native-agentic-nlp', desc: 'An AI-driven simulation for smart-city traffic coordination, enabling autonomous agents to communicate and make decisions through natural language.' },
        { id: 'p2', type: 'project', title: 'Hajj Companion AI', icon: 'fa-kaaba', tags: ['Python', 'LLM', 'RAG', 'Lovable'], link: 'https://github.com/CelineHarakee/hajj-companion-ai', desc: 'An AI-driven chatbot designed to guide pilgrims through the spiritual journey of Hajj and Umrah, providing accurate, context-aware support in real time.' },
        { id: 'p3', type: 'project', title: 'MyPLC: AI-Powered Comm', icon: 'fa-network-wired', tags: ['Software Engineering', 'Powerline Communication'], link: 'https://github.com/CelineHarakee/MyPLC/tree/main', desc: 'An AI-driven application tailored to monitor Powerline Communication networks, featuring real-time device monitoring and AI-based threat detection.' },
        { id: 'p4', type: 'project', title: 'ChargingZone - PLC Demo', icon: 'fa-plug', tags: ['Raspberry Pi', 'Powerline Communication'], link: 'https://github.com/CelineHarakee/ChargingZone-PLC-Demo', desc: 'A Raspberry Pi-based system simulating Powerline Communication by combining physical charging with automatic Wi-Fi onboarding.' },
        { id: 'p5', type: 'project', title: 'IoT Cyber Attack Detection', icon: 'fa-shield-halved', tags: ['Python', 'Machine Learning', 'IoT Devices'], link: 'https://github.com/CelineHarakee/IoT-Cyber-Attack-Detection-Using-ML', desc: 'An intelligent intrusion detection system for securing IoT devices by identifying cyberattacks in real time using traditional and deep learning algorithms.' },
        
        // Hidden from "All", visible in "Projects"
        { id: 'p6', type: 'project', title: 'Numerical IVP Solver', icon: 'fa-calculator', tags: ['Numerical Analysis', "Euler's Method", 'Runge-Kutta 6th Order'], link: 'https://github.com/CelineHarakee/Numerical-IVP-Solvers-Euler-Taylor-RK6', desc: 'A Python-based tool for solving differential equations using numerical methods like Euler, Taylor (2nd order), and Runge-Kutta (6th order) with visualization.', hideFromAll: true },
        { id: 'p7', type: 'project', title: 'Player Performance Analysis', icon: 'fa-futbol', tags: ['Data Science', 'Machine Learning', 'Python'], link: 'https://github.com/CelineHarakee/Player-Performance-Analysis', desc: 'A tool predicting football player performance using data science and the Random Forest Regressor algorithm to estimate goal-scoring probabilities.', hideFromAll: false },
        { id: 'p8', type: 'project', title: 'Mini Country Network Sim', icon: 'fa-server', tags: ['Cisco Packet Tracer', 'Networking', 'VLANs', 'ACL'], link: 'https://github.com/CelineHarakee/Mini-Country-Network-Simulation', desc: 'A simulated mini-country network in Cisco Packet Tracer, featuring 5 ministries represented by VLANs, with specialized protocols and ACLs.', hideFromAll: true },
        { id: 'p9', type: 'project', title: 'Music Map', icon: 'fa-music', tags: ['Web Development', 'HTML', 'CSS', 'JS', 'PHP'], link: 'https://github.com/CelineHarakee/MusicMap/tree/main', desc: 'An interactive website that allows users to discover top songs and artists globally, featuring a database management zone powered by PHP and SQL.', hideFromAll: true },
        { id: 'p10', type: 'project', title: 'Todo List Application', icon: 'fa-list-check', tags: ['Java', 'Java Swing', 'Object Oriented'], link: 'https://github.com/CelineHarakee/to-do-list', desc: 'A simple Java Swing application designed to organize daily tasks by grouping them into categories, supporting deadlines and recurring tasks.', hideFromAll: true },

        // Theory (Papers) - Bottom Grid
        { id: 'r1', type: 'paper', title: 'Multi-Agent Edge AI for Traffic', icon: 'fa-file-lines', tags: ['Agentic AI', 'LLMs', 'RAG', 'Knowledge Graph'], link: 'https://www.researchgate.net/publication/399393117_Multi-Agent_Edge_AI_for_Intelligent_Traffic_Coordination', desc: 'Examines the use of Multi-Agent Edge AI for intelligent traffic coordination in smart cities, addressing latency, bandwidth, and resilience challenges.' },
        { id: 'r2', type: 'paper', title: 'AI-Powered Powerline Comm', icon: 'fa-bolt', tags: ['Machine Learning', 'Network Security', 'Powerline Communication'], link: 'https://www.researchgate.net/publication/391217469_AI-Powered_Powerline_Communication_PLC', desc: 'Examines the integration of Artificial Intelligence into PLC networks to address security vulnerabilities, performance optimization, and real-time monitoring.' },
        { id: 'r3', type: 'paper', title: 'Cybersecurity in PLC', icon: 'fa-file-shield', tags: ['Cyber Security', 'Machine Learning', 'Powerline Communication'], link: 'https://www.researchgate.net/publication/391596817_Integrating_AI_and_Cybersecurity_in_Powerline_Connections', desc: 'Explores vulnerabilities introduced by AI-enabled PLC architectures, reviewing advanced techniques like AI-driven anomaly detection and cryptography.' },
        { id: 'r4', type: 'paper', title: 'Cybersecurity in Quantum Era', icon: 'fa-atom', tags: ['Cyber Security', 'IBM', 'Quantum Computing'], link: 'https://www.researchgate.net/publication/387533298_The_Quantum_Frontier_Navigating_the_Future_of_Cybersecurity_in_the_Age_of_Quantum_Computing', desc: 'Examines the impact of quantum computing on cybersecurity, exploring post-quantum cryptography to safeguard sensitive information.' },
        { id: 'r5', type: 'paper', title: 'AI in Medical Imaging', icon: 'fa-notes-medical', tags: ['Artificial Intelligence', 'Health', 'Medical Imaging'], link: 'https://www.researchgate.net/publication/387602712_Exploring_AI_in_Medical_Imaging_and_Diagnosis', desc: 'Focuses on early disease detection and diagnostic accuracy through AI-driven systems, highlighting deep learning models in healthcare.' },
        
        // Hidden from "All", visible in "Papers"
        { id: 'r6', type: 'paper', title: 'AI Driven Virtual Environments', icon: 'fa-vr-cardboard', tags: ['Artificial Intelligence', 'Virtual Environments', 'AR/VR'], link: 'https://www.researchgate.net/publication/380971947_AI_Driven_Virtual_Environments', desc: 'Investigates the potential applications of AI-powered virtual environments across education and healthcare, emphasizing responsible development.', hideFromAll: false },
        { id: 'r7', type: 'paper', title: 'Revolutionizing Round Robin', icon: 'fa-rotate', tags: ['Operating Systems', 'Round Robin'], link: 'https://www.researchgate.net/publication/380971608_Revolutionizing_Round_Robin_Dynamic_Time_Quantum_Scheduling_for_CPU_Efficiency', desc: 'Explores innovative approaches to dynamically adjust time allocations based on process behavior to improve overall system CPU efficiency.', hideFromAll: false }
    ];

    const wrapper = document.getElementById('ecosystem-wrapper') || document.body;
    const container = document.getElementById('graph-container');
    const graphArea = document.getElementById('graph-area');
    
    // Safety fallback in case HTML uses old 'col-projects' IDs
    const sectionProjects = document.getElementById('section-projects') || document.getElementById('col-projects');
    const sectionPapers = document.getElementById('section-papers') || document.getElementById('col-papers');
    const gridProjects = document.getElementById('grid-projects') || sectionProjects;
    const gridPapers = document.getElementById('grid-papers') || sectionPapers;
    
    const canvas = document.getElementById('graph-lines');
    let ctx = null;
    if (canvas) ctx = canvas.getContext('2d');
    
    // Set initial responsive classes for 'all' view
    if (graphArea) graphArea.className = 'w-full flex flex-col lg:flex-row justify-between z-10 relative gap-8 lg:gap-0';
    if (sectionProjects) sectionProjects.className = 'w-full lg:w-1/2 flex flex-col items-center lg:items-start relative z-10';
    if (sectionPapers) sectionPapers.className = 'w-full lg:w-1/2 flex flex-col items-center lg:items-end relative z-10';
    if (gridProjects) gridProjects.className = 'flex flex-col gap-4 w-full max-w-md lg:max-w-none';
    if (gridPapers) gridPapers.className = 'flex flex-col gap-4 w-full max-w-md lg:max-w-none items-center lg:items-end';
    if (canvas) canvas.classList.add('hidden', 'lg:block');

    let currentFilter = 'all';
    let activeNodeId = null;
    let hoveredNodeId = null;
    let nodeElements = {};
    
    function isVisible(item) {
        if (currentFilter === 'all') {
            return item.hideFromAll !== true; 
        }
        return item.type === currentFilter;
    }

    function createNodes() {
        networkData.forEach(item => {
            const node = document.createElement('div');
            node.className = `node-card ${item.type}`;
            node.dataset.id = item.id;
            
            const badgeHtml = item.badge 
                ? `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 border border-gray-300 bg-gray-50 text-gray-500 text-[9px] font-bold rounded-full uppercase tracking-wide shrink-0">
                    <i class="fa-solid ${item.badgeIcon || 'fa-star'}"></i> ${item.badge}
                   </span>` 
                : '';

            node.innerHTML = `
                <div class="flex items-start gap-3 w-full">
                    <div class="node-icon shrink-0">
                        <i class="fa-solid ${item.icon}"></i>
                    </div>
                    <div class="flex flex-col items-start gap-1.5 mt-0.5 min-w-0">
                        <span class="node-title leading-tight">${item.title}</span>
                        ${badgeHtml}
                    </div>
                </div>
                <p class="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed pr-2">${item.desc}</p>
            `;

            if (!isVisible(item)) {
                node.style.display = 'none';
            }

            node.addEventListener('mouseenter', () => { hoveredNodeId = item.id; updateHighlights(); });
            node.addEventListener('mouseleave', () => { hoveredNodeId = null; updateHighlights(); });
            node.addEventListener('click', () => { 
                activeNodeId = item.id; 
                updateHighlights(); 
                updateDetailsPanel(item); 
                
                // Auto-scroll to details panel on mobile
                if (window.innerWidth < 1024) {
                    const detailsPanel = document.getElementById('details-panel');
                    if (detailsPanel) {
                        const yOffset = -80; // Offset for fixed navbar
                        const y = detailsPanel.getBoundingClientRect().top + window.scrollY + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }
            });

            nodeElements[item.id] = node;
            
            if (item.type === 'project' && gridProjects) gridProjects.appendChild(node);
            else if (gridPapers) gridPapers.appendChild(node);
        });
    }

    function getSharedTags(item1, item2) {
        const t1 = item1.tags.map(t => t.toLowerCase().trim());
        const t2 = item2.tags.map(t => t.toLowerCase().trim());
        return t1.filter(t => t2.includes(t));
    }

    function updateHighlights() {
        const hasHover = hoveredNodeId !== null;
        if (hasHover && graphArea) graphArea.classList.add('has-hover');
        else if (graphArea) graphArea.classList.remove('has-hover');

        Object.values(nodeElements).forEach(el => {
            el.classList.remove('highlighted', 'active');
            if (el.dataset.id === activeNodeId) el.classList.add('active');
        });

        if (hoveredNodeId && currentFilter === 'all') {
            const hoveredItem = networkData.find(d => d.id === hoveredNodeId);
            if (nodeElements[hoveredNodeId]) nodeElements[hoveredNodeId].classList.add('highlighted');
            
            networkData.forEach(item => {
                if (item.id !== hoveredNodeId && isVisible(item)) {
                    const shared = getSharedTags(hoveredItem, item);
                    if (shared.length > 0 && nodeElements[item.id]) nodeElements[item.id].classList.add('highlighted');
                }
            });
        }
    }

    function drawLines() {
        if (!canvas || !ctx) return;
        
        if (currentFilter !== 'all' || window.innerWidth < 1024) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (currentFilter === 'all') {
                requestAnimationFrame(drawLines);
            }
            return;
        }

        canvas.width = container.clientWidth;
        canvas.height = container.scrollHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const visibleData = networkData.filter(isVisible);

        for (let i = 0; i < visibleData.length; i++) {
            for (let j = i + 1; j < visibleData.length; j++) {
                const item1 = visibleData[i];
                const item2 = visibleData[j];
                const sharedTags = getSharedTags(item1, item2);

                if (sharedTags.length > 0) {
                    const el1 = nodeElements[item1.id];
                    const el2 = nodeElements[item2.id];
                    
                    if (!el1 || !el2) continue;
                    
                    const rect1 = el1.getBoundingClientRect();
                    const rect2 = el2.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    
                    let x1, y1, x2, y2;

                    if (item1.type === 'project' && item2.type === 'paper') {
                        x1 = rect1.right - containerRect.left;
                        y1 = rect1.top + rect1.height/2 - containerRect.top;
                        x2 = rect2.left - containerRect.left;
                        y2 = rect2.top + rect2.height/2 - containerRect.top;
                    } else if (item1.type === 'paper' && item2.type === 'project') {
                        x1 = rect1.left - containerRect.left;
                        y1 = rect1.top + rect1.height/2 - containerRect.top;
                        x2 = rect2.right - containerRect.left;
                        y2 = rect2.top + rect2.height/2 - containerRect.top;
                    } else {
                        x1 = (item1.type === 'project' ? rect1.left : rect1.right) - containerRect.left;
                        y1 = rect1.top + rect1.height/2 - containerRect.top;
                        x2 = (item2.type === 'project' ? rect2.left : rect2.right) - containerRect.left;
                        y2 = rect2.top + rect2.height/2 - containerRect.top;
                    }

                    let isHighlighted = false;
                    if (hoveredNodeId) {
                        if (item1.id === hoveredNodeId || item2.id === hoveredNodeId) isHighlighted = true;
                        else continue; 
                    }

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);

                    if (item1.type !== item2.type) {
                        const cp1x = x1 + (x2 - x1) / 2;
                        ctx.bezierCurveTo(cp1x, y1, cp1x, y2, x2, y2);
                    } else {
                        const offset = item1.type === 'project' ? -60 : 60;
                        ctx.bezierCurveTo(x1 + offset, y1 + offset, x2 + offset, y2 + offset, x2, y2);
                    }
                    
                    if (isHighlighted) {
                        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                        gradient.addColorStop(0, 'rgba(99, 193, 50, 0.8)'); 
                        gradient.addColorStop(1, 'rgba(42, 114, 33, 0.8)'); 
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2.5;
                        ctx.setLineDash([8, 8]);
                        ctx.lineDashOffset = -(Date.now() / 40) % 16; 
                    } else {
                        ctx.strokeStyle = 'rgba(226, 232, 240, 0.6)'; 
                        ctx.lineWidth = 1.5;
                        ctx.setLineDash([]);
                    }
                    ctx.stroke();
                }
            }
        }
        if (currentFilter === 'all') {
            requestAnimationFrame(drawLines);
        }
    }

    function updateDetailsPanel(item) {
        const emptyState = document.getElementById('details-empty');
        const contentState = document.getElementById('details-content');
        
        if (emptyState) {
            emptyState.style.opacity = '0';
            emptyState.style.pointerEvents = 'none';
        }
        if (contentState) {
            contentState.style.opacity = '1';
            contentState.style.pointerEvents = 'auto';
        }

        const typeBadge = document.getElementById('detail-type');
        if (typeBadge) {
            if (item.type === 'project') {
                typeBadge.textContent = 'Project';
                typeBadge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase border bg-[#63c132]/10 text-[#2a7221] border-[#63c132]/30';
            } else {
                typeBadge.textContent = 'Research Paper';
                typeBadge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase border bg-gray-50 text-gray-600 border-gray-200';
            }
        }
        
        // DYNAMIC TITLE WITH BADGE FOR SIDE PANEL
        const titleEl = document.getElementById('detail-title');
        if (titleEl) {
            if (item.badge) {
                titleEl.innerHTML = `${item.title} <span class="align-middle inline-flex items-center gap-1.5 px-2.5 py-1 ml-2 border border-gray-300 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider mb-1"><i class="fa-solid ${item.badgeIcon}"></i> ${item.badge}</span>`;
            } else {
                titleEl.textContent = item.title;
            }
        }

        const descEl = document.getElementById('detail-desc');
        if (descEl) descEl.textContent = item.desc;
        
        const tagsContainer = document.getElementById('detail-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = item.tags.map(tag => 
                `<span class="px-2.5 py-1 bg-white text-gray-700 rounded-lg text-[11px] font-bold border border-gray-200 shadow-sm">${tag}</span>`
            ).join('');
        }

        const linkBtn = document.getElementById('detail-link');
        if (linkBtn) linkBtn.href = item.link;
        
        const linkText = document.getElementById('link-text');
        if (linkText) linkText.textContent = item.type === 'project' ? 'View Repository' : 'Read Paper';
        
        const linkIcon = document.getElementById('link-icon');
        if (linkIcon) linkIcon.className = item.type === 'project' ? 'fa-brands fa-github' : 'fa-solid fa-arrow-right';
    }

    createNodes();
    
    const firstItem = networkData[0];
    if (firstItem) {
        activeNodeId = firstItem.id;
        updateHighlights();
        updateDetailsPanel(firstItem);
    }

    setTimeout(drawLines, 200);
    window.addEventListener('resize', drawLines);

    // Filter Toggle Logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.className = 'filter-btn px-6 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#2a7221] transition-all';
            });
            e.target.className = 'filter-btn active px-6 py-2 rounded-full text-sm font-bold transition-all bg-[#63c132]/20 text-[#2a7221]';
            
            currentFilter = e.target.dataset.filter;
            if (wrapper && wrapper !== document.body) {
                wrapper.className = `flex flex-col lg:flex-row gap-6 relative items-start view-${currentFilter}`;
            }

            // Handle display toggling
            Object.values(nodeElements).forEach(el => {
                const id = el.dataset.id;
                const item = networkData.find(d => d.id === id);
                if (isVisible(item)) {
                    el.style.display = 'flex'; 
                } else {
                    el.style.display = 'none';
                }
            });

            if (activeNodeId) {
                const activeItem = networkData.find(d => d.id === activeNodeId);
                if (!activeItem || !isVisible(activeItem)) {
                    activeNodeId = null;
                    const emptyState = document.getElementById('details-empty');
                    const contentState = document.getElementById('details-content');
                    if (emptyState) {
                        emptyState.style.opacity = '1';
                        emptyState.style.pointerEvents = 'auto';
                    }
                    if (contentState) {
                        contentState.style.opacity = '0';
                        contentState.style.pointerEvents = 'none';
                    }
                }
            }

            if (currentFilter === 'all') {
                if (graphArea) graphArea.className = 'w-full flex flex-col lg:flex-row justify-between z-10 relative gap-8 lg:gap-0';
                if (sectionProjects) {
                    sectionProjects.style.display = 'flex';
                    sectionProjects.className = 'w-full lg:w-1/2 flex flex-col items-center lg:items-start relative z-10';
                }
                if (sectionPapers) {
                    sectionPapers.style.display = 'flex';
                    sectionPapers.className = 'w-full lg:w-1/2 flex flex-col items-center lg:items-end relative z-10';
                }
                if (gridProjects) gridProjects.className = 'flex flex-col gap-4 w-full max-w-md lg:max-w-none';
                if (gridPapers) gridPapers.className = 'flex flex-col gap-4 w-full max-w-md lg:max-w-none items-center lg:items-end';
                if (canvas) canvas.style.display = ''; // Let Tailwind hidden lg:block handle it
            } else if (currentFilter === 'project') {
                if (graphArea) graphArea.className = 'w-full block z-10 relative';
                if (sectionPapers) sectionPapers.style.display = 'none';
                if (sectionProjects) {
                    sectionProjects.style.display = 'block';
                    sectionProjects.className = 'w-full relative z-10';
                }
                if (gridProjects) gridProjects.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full max-w-none';
                if (canvas) canvas.style.display = 'none';
            } else if (currentFilter === 'paper') {
                if (graphArea) graphArea.className = 'w-full block z-10 relative';
                if (sectionProjects) sectionProjects.style.display = 'none';
                if (sectionPapers) {
                    sectionPapers.style.display = 'block';
                    sectionPapers.className = 'w-full relative z-10';
                }
                if (gridPapers) gridPapers.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full max-w-none';
                if (canvas) canvas.style.display = 'none';
            }

            setTimeout(() => {
                updateHighlights();
                if (currentFilter === 'all') drawLines();
            }, 50);
        });
    });
});
