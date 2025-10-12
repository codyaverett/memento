class FileManagerApp {
    constructor() {
        this.windowId = null;
        this.currentPath = '/';
        this.selectedFiles = new Set();
        this.viewMode = 'list'; // 'list' or 'tree'
        this.clipboard = null;
        this.clipboardAction = null; // 'copy' or 'cut'
    }

    async open() {
        this.windowId = windowManager.createWindow({
            title: 'File Manager',
            width: 800,
            height: 600,
            content: this.createInterface()
        });

        this.setupEventListeners();
        await this.refreshView();
    }

    createInterface() {
        return `
            <div class="file-manager">
                <div class="fm-toolbar">
                    <button id="fm-back" title="Back">←</button>
                    <button id="fm-up" title="Up">↑</button>
                    <button id="fm-refresh" title="Refresh">⟳</button>
                    <div class="fm-path">
                        <input type="text" id="fm-path-input" value="${this.currentPath}">
                    </div>
                    <button id="fm-new-folder" title="New Folder">📁+</button>
                    <button id="fm-new-file" title="New File">📄+</button>
                    <button id="fm-export-zip" title="Export as ZIP">📦↗</button>
                    <button id="fm-import-zip" title="Import ZIP">📦↙</button>
                    <button id="fm-toggle-view" title="Toggle View">${this.viewMode === 'list' ? '🌲' : '📋'}</button>
                </div>
                
                <div class="fm-actions" style="display: none;">
                    <button id="fm-copy">Copy</button>
                    <button id="fm-cut">Cut</button>
                    <button id="fm-paste" disabled>Paste</button>
                    <button id="fm-delete">Delete</button>
                    <button id="fm-rename">Rename</button>
                </div>
                
                <div class="fm-content">
                    <div id="fm-file-list" class="fm-file-list"></div>
                </div>
                
                <div class="fm-status">
                    <span id="fm-item-count">0 items</span>
                    <span id="fm-selected-count"></span>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const content = windowManager.getWindowContent(this.windowId);
        
        // Toolbar buttons
        content.querySelector('#fm-back').addEventListener('click', () => this.goBack());
        content.querySelector('#fm-up').addEventListener('click', () => this.goUp());
        content.querySelector('#fm-refresh').addEventListener('click', () => this.refreshView());
        content.querySelector('#fm-new-folder').addEventListener('click', () => this.createNewFolder());
        content.querySelector('#fm-new-file').addEventListener('click', () => this.createNewFile());
        content.querySelector('#fm-export-zip').addEventListener('click', () => this.exportAsZip());
        content.querySelector('#fm-import-zip').addEventListener('click', () => this.importZip());
        content.querySelector('#fm-toggle-view').addEventListener('click', () => this.toggleView());
        
        // Path input
        const pathInput = content.querySelector('#fm-path-input');
        pathInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigateTo(pathInput.value);
            }
        });
        
        // Action buttons
        content.querySelector('#fm-copy').addEventListener('click', () => this.copySelected());
        content.querySelector('#fm-cut').addEventListener('click', () => this.cutSelected());
        content.querySelector('#fm-paste').addEventListener('click', () => this.pasteClipboard());
        content.querySelector('#fm-delete').addEventListener('click', () => this.deleteSelected());
        content.querySelector('#fm-rename').addEventListener('click', () => this.renameSelected());
        
        // File list events
        const fileList = content.querySelector('#fm-file-list');
        fileList.addEventListener('click', (e) => this.handleFileClick(e));
        fileList.addEventListener('dblclick', (e) => this.handleFileDoubleClick(e));
        fileList.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
    }

    async refreshView() {
        const content = windowManager.getWindowContent(this.windowId);
        const fileList = content.querySelector('#fm-file-list');
        const pathInput = content.querySelector('#fm-path-input');
        
        pathInput.value = this.currentPath;
        this.selectedFiles.clear();
        
        try {
            const files = await virtualFS.listDirectory(this.currentPath);
            
            if (this.viewMode === 'list') {
                this.renderListView(files, fileList);
            } else {
                this.renderTreeView(files, fileList);
            }
            
            this.updateStatus(files.length);
            this.updateActionButtons();
        } catch (error) {
            fileList.innerHTML = `<div class="error">Error loading directory: ${error.message}</div>`;
        }
    }

    renderListView(files, container) {
        const html = files.map(file => `
            <div class="file-item" data-path="${file.path}" data-is-dir="${file.isDirectory}">
                <div class="file-icon">${virtualFS.getFileIcon(file)}</div>
                <div class="file-name">${file.name}</div>
                <div class="file-size">${file.isDirectory ? '' : virtualFS.formatFileSize(file.size)}</div>
                <div class="file-modified">${file.modified.toLocaleDateString()}</div>
            </div>
        `).join('');
        
        container.innerHTML = html;
        container.className = 'fm-file-list list-view';
    }

    renderTreeView(files, container) {
        const html = this.buildTreeHTML(files, this.currentPath);
        container.innerHTML = html;
        container.className = 'fm-file-list tree-view';
    }

    buildTreeHTML(files, basePath, level = 0) {
        return files.map(file => {
            const indent = '  '.repeat(level);
            const expandable = file.isDirectory ? 'expandable' : '';
            
            return `
                <div class="tree-item ${expandable}" data-path="${file.path}" data-is-dir="${file.isDirectory}" style="padding-left: ${level * 20}px">
                    ${file.isDirectory ? '<span class="tree-toggle">▶</span>' : '<span class="tree-spacer"></span>'}
                    <span class="file-icon">${virtualFS.getFileIcon(file)}</span>
                    <span class="file-name">${file.name}</span>
                </div>
            `;
        }).join('');
    }

    handleFileClick(e) {
        const fileItem = e.target.closest('.file-item, .tree-item');
        if (!fileItem) return;
        
        const path = fileItem.dataset.path;
        
        if (e.ctrlKey || e.metaKey) {
            // Multi-select
            if (this.selectedFiles.has(path)) {
                this.selectedFiles.delete(path);
                fileItem.classList.remove('selected');
            } else {
                this.selectedFiles.add(path);
                fileItem.classList.add('selected');
            }
        } else {
            // Single select
            this.clearSelection();
            this.selectedFiles.add(path);
            fileItem.classList.add('selected');
        }
        
        this.updateActionButtons();
    }

    handleFileDoubleClick(e) {
        const fileItem = e.target.closest('.file-item, .tree-item');
        if (!fileItem) return;
        
        const path = fileItem.dataset.path;
        const isDirectory = fileItem.dataset.isDir === 'true';
        
        if (isDirectory) {
            this.navigateTo(path);
        } else {
            this.openFile(path);
        }
    }

    handleContextMenu(e) {
        e.preventDefault();
        const fileItem = e.target.closest('.file-item, .tree-item');
        
        if (fileItem) {
            const path = fileItem.dataset.path;
            if (!this.selectedFiles.has(path)) {
                this.clearSelection();
                this.selectedFiles.add(path);
                fileItem.classList.add('selected');
            }
        }
        
        this.showContextMenu(e.pageX, e.pageY, !!fileItem);
    }

    showContextMenu(x, y, hasSelection) {
        const content = windowManager.getWindowContent(this.windowId);
        const actionsDiv = content.querySelector('.fm-actions');
        actionsDiv.style.display = 'block';
        actionsDiv.style.position = 'absolute';
        actionsDiv.style.left = `${x}px`;
        actionsDiv.style.top = `${y}px`;
        actionsDiv.style.zIndex = '1000';
        
        // Hide after 3 seconds
        setTimeout(() => {
            actionsDiv.style.display = 'none';
        }, 3000);
    }

    clearSelection() {
        const content = windowManager.getWindowContent(this.windowId);
        const selected = content.querySelectorAll('.file-item.selected, .tree-item.selected');
        selected.forEach(item => item.classList.remove('selected'));
        this.selectedFiles.clear();
    }

    async navigateTo(path) {
        try {
            const exists = await virtualFS.exists(path);
            if (exists) {
                this.currentPath = path;
                await this.refreshView();
            } else {
                alert('Directory not found');
            }
        } catch (error) {
            alert(`Error navigating to ${path}: ${error.message}`);
        }
    }

    goBack() {
        // Simple implementation - could be enhanced with history
        this.goUp();
    }

    goUp() {
        if (this.currentPath !== '/') {
            const parentPath = virtualFS.getParentPath(this.currentPath);
            this.navigateTo(parentPath || '/');
        }
    }

    toggleView() {
        this.viewMode = this.viewMode === 'list' ? 'tree' : 'list';
        const content = windowManager.getWindowContent(this.windowId);
        const toggleBtn = content.querySelector('#fm-toggle-view');
        toggleBtn.textContent = this.viewMode === 'list' ? '🌲' : '📋';
        this.refreshView();
    }

    async createNewFolder() {
        const name = prompt('Enter folder name:');
        if (name) {
            try {
                await virtualFS.createDirectory(this.currentPath, name);
                await this.refreshView();
            } catch (error) {
                alert(`Error creating folder: ${error.message}`);
            }
        }
    }

    async createNewFile() {
        const name = prompt('Enter file name:');
        if (name) {
            try {
                await virtualFS.createFile(this.currentPath, name, '');
                await this.refreshView();
            } catch (error) {
                alert(`Error creating file: ${error.message}`);
            }
        }
    }

    async openFile(path) {
        try {
            const file = await virtualFS.readFile(path);
            
            if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
                // Open in text editor
                const textEditor = new TextEditorApp();
                await textEditor.open(path);
            } else if (file.type.startsWith('image/')) {
                // Open image viewer (simple implementation)
                this.showImageViewer(file);
            } else {
                alert('Cannot open this file type');
            }
        } catch (error) {
            alert(`Error opening file: ${error.message}`);
        }
    }

    showImageViewer(file) {
        const blob = new Blob([file.content], { type: file.type });
        const url = URL.createObjectURL(blob);
        
        windowManager.createWindow({
            title: `Image Viewer - ${file.name}`,
            width: 600,
            height: 500,
            content: `<img src="${url}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`
        });
    }

    copySelected() {
        if (this.selectedFiles.size > 0) {
            this.clipboard = Array.from(this.selectedFiles);
            this.clipboardAction = 'copy';
            this.updateActionButtons();
        }
    }

    cutSelected() {
        if (this.selectedFiles.size > 0) {
            this.clipboard = Array.from(this.selectedFiles);
            this.clipboardAction = 'cut';
            this.updateActionButtons();
        }
    }

    async pasteClipboard() {
        if (!this.clipboard || this.clipboard.length === 0) return;
        
        try {
            for (const srcPath of this.clipboard) {
                const fileName = virtualFS.getFileName(srcPath);
                const destPath = virtualFS.joinPath(this.currentPath, fileName);
                
                if (this.clipboardAction === 'copy') {
                    await virtualFS.copyFile(srcPath, destPath);
                } else if (this.clipboardAction === 'cut') {
                    await virtualFS.moveFile(srcPath, destPath);
                }
            }
            
            if (this.clipboardAction === 'cut') {
                this.clipboard = null;
                this.clipboardAction = null;
            }
            
            await this.refreshView();
            this.updateActionButtons();
        } catch (error) {
            alert(`Error pasting: ${error.message}`);
        }
    }

    async deleteSelected() {
        if (this.selectedFiles.size === 0) return;
        
        const confirmed = confirm(`Delete ${this.selectedFiles.size} item(s)?`);
        if (!confirmed) return;
        
        try {
            for (const path of this.selectedFiles) {
                await virtualFS.deleteFile(path);
            }
            
            this.selectedFiles.clear();
            await this.refreshView();
            this.updateActionButtons();
        } catch (error) {
            alert(`Error deleting: ${error.message}`);
        }
    }

    async renameSelected() {
        if (this.selectedFiles.size !== 1) {
            alert('Select exactly one item to rename');
            return;
        }
        
        const oldPath = Array.from(this.selectedFiles)[0];
        const oldName = virtualFS.getFileName(oldPath);
        const newName = prompt('Enter new name:', oldName);
        
        if (newName && newName !== oldName) {
            try {
                const newPath = virtualFS.joinPath(virtualFS.getParentPath(oldPath), newName);
                await virtualFS.moveFile(oldPath, newPath);
                
                this.selectedFiles.clear();
                await this.refreshView();
                this.updateActionButtons();
            } catch (error) {
                alert(`Error renaming: ${error.message}`);
            }
        }
    }

    updateStatus(itemCount) {
        const content = windowManager.getWindowContent(this.windowId);
        const itemCountEl = content.querySelector('#fm-item-count');
        const selectedCountEl = content.querySelector('#fm-selected-count');
        
        itemCountEl.textContent = `${itemCount} items`;
        selectedCountEl.textContent = this.selectedFiles.size > 0 ? `${this.selectedFiles.size} selected` : '';
    }

    updateActionButtons() {
        const content = windowManager.getWindowContent(this.windowId);
        const hasSelection = this.selectedFiles.size > 0;
        const hasClipboard = this.clipboard && this.clipboard.length > 0;
        
        content.querySelector('#fm-copy').disabled = !hasSelection;
        content.querySelector('#fm-cut').disabled = !hasSelection;
        content.querySelector('#fm-paste').disabled = !hasClipboard;
        content.querySelector('#fm-delete').disabled = !hasSelection;
        content.querySelector('#fm-rename').disabled = this.selectedFiles.size !== 1;
    }

    async exportAsZip() {
        try {
            this.showMessage('Preparing export...');
            
            const zipBlob = await virtualFS.exportToZip();
            const url = URL.createObjectURL(zipBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `filesystem-export-${new Date().toISOString().slice(0, 10)}.zip`;
            a.click();
            
            URL.revokeObjectURL(url);
            this.showMessage('Filesystem exported successfully!');
        } catch (error) {
            this.showMessage(`Export failed: ${error.message}`, 'error');
        }
    }

    async importZip() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.zip';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                this.showMessage('Importing ZIP file...');
                
                const importedFiles = await virtualFS.importFromZip(file);
                
                this.showMessage(`Successfully imported ${importedFiles.length} files!`);
                await this.refreshView();
            } catch (error) {
                this.showMessage(`Import failed: ${error.message}`, 'error');
            }
        };
        
        input.click();
    }

    showMessage(message, type = 'info') {
        const content = windowManager.getWindowContent(this.windowId);
        const selectedCountEl = content.querySelector('#fm-selected-count');
        
        selectedCountEl.textContent = message;
        selectedCountEl.className = type;
        
        setTimeout(() => {
            selectedCountEl.textContent = this.selectedFiles.size > 0 ? `${this.selectedFiles.size} selected` : '';
            selectedCountEl.className = '';
        }, 3000);
    }
}