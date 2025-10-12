class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.windowZIndex = 100;
        this.nextWindowId = 1;
        
        this.setupEventListeners();
    }

    createWindow(options = {}) {
        const windowId = `window-${this.nextWindowId++}`;
        
        const defaultOptions = {
            title: 'Untitled Window',
            x: Math.random() * (window.innerWidth - 400),
            y: Math.random() * (window.innerHeight - 300),
            width: 600,
            height: 400,
            resizable: true,
            minimizable: true,
            maximizable: true,
            closable: true,
            content: ''
        };
        
        const config = { ...defaultOptions, ...options };
        
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = windowId;
        windowEl.style.left = `${config.x}px`;
        windowEl.style.top = `${config.y}px`;
        windowEl.style.width = `${config.width}px`;
        windowEl.style.height = `${config.height}px`;
        windowEl.style.zIndex = this.windowZIndex++;
        
        windowEl.innerHTML = `
            <div class="window-header">
                <div class="window-title">${config.title}</div>
                <div class="window-controls">
                    ${config.minimizable ? '<button class="window-control minimize">−</button>' : ''}
                    ${config.maximizable ? '<button class="window-control maximize">□</button>' : ''}
                    ${config.closable ? '<button class="window-control close">×</button>' : ''}
                </div>
            </div>
            <div class="window-content">${config.content}</div>
            ${config.resizable ? `
                <div class="resize-handle e"></div>
                <div class="resize-handle s"></div>
                <div class="resize-handle se"></div>
            ` : ''}
        `;
        
        document.getElementById('desktop').appendChild(windowEl);
        
        const windowData = {
            id: windowId,
            element: windowEl,
            config: config,
            isMaximized: false,
            isMinimized: false,
            previousState: null
        };
        
        this.windows.set(windowId, windowData);
        this.setupWindowEvents(windowData);
        this.addToTaskbar(windowData);
        this.setActiveWindow(windowId);
        
        return windowId;
    }

    setupWindowEvents(windowData) {
        const { element, id } = windowData;
        const header = element.querySelector('.window-header');
        const controls = element.querySelector('.window-controls');
        
        element.addEventListener('mousedown', () => {
            this.setActiveWindow(id);
        });
        
        if (controls) {
            const minimizeBtn = controls.querySelector('.minimize');
            const maximizeBtn = controls.querySelector('.maximize');
            const closeBtn = controls.querySelector('.close');
            
            if (minimizeBtn) {
                minimizeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.minimizeWindow(id);
                });
            }
            
            if (maximizeBtn) {
                maximizeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleMaximize(id);
                });
            }
            
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeWindow(id);
                });
            }
        }
        
        this.setupDragging(windowData);
        this.setupResizing(windowData);
    }

    setupDragging(windowData) {
        const { element } = windowData;
        const header = element.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(element.style.left);
            startTop = parseInt(element.style.top);
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            
            e.preventDefault();
        });
        
        const onMouseMove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            element.style.left = `${startLeft + deltaX}px`;
            element.style.top = `${Math.max(0, startTop + deltaY)}px`;
        };
        
        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }

    setupResizing(windowData) {
        const { element, config } = windowData;
        if (!config.resizable) return;
        
        const resizeHandles = element.querySelectorAll('.resize-handle');
        
        resizeHandles.forEach(handle => {
            let isResizing = false;
            let startX, startY, startWidth, startHeight, startLeft, startTop;
            
            handle.addEventListener('mousedown', (e) => {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(window.getComputedStyle(element).width);
                startHeight = parseInt(window.getComputedStyle(element).height);
                startLeft = parseInt(element.style.left);
                startTop = parseInt(element.style.top);
                
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                
                e.preventDefault();
                e.stopPropagation();
            });
            
            const onMouseMove = (e) => {
                if (!isResizing) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                if (handle.classList.contains('se')) {
                    element.style.width = `${Math.max(300, startWidth + deltaX)}px`;
                    element.style.height = `${Math.max(200, startHeight + deltaY)}px`;
                } else if (handle.classList.contains('e')) {
                    element.style.width = `${Math.max(300, startWidth + deltaX)}px`;
                } else if (handle.classList.contains('s')) {
                    element.style.height = `${Math.max(200, startHeight + deltaY)}px`;
                }
            };
            
            const onMouseUp = () => {
                isResizing = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
        });
    }

    setActiveWindow(windowId) {
        if (this.activeWindow) {
            const prevWindow = this.windows.get(this.activeWindow);
            if (prevWindow) {
                prevWindow.element.style.zIndex = parseInt(prevWindow.element.style.zIndex) - 1;
            }
        }
        
        const window = this.windows.get(windowId);
        if (window) {
            window.element.style.zIndex = this.windowZIndex++;
            this.activeWindow = windowId;
            this.updateTaskbar();
        }
    }

    minimizeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (!window) return;
        
        window.element.style.display = 'none';
        window.isMinimized = true;
        this.updateTaskbar();
        
        if (this.activeWindow === windowId) {
            this.activeWindow = null;
            const visibleWindows = Array.from(this.windows.values())
                .filter(w => !w.isMinimized)
                .sort((a, b) => parseInt(b.element.style.zIndex) - parseInt(a.element.style.zIndex));
            
            if (visibleWindows.length > 0) {
                this.setActiveWindow(visibleWindows[0].id);
            }
        }
    }

    restoreWindow(windowId) {
        const window = this.windows.get(windowId);
        if (!window) return;
        
        window.element.style.display = 'block';
        window.isMinimized = false;
        this.setActiveWindow(windowId);
        this.updateTaskbar();
    }

    toggleMaximize(windowId) {
        const window = this.windows.get(windowId);
        if (!window) return;
        
        if (window.isMaximized) {
            if (window.previousState) {
                window.element.style.left = window.previousState.left;
                window.element.style.top = window.previousState.top;
                window.element.style.width = window.previousState.width;
                window.element.style.height = window.previousState.height;
            }
            window.element.classList.remove('maximized');
            window.isMaximized = false;
        } else {
            window.previousState = {
                left: window.element.style.left,
                top: window.element.style.top,
                width: window.element.style.width,
                height: window.element.style.height
            };
            window.element.classList.add('maximized');
            window.isMaximized = true;
        }
    }

    closeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (!window) return;
        
        window.element.remove();
        this.windows.delete(windowId);
        this.removeFromTaskbar(windowId);
        
        if (this.activeWindow === windowId) {
            this.activeWindow = null;
            const visibleWindows = Array.from(this.windows.values())
                .filter(w => !w.isMinimized)
                .sort((a, b) => parseInt(b.element.style.zIndex) - parseInt(a.element.style.zIndex));
            
            if (visibleWindows.length > 0) {
                this.setActiveWindow(visibleWindows[0].id);
            }
        }
    }

    addToTaskbar(windowData) {
        const taskbarItem = document.createElement('button');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.id = `taskbar-${windowData.id}`;
        taskbarItem.innerHTML = `
            <span>${windowData.config.title}</span>
        `;
        
        taskbarItem.addEventListener('click', () => {
            if (windowData.isMinimized) {
                this.restoreWindow(windowData.id);
            } else if (this.activeWindow === windowData.id) {
                this.minimizeWindow(windowData.id);
            } else {
                this.setActiveWindow(windowData.id);
            }
        });
        
        document.getElementById('open-windows').appendChild(taskbarItem);
    }

    removeFromTaskbar(windowId) {
        const taskbarItem = document.getElementById(`taskbar-${windowId}`);
        if (taskbarItem) {
            taskbarItem.remove();
        }
    }

    updateTaskbar() {
        this.windows.forEach((window, windowId) => {
            const taskbarItem = document.getElementById(`taskbar-${windowId}`);
            if (taskbarItem) {
                taskbarItem.classList.toggle('active', this.activeWindow === windowId && !window.isMinimized);
            }
        });
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Alt+Tab for window cycling
            if (e.altKey && e.key === 'Tab') {
                e.preventDefault();
                this.cycleWindows();
            }
            
            // Ctrl+W to close active window
            if (e.ctrlKey && e.key === 'w' && this.activeWindow) {
                e.preventDefault();
                this.closeWindow(this.activeWindow);
            }
            
            // Super/Win key combinations for window management
            if (e.metaKey || e.key === 'Meta') {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.tileWindowLeft();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.tileWindowRight();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.maximizeActiveWindow();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.minimizeActiveWindow();
                        break;
                    case 'Enter':
                        e.preventDefault();
                        this.toggleMaximizeActiveWindow();
                        break;
                }
            }
            
            // Ctrl+Shift combinations for advanced tiling
            if (e.ctrlKey && e.shiftKey) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.tileWindowQuarter('top-left');
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.tileWindowQuarter('top-right');
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.tileWindowHalf('top');
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.tileWindowHalf('bottom');
                        break;
                }
            }
            
            // F11 for fullscreen toggle
            if (e.key === 'F11' && this.activeWindow) {
                e.preventDefault();
                this.toggleMaximizeActiveWindow();
            }
        });
    }

    cycleWindows() {
        const visibleWindows = Array.from(this.windows.values())
            .filter(w => !w.isMinimized)
            .sort((a, b) => parseInt(b.element.style.zIndex) - parseInt(a.element.style.zIndex));
        
        if (visibleWindows.length <= 1) return;
        
        const currentIndex = visibleWindows.findIndex(w => w.id === this.activeWindow);
        const nextIndex = (currentIndex + 1) % visibleWindows.length;
        this.setActiveWindow(visibleWindows[nextIndex].id);
    }

    getWindowContent(windowId) {
        const window = this.windows.get(windowId);
        return window ? window.element.querySelector('.window-content') : null;
    }

    updateWindowTitle(windowId, title) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.querySelector('.window-title').textContent = title;
            window.config.title = title;
            
            const taskbarItem = document.getElementById(`taskbar-${windowId}`);
            if (taskbarItem) {
                taskbarItem.querySelector('span').textContent = title;
            }
        }
    }

    // Window Tiling Methods
    tileWindowLeft() {
        if (!this.activeWindow) return;
        this.tileWindow(this.activeWindow, {
            left: 0,
            top: 0,
            width: window.innerWidth / 2,
            height: window.innerHeight - 40 // Account for taskbar
        });
    }

    tileWindowRight() {
        if (!this.activeWindow) return;
        this.tileWindow(this.activeWindow, {
            left: window.innerWidth / 2,
            top: 0,
            width: window.innerWidth / 2,
            height: window.innerHeight - 40
        });
    }

    tileWindowHalf(position) {
        if (!this.activeWindow) return;
        
        let dimensions;
        switch (position) {
            case 'top':
                dimensions = {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: (window.innerHeight - 40) / 2
                };
                break;
            case 'bottom':
                dimensions = {
                    left: 0,
                    top: (window.innerHeight - 40) / 2,
                    width: window.innerWidth,
                    height: (window.innerHeight - 40) / 2
                };
                break;
        }
        
        if (dimensions) {
            this.tileWindow(this.activeWindow, dimensions);
        }
    }

    tileWindowQuarter(position) {
        if (!this.activeWindow) return;
        
        const halfWidth = window.innerWidth / 2;
        const halfHeight = (window.innerHeight - 40) / 2;
        
        let dimensions;
        switch (position) {
            case 'top-left':
                dimensions = { left: 0, top: 0, width: halfWidth, height: halfHeight };
                break;
            case 'top-right':
                dimensions = { left: halfWidth, top: 0, width: halfWidth, height: halfHeight };
                break;
            case 'bottom-left':
                dimensions = { left: 0, top: halfHeight, width: halfWidth, height: halfHeight };
                break;
            case 'bottom-right':
                dimensions = { left: halfWidth, top: halfHeight, width: halfWidth, height: halfHeight };
                break;
        }
        
        if (dimensions) {
            this.tileWindow(this.activeWindow, dimensions);
        }
    }

    tileWindow(windowId, dimensions) {
        const window = this.windows.get(windowId);
        if (!window) return;
        
        // Store current state before tiling
        if (!window.isMaximized && !window.tiledState) {
            window.previousState = {
                left: window.element.style.left,
                top: window.element.style.top,
                width: window.element.style.width,
                height: window.element.style.height
            };
        }
        
        // Apply tiling
        window.element.style.left = `${dimensions.left}px`;
        window.element.style.top = `${dimensions.top}px`;
        window.element.style.width = `${dimensions.width}px`;
        window.element.style.height = `${dimensions.height}px`;
        
        window.element.classList.remove('maximized');
        window.isMaximized = false;
        window.tiledState = dimensions;
    }

    maximizeActiveWindow() {
        if (this.activeWindow) {
            this.toggleMaximize(this.activeWindow);
        }
    }

    minimizeActiveWindow() {
        if (this.activeWindow) {
            this.minimizeWindow(this.activeWindow);
        }
    }

    toggleMaximizeActiveWindow() {
        if (this.activeWindow) {
            this.toggleMaximize(this.activeWindow);
        }
    }

    // Enhanced snap-to-edge functionality
    enableSnapToEdge() {
        this.snapThreshold = 20; // pixels
        this.isSnapping = false;
    }

    checkSnapToEdge(element, x, y) {
        if (this.isSnapping) return;
        
        const threshold = this.snapThreshold;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 40; // Account for taskbar
        
        // Left edge
        if (x <= threshold) {
            this.snapToEdge(element, 'left');
        }
        // Right edge
        else if (x >= screenWidth - threshold) {
            this.snapToEdge(element, 'right');
        }
        // Top edge (maximize)
        else if (y <= threshold) {
            this.snapToEdge(element, 'top');
        }
    }

    snapToEdge(element, edge) {
        this.isSnapping = true;
        
        const windowId = element.id;
        
        switch (edge) {
            case 'left':
                this.tileWindowLeft();
                break;
            case 'right':
                this.tileWindowRight();
                break;
            case 'top':
                this.toggleMaximize(windowId);
                break;
        }
        
        setTimeout(() => {
            this.isSnapping = false;
        }, 100);
    }

    // Auto-arrange windows
    arrangeWindows(layout = 'tile') {
        const visibleWindows = Array.from(this.windows.values())
            .filter(w => !w.isMinimized && !w.isMaximized);
        
        if (visibleWindows.length === 0) return;
        
        switch (layout) {
            case 'tile':
                this.arrangeWindowsTiled(visibleWindows);
                break;
            case 'cascade':
                this.arrangeWindowsCascade(visibleWindows);
                break;
            case 'vertical':
                this.arrangeWindowsVertical(visibleWindows);
                break;
            case 'horizontal':
                this.arrangeWindowsHorizontal(visibleWindows);
                break;
        }
    }

    arrangeWindowsTiled(windows) {
        const count = windows.length;
        const cols = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);
        
        const availableWidth = window.innerWidth;
        const availableHeight = window.innerHeight - 40;
        
        const windowWidth = availableWidth / cols;
        const windowHeight = availableHeight / rows;
        
        windows.forEach((win, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            win.element.style.left = `${col * windowWidth}px`;
            win.element.style.top = `${row * windowHeight}px`;
            win.element.style.width = `${windowWidth}px`;
            win.element.style.height = `${windowHeight}px`;
        });
    }

    arrangeWindowsCascade(windows) {
        const offset = 30;
        let x = 20;
        let y = 20;
        
        windows.forEach((win, index) => {
            win.element.style.left = `${x}px`;
            win.element.style.top = `${y}px`;
            win.element.style.width = '600px';
            win.element.style.height = '400px';
            
            x += offset;
            y += offset;
            
            // Reset position if off-screen
            if (x > window.innerWidth - 200 || y > window.innerHeight - 200) {
                x = 20;
                y = 20;
            }
        });
    }

    arrangeWindowsVertical(windows) {
        const windowHeight = (window.innerHeight - 40) / windows.length;
        
        windows.forEach((win, index) => {
            win.element.style.left = '0px';
            win.element.style.top = `${index * windowHeight}px`;
            win.element.style.width = `${window.innerWidth}px`;
            win.element.style.height = `${windowHeight}px`;
        });
    }

    arrangeWindowsHorizontal(windows) {
        const windowWidth = window.innerWidth / windows.length;
        
        windows.forEach((win, index) => {
            win.element.style.left = `${index * windowWidth}px`;
            win.element.style.top = '0px';
            win.element.style.width = `${windowWidth}px`;
            win.element.style.height = `${window.innerHeight - 40}px`;
        });
    }
}

window.windowManager = new WindowManager();