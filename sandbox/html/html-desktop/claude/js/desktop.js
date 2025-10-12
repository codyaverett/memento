class Desktop {
    constructor() {
        this.selectedIcons = new Set();
        this.isSelecting = false;
        this.selectionStart = { x: 0, y: 0 };
        this.contextMenu = null;
        
        this.setupEventListeners();
        this.setupContextMenu();
    }

    setupEventListeners() {
        const desktop = document.getElementById('desktop');
        
        // Desktop click events
        desktop.addEventListener('click', (e) => this.handleDesktopClick(e));
        desktop.addEventListener('contextmenu', (e) => this.handleDesktopContextMenu(e));
        
        // Mouse events for selection box
        desktop.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        desktop.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        desktop.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Icon events
        this.setupIconEvents();
        
        // Start menu
        this.setupStartMenu();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Prevent default drag behavior on desktop
        desktop.addEventListener('dragstart', (e) => e.preventDefault());
    }

    setupIconEvents() {
        const icons = document.querySelectorAll('.desktop-icon');
        
        icons.forEach(icon => {
            icon.addEventListener('click', (e) => this.handleIconClick(e));
            icon.addEventListener('dblclick', (e) => this.handleIconDoubleClick(e));
            icon.addEventListener('contextmenu', (e) => this.handleIconContextMenu(e));
            
            // Make icons draggable
            icon.draggable = true;
            icon.addEventListener('dragstart', (e) => this.handleIconDragStart(e));
            icon.addEventListener('dragend', (e) => this.handleIconDragEnd(e));
        });
        
        // Drop zone for desktop
        const desktop = document.getElementById('desktop');
        desktop.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        desktop.addEventListener('drop', (e) => this.handleIconDrop(e));
    }

    setupStartMenu() {
        const startButton = document.getElementById('start-button');
        const startMenuContent = document.getElementById('start-menu-content');
        
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenuContent.classList.toggle('hidden');
        });
        
        // Close start menu when clicking elsewhere
        document.addEventListener('click', () => {
            startMenuContent.classList.add('hidden');
        });
        
        // Prevent start menu from closing when clicking inside it
        startMenuContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    setupContextMenu() {
        this.contextMenu = document.getElementById('context-menu');
        
        // Close context menu when clicking elsewhere
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
    }

    handleDesktopClick(e) {
        if (e.target.id === 'desktop' || e.target.id === 'webgl-background') {
            this.clearIconSelection();
            this.hideContextMenu();
        }
    }

    handleDesktopContextMenu(e) {
        if (e.target.id === 'desktop' || e.target.id === 'webgl-background') {
            e.preventDefault();
            this.showContextMenu(e.pageX, e.pageY, 'desktop');
        }
    }

    handleIconClick(e) {
        e.stopPropagation();
        const icon = e.currentTarget;
        const appName = icon.dataset.app;
        
        if (e.ctrlKey || e.metaKey) {
            // Multi-select
            this.toggleIconSelection(icon);
        } else {
            // Single select
            this.clearIconSelection();
            this.selectIcon(icon);
        }
    }

    handleIconDoubleClick(e) {
        e.stopPropagation();
        const icon = e.currentTarget;
        const appName = icon.dataset.app;
        
        this.openApp(appName);
    }

    handleIconContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const icon = e.currentTarget;
        if (!this.selectedIcons.has(icon)) {
            this.clearIconSelection();
            this.selectIcon(icon);
        }
        
        this.showContextMenu(e.pageX, e.pageY, 'icon');
    }

    handleIconDragStart(e) {
        const icon = e.currentTarget;
        if (!this.selectedIcons.has(icon)) {
            this.clearIconSelection();
            this.selectIcon(icon);
        }
        
        e.dataTransfer.setData('text/plain', icon.dataset.app);
        e.dataTransfer.effectAllowed = 'move';
        
        // Store the original position
        const rect = icon.getBoundingClientRect();
        const desktopRect = document.getElementById('desktop').getBoundingClientRect();
        
        e.dataTransfer.setData('application/json', JSON.stringify({
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
            originalX: rect.left - desktopRect.left,
            originalY: rect.top - desktopRect.top
        }));
    }

    handleIconDragEnd(e) {
        // Clean up any drag styling
        e.currentTarget.style.opacity = '';
    }

    handleIconDrop(e) {
        e.preventDefault();
        
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        const appName = e.dataTransfer.getData('text/plain');
        
        // Calculate new position
        const desktop = document.getElementById('desktop');
        const desktopRect = desktop.getBoundingClientRect();
        const newX = e.clientX - desktopRect.left - data.offsetX;
        const newY = e.clientY - desktopRect.top - data.offsetY;
        
        // Find the icon and update its position
        const icon = document.querySelector(`[data-app="${appName}"]`);
        if (icon) {
            icon.style.position = 'absolute';
            icon.style.left = `${Math.max(0, newX)}px`;
            icon.style.top = `${Math.max(0, newY)}px`;
        }
    }

    handleMouseDown(e) {
        if (e.target.id === 'desktop' || e.target.id === 'webgl-background') {
            this.isSelecting = true;
            this.selectionStart.x = e.clientX;
            this.selectionStart.y = e.clientY;
            
            this.clearIconSelection();
            this.showSelectionBox(e.clientX, e.clientY, 0, 0);
        }
    }

    handleMouseMove(e) {
        if (this.isSelecting) {
            const width = Math.abs(e.clientX - this.selectionStart.x);
            const height = Math.abs(e.clientY - this.selectionStart.y);
            const left = Math.min(e.clientX, this.selectionStart.x);
            const top = Math.min(e.clientY, this.selectionStart.y);
            
            this.showSelectionBox(left, top, width, height);
            this.selectIconsInBox(left, top, width, height);
        }
    }

    handleMouseUp(e) {
        if (this.isSelecting) {
            this.isSelecting = false;
            this.hideSelectionBox();
        }
    }

    showSelectionBox(x, y, width, height) {
        const selectionBox = document.getElementById('selection-box');
        selectionBox.style.left = `${x}px`;
        selectionBox.style.top = `${y}px`;
        selectionBox.style.width = `${width}px`;
        selectionBox.style.height = `${height}px`;
        selectionBox.classList.remove('hidden');
    }

    hideSelectionBox() {
        const selectionBox = document.getElementById('selection-box');
        selectionBox.classList.add('hidden');
    }

    selectIconsInBox(boxLeft, boxTop, boxWidth, boxHeight) {
        const icons = document.querySelectorAll('.desktop-icon');
        
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconLeft = rect.left;
            const iconTop = rect.top;
            const iconRight = rect.right;
            const iconBottom = rect.bottom;
            
            const boxRight = boxLeft + boxWidth;
            const boxBottom = boxTop + boxHeight;
            
            // Check if icon intersects with selection box
            if (iconLeft < boxRight && iconRight > boxLeft && 
                iconTop < boxBottom && iconBottom > boxTop) {
                this.selectIcon(icon);
            } else {
                this.deselectIcon(icon);
            }
        });
    }

    selectIcon(icon) {
        icon.classList.add('selected');
        this.selectedIcons.add(icon);
    }

    deselectIcon(icon) {
        icon.classList.remove('selected');
        this.selectedIcons.delete(icon);
    }

    toggleIconSelection(icon) {
        if (this.selectedIcons.has(icon)) {
            this.deselectIcon(icon);
        } else {
            this.selectIcon(icon);
        }
    }

    clearIconSelection() {
        this.selectedIcons.forEach(icon => {
            icon.classList.remove('selected');
        });
        this.selectedIcons.clear();
    }

    showContextMenu(x, y, type) {
        this.contextMenu.style.left = `${x}px`;
        this.contextMenu.style.top = `${y}px`;
        this.contextMenu.classList.remove('hidden');
        
        // Update context menu based on type
        this.updateContextMenuItems(type);
    }

    hideContextMenu() {
        this.contextMenu.classList.add('hidden');
    }

    updateContextMenuItems(type) {
        // You can customize the context menu based on type (desktop, icon, etc.)
        // For now, we'll keep the basic implementation
    }

    handleKeyboardShortcuts(e) {
        // Only handle shortcuts when no window has focus
        if (document.activeElement === document.body) {
            switch (e.key) {
                case 'Delete':
                    if (this.selectedIcons.size > 0) {
                        this.deleteSelectedIcons();
                    }
                    break;
                case 'F5':
                    e.preventDefault();
                    this.refreshDesktop();
                    break;
                case 'Escape':
                    this.clearIconSelection();
                    this.hideContextMenu();
                    break;
            }
            
            // Ctrl/Cmd shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'a':
                        e.preventDefault();
                        this.selectAllIcons();
                        break;
                }
            }
        }
    }

    selectAllIcons() {
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => this.selectIcon(icon));
    }

    deleteSelectedIcons() {
        // For now, just deselect. In a real implementation, 
        // this might remove custom icons or shortcuts
        this.clearIconSelection();
    }

    refreshDesktop() {
        // Refresh the desktop (could reload dynamic icons, etc.)
        console.log('Desktop refreshed');
    }

    // Clock functionality
    updateClock() {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            clockElement.textContent = timeString;
        }
    }

    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }
}

// Global functions for context menu actions
function createNewFolder() {
    console.log('Create new folder');
    // Implementation would create a new folder icon on desktop
}

function createNewFile() {
    console.log('Create new file');
    // Implementation would create a new file icon on desktop
}

function refreshDesktop() {
    window.desktop.refreshDesktop();
}

// Global function to open apps
function openApp(appName) {
    switch (appName) {
        case 'file-manager':
            const fileManager = new FileManagerApp();
            fileManager.open();
            break;
        case 'text-editor':
            const textEditor = new TextEditorApp();
            textEditor.open();
            break;
        case 'database':
            const database = new DatabaseApp();
            database.open();
            break;
        case 'webcam':
            const webcam = new WebcamApp();
            webcam.open();
            break;
        case 'terminal':
            const terminal = new TerminalApp();
            terminal.open();
            break;
        default:
            console.log(`Unknown app: ${appName}`);
    }
}

// Initialize desktop
window.desktop = new Desktop();