// Main initialization script for the Web Desktop Environment

class WebDesktop {
    constructor() {
        this.isInitialized = false;
        this.backgroundManager = null;
    }

    async init() {
        if (this.isInitialized) return;
        
        console.log('Initializing Web Desktop Environment...');
        
        try {
            // Initialize core systems
            await this.initializeFilesystem();
            await this.initializeDatabase();
            
            // Initialize UI components
            this.initializeBackground();
            this.initializeDesktop();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Show startup message
            this.showStartupMessage();
            
            this.isInitialized = true;
            console.log('Web Desktop Environment initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize Web Desktop Environment:', error);
            this.showErrorMessage('Failed to initialize desktop environment: ' + error.message);
        }
    }

    async initializeFilesystem() {
        console.log('Initializing virtual filesystem...');
        
        // Wait for filesystem to be ready
        if (window.virtualFS) {
            await window.virtualFS.init();
            console.log('Virtual filesystem ready');
        } else {
            throw new Error('Virtual filesystem not available');
        }
    }

    async initializeDatabase() {
        console.log('Initializing database...');
        
        // Wait for database to be ready
        if (window.simpleDB) {
            await window.simpleDB.init();
            console.log('Database ready');
        } else {
            throw new Error('Database not available');
        }
    }

    initializeBackground() {
        console.log('Initializing WebGL background...');
        
        try {
            this.backgroundManager = new WebGLBackground();
            console.log('WebGL background initialized');
        } catch (error) {
            console.warn('WebGL background failed to initialize:', error);
            // Fallback to simple background
            this.setupFallbackBackground();
        }
    }

    initializeDesktop() {
        console.log('Initializing desktop...');
        
        // Desktop is already initialized via desktop.js
        if (window.desktop) {
            window.desktop.startClock();
            console.log('Desktop initialized');
        } else {
            throw new Error('Desktop not available');
        }
    }

    setupFallbackBackground() {
        const canvas = document.getElementById('webgl-background');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Simple gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#1e1e2e');
            gradient.addColorStop(1, '#181825');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    setupGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Handle unload events
        window.addEventListener('beforeunload', (e) => {
            this.handleBeforeUnload(e);
        });
        
        // Prevent default drag and drop on the page
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('drop', (e) => {
            e.preventDefault();
        });
        
        // Handle keyboard shortcuts that should work globally
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboard(e);
        });
    }

    handleWindowResize() {
        // Update background if using WebGL
        if (this.backgroundManager && this.backgroundManager.onWindowResize) {
            this.backgroundManager.onWindowResize();
        }
        
        // Update fallback background
        const canvas = document.getElementById('webgl-background');
        if (canvas && !this.backgroundManager) {
            this.setupFallbackBackground();
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause animations, etc.
            console.log('Desktop hidden');
        } else {
            // Page is visible - resume animations
            console.log('Desktop visible');
        }
    }

    handleBeforeUnload(e) {
        // Check if there are any unsaved changes
        const hasUnsavedChanges = this.checkForUnsavedChanges();
        
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    }

    handleGlobalKeyboard(e) {
        // Global keyboard shortcuts that work regardless of active window
        
        // Alt+F4 - Close active window (Windows-like)
        if (e.altKey && e.key === 'F4') {
            e.preventDefault();
            if (window.windowManager && window.windowManager.activeWindow) {
                window.windowManager.closeWindow(window.windowManager.activeWindow);
            }
        }
        
        // Ctrl+Alt+T - Open terminal
        if (e.ctrlKey && e.altKey && e.key === 't') {
            e.preventDefault();
            openApp('terminal');
        }
        
        // Ctrl+Alt+F - Open file manager
        if (e.ctrlKey && e.altKey && e.key === 'f') {
            e.preventDefault();
            openApp('file-manager');
        }
        
        // Win+R - Open "run" dialog (simplified as file manager for now)
        if (e.metaKey && e.key === 'r') {
            e.preventDefault();
            openApp('file-manager');
        }
    }

    checkForUnsavedChanges() {
        // Check all open applications for unsaved changes
        // This is a simplified implementation
        return false;
    }

    showStartupMessage() {
        // Create a temporary welcome message
        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 18px;
            text-align: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        
        welcome.innerHTML = `
            <h2 style="margin: 0 0 10px 0;">Welcome to Web Desktop</h2>
            <p style="margin: 0;">Your virtual desktop environment is ready!</p>
        `;
        
        document.body.appendChild(welcome);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            welcome.remove();
        }, 3000);
    }

    showErrorMessage(message) {
        const error = document.createElement('div');
        error.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 400px;
        `;
        
        error.innerHTML = `
            <strong>Error:</strong> ${message}
            <button onclick="this.parentElement.remove()" style="
                float: right;
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                margin-left: 10px;
            ">×</button>
        `;
        
        document.body.appendChild(error);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (error.parentElement) {
                error.remove();
            }
        }, 10000);
    }

    // Performance monitoring
    getPerformanceInfo() {
        return {
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            } : null,
            timing: performance.timing,
            openWindows: window.windowManager ? window.windowManager.windows.size : 0,
            userAgent: navigator.userAgent
        };
    }

    // Debug utilities
    enableDebugMode() {
        console.log('Debug mode enabled');
        
        // Add debug info to window
        window.debugInfo = {
            desktop: this,
            windowManager: window.windowManager,
            virtualFS: window.virtualFS,
            simpleDB: window.simpleDB,
            performance: this.getPerformanceInfo()
        };
        
        console.log('Debug info available at window.debugInfo');
    }
}

// Create global desktop instance
window.webDesktop = new WebDesktop();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.webDesktop.init();
    });
} else {
    // DOM is already ready
    window.webDesktop.init();
}

// Export for debugging
window.enableDebugMode = () => window.webDesktop.enableDebugMode();