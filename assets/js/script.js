// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialização das funcionalidades
    initializeTableInteractions();
    initializeAnimations();
    initializeResponsiveFeatures();
    
    console.log('🌸 Rotina Semanal carregada com sucesso! 🌸');
});

/**
 * Inicializa as interações da tabela
 */
function initializeTableInteractions() {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        // Adiciona efeito de hover personalizado
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
        
        // Adiciona clique para destacar linha
        row.addEventListener('click', function() {
            // Remove destaque de outras linhas
            tableRows.forEach(r => r.classList.remove('highlighted'));
            
            // Adiciona destaque à linha clicada
            this.classList.add('highlighted');
            
            // Remove destaque após 3 segundos
            setTimeout(() => {
                this.classList.remove('highlighted');
            }, 3000);
        });
    });
}

/**
 * Inicializa animações e efeitos visuais
 */
function initializeAnimations() {
    // Animação de entrada para as células da tabela
    const tableCells = document.querySelectorAll('td, th');
    
    tableCells.forEach((cell, index) => {
        cell.style.opacity = '0';
        cell.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            cell.style.transition = 'all 0.5s ease';
            cell.style.opacity = '1';
            cell.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    // Efeito de pulso para emojis
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        emoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Funcionalidades responsivas
 */
function initializeResponsiveFeatures() {
    // Detecta mudanças no tamanho da tela
    window.addEventListener('resize', handleResize);
    
    // Executa uma vez no carregamento
    handleResize();
    
    // Adiciona funcionalidade de scroll horizontal em dispositivos móveis
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        let isScrolling = false;
        
        tableContainer.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                this.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.1)';
                
                setTimeout(() => {
                    this.style.boxShadow = 'none';
                    isScrolling = false;
                }, 150);
            }
        });
    }
}

/**
 * Manipula redimensionamento da tela
 */
function handleResize() {
    const container = document.querySelector('.container');
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 768) {
        container.style.margin = '10px';
        container.style.borderRadius = '15px';
    } else {
        container.style.margin = '0 auto';
        container.style.borderRadius = '25px';
    }
}

/**
 * Adiciona funcionalidade de filtro por dia da semana
 */
function filterByDay(dayIndex) {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > dayIndex) {
            const cellContent = cells[dayIndex].textContent.trim();
            
            if (cellContent === '--' || cellContent === 'Livre') {
                row.style.opacity = '0.3';
            } else {
                row.style.opacity = '1';
            }
        }
    });
}

/**
 * Reseta filtros aplicados
 */
function resetFilters() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.style.opacity = '1';
        row.classList.remove('highlighted');
    });
}

/**
 * Adiciona funcionalidade de busca
 */
function searchActivity(searchTerm) {
    const rows = document.querySelectorAll('tbody tr');
    const term = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;
        
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(term)) {
                found = true;
            }
        });
        
        if (found || term === '') {
            row.style.display = '';
            row.style.opacity = '1';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Adiciona efeitos de partículas no fundo
 */
function createParticleEffect() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 182, 193, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${5 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 0;
        `;
        
        container.appendChild(particle);
    }
}

/**
 * Funcionalidade de tema escuro/claro (opcional)
 */
function toggleTheme() {
    const body = document.body;
    const container = document.querySelector('.container');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * Carrega tema salvo
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

/**
 * Adiciona tooltips informativos
 */
function initializeTooltips() {
    const activityCells = document.querySelectorAll('.activity');
    
    activityCells.forEach(cell => {
        const activity = cell.textContent.trim();
        let tooltip = '';
        
        switch(activity.toLowerCase()) {
            case 'treino':
                tooltip = 'Exercícios físicos para manter a forma e saúde';
                break;
            case 'estudo':
                tooltip = 'Tempo dedicado ao aprendizado e desenvolvimento';
                break;
            case 'zumba':
                tooltip = 'Dança fitness divertida e energética';
                break;
            case 'fisioterapia':
                tooltip = 'Cuidados com a saúde e bem-estar físico';
                break;
            case 'almoço':
                tooltip = 'Refeição principal do dia';
                break;
            case 'dormir':
                tooltip = 'Descanso essencial para recuperação';
                break;
        }
        
        if (tooltip) {
            cell.title = tooltip;
        }
    });
}

// Adiciona estilos CSS dinâmicos para funcionalidades JavaScript
const dynamicStyles = `
    .highlighted {
        background: linear-gradient(135deg, #ffcccb 0%, #e6ccff 100%) !important;
        transform: scale(1.05) !important;
        box-shadow: 0 8px 25px rgba(255, 182, 193, 0.5) !important;
        z-index: 100 !important;
    }
    
    .dark-theme {
        background: linear-gradient(135deg, #2c1810 0%, #1a0f1a 50%, #2c1820 100%) !important;
        color: #e0d0e0 !important;
    }
    
    .dark-theme .container {
        background: rgba(40, 40, 60, 0.9) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
    }
    
    .particle {
        animation: float 10s infinite linear;
    }
    
    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
`;

// Adiciona os estilos dinâmicos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

