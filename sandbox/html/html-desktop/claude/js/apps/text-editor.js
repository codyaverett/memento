class TextEditorApp {
    constructor() {
        this.windowId = null;
        this.currentFile = null;
        this.isDirty = false;
        this.content = '';
    }

    async open(filePath = null) {
        this.windowId = windowManager.createWindow({
            title: 'Text Editor',
            width: 800,
            height: 600,
            content: this.createInterface()
        });

        this.setupEventListeners();
        
        if (filePath) {
            await this.loadFile(filePath);
        } else {
            this.updateTitle();
        }
    }

    createInterface() {
        return `
            <div class="text-editor">
                <div class="editor-toolbar">
                    <button id="editor-new" title="New">📄</button>
                    <button id="editor-open" title="Open">📂</button>
                    <button id="editor-save" title="Save">💾</button>
                    <button id="editor-save-as" title="Save As">💾+</button>
                    <div class="toolbar-separator"></div>
                    <button id="editor-undo" title="Undo">↶</button>
                    <button id="editor-redo" title="Redo">↷</button>
                    <div class="toolbar-separator"></div>
                    <button id="editor-find" title="Find">🔍</button>
                    <button id="editor-replace" title="Replace">🔄</button>
                    <div class="toolbar-separator"></div>
                    <select id="editor-font-size">
                        <option value="12">12px</option>
                        <option value="14" selected>14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                    </select>
                </div>
                
                <div class="editor-find-panel" id="editor-find-panel" style="display: none;">
                    <input type="text" id="find-input" placeholder="Find...">
                    <button id="find-prev">↑</button>
                    <button id="find-next">↓</button>
                    <button id="find-close">×</button>
                    <div class="replace-panel" style="display: none;">
                        <input type="text" id="replace-input" placeholder="Replace with...">
                        <button id="replace-current">Replace</button>
                        <button id="replace-all">Replace All</button>
                    </div>
                </div>
                
                <textarea id="editor-content" class="editor-content" placeholder="Start typing..."></textarea>
                
                <div class="editor-status">
                    <span id="editor-line-col">Line 1, Column 1</span>
                    <span id="editor-char-count">0 characters</span>
                    <span id="editor-file-info"></span>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const content = windowManager.getWindowContent(this.windowId);
        const textarea = content.querySelector('#editor-content');
        
        // Toolbar buttons
        content.querySelector('#editor-new').addEventListener('click', () => this.newFile());
        content.querySelector('#editor-open').addEventListener('click', () => this.openFileDialog());
        content.querySelector('#editor-save').addEventListener('click', () => this.saveFile());
        content.querySelector('#editor-save-as').addEventListener('click', () => this.saveAsDialog());
        content.querySelector('#editor-undo').addEventListener('click', () => document.execCommand('undo'));
        content.querySelector('#editor-redo').addEventListener('click', () => document.execCommand('redo'));
        content.querySelector('#editor-find').addEventListener('click', () => this.toggleFindPanel());
        content.querySelector('#editor-replace').addEventListener('click', () => this.toggleReplacePanel());
        
        // Font size
        content.querySelector('#editor-font-size').addEventListener('change', (e) => {
            textarea.style.fontSize = e.target.value + 'px';
        });
        
        // Text area events
        textarea.addEventListener('input', () => this.onContentChange());
        textarea.addEventListener('keydown', (e) => this.onKeyDown(e));
        textarea.addEventListener('selectionchange', () => this.updateCursorPosition());
        textarea.addEventListener('click', () => this.updateCursorPosition());
        textarea.addEventListener('keyup', () => this.updateCursorPosition());
        
        // Find/Replace panel
        this.setupFindReplace(content);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (windowManager.activeWindow === this.windowId) {
                this.handleKeyboardShortcuts(e);
            }
        });
    }

    setupFindReplace(content) {
        const findInput = content.querySelector('#find-input');
        const replaceInput = content.querySelector('#replace-input');
        const textarea = content.querySelector('#editor-content');
        
        content.querySelector('#find-prev').addEventListener('click', () => this.findPrevious());
        content.querySelector('#find-next').addEventListener('click', () => this.findNext());
        content.querySelector('#find-close').addEventListener('click', () => this.closeFindPanel());
        content.querySelector('#replace-current').addEventListener('click', () => this.replaceCurrent());
        content.querySelector('#replace-all').addEventListener('click', () => this.replaceAll());
        
        findInput.addEventListener('input', () => this.performFind());
        findInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.shiftKey ? this.findPrevious() : this.findNext();
            } else if (e.key === 'Escape') {
                this.closeFindPanel();
            }
        });
    }

    async loadFile(filePath) {
        try {
            const file = await virtualFS.readFile(filePath);
            this.currentFile = filePath;
            this.content = file.content;
            this.isDirty = false;
            
            const content = windowManager.getWindowContent(this.windowId);
            const textarea = content.querySelector('#editor-content');
            textarea.value = this.content;
            
            this.updateTitle();
            this.updateStatus();
        } catch (error) {
            alert(`Error loading file: ${error.message}`);
        }
    }

    async saveFile() {
        if (!this.currentFile) {
            return this.saveAsDialog();
        }
        
        try {
            await virtualFS.writeFile(this.currentFile, this.content);
            this.isDirty = false;
            this.updateTitle();
            this.showStatus('File saved');
        } catch (error) {
            alert(`Error saving file: ${error.message}`);
        }
    }

    async saveAsDialog() {
        const fileName = prompt('Enter file name:', this.currentFile ? virtualFS.getFileName(this.currentFile) : 'untitled.txt');
        if (!fileName) return;
        
        const filePath = virtualFS.joinPath('/documents', fileName);
        
        try {
            await virtualFS.writeFile(filePath, this.content);
            this.currentFile = filePath;
            this.isDirty = false;
            this.updateTitle();
            this.showStatus('File saved as ' + fileName);
        } catch (error) {
            alert(`Error saving file: ${error.message}`);
        }
    }

    async openFileDialog() {
        if (this.isDirty) {
            const save = confirm('Save current file before opening?');
            if (save) {
                await this.saveFile();
            }
        }
        
        // Simple file selector - in a real app, this would be a proper file dialog
        const fileName = prompt('Enter file path to open:');
        if (fileName) {
            await this.loadFile(fileName);
        }
    }

    newFile() {
        if (this.isDirty) {
            const save = confirm('Save current file before creating new?');
            if (save) {
                this.saveFile();
            }
        }
        
        this.currentFile = null;
        this.content = '';
        this.isDirty = false;
        
        const content = windowManager.getWindowContent(this.windowId);
        const textarea = content.querySelector('#editor-content');
        textarea.value = '';
        
        this.updateTitle();
        this.updateStatus();
    }

    onContentChange() {
        const content = windowManager.getWindowContent(this.windowId);
        const textarea = content.querySelector('#editor-content');
        
        this.content = textarea.value;
        this.isDirty = true;
        this.updateTitle();
        this.updateStatus();
    }

    onKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            
            this.onContentChange();
        }
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'n':
                    e.preventDefault();
                    this.newFile();
                    break;
                case 'o':
                    e.preventDefault();
                    this.openFileDialog();
                    break;
                case 's':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.saveAsDialog();
                    } else {
                        this.saveFile();
                    }
                    break;
                case 'f':
                    e.preventDefault();
                    this.toggleFindPanel();
                    break;
                case 'h':
                    e.preventDefault();
                    this.toggleReplacePanel();
                    break;
            }
        }
    }

    toggleFindPanel() {
        const content = windowManager.getWindowContent(this.windowId);
        const panel = content.querySelector('#editor-find-panel');
        const findInput = content.querySelector('#find-input');
        
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            findInput.focus();
        } else {
            this.closeFindPanel();
        }
    }

    toggleReplacePanel() {
        const content = windowManager.getWindowContent(this.windowId);
        const panel = content.querySelector('#editor-find-panel');
        const replacePanel = content.querySelector('.replace-panel');
        
        panel.style.display = 'block';
        replacePanel.style.display = 'block';
        content.querySelector('#find-input').focus();
    }

    closeFindPanel() {
        const content = windowManager.getWindowContent(this.windowId);
        const panel = content.querySelector('#editor-find-panel');
        const replacePanel = content.querySelector('.replace-panel');
        
        panel.style.display = 'none';
        replacePanel.style.display = 'none';
        content.querySelector('#editor-content').focus();
    }

    performFind() {
        const content = windowManager.getWindowContent(this.windowId);
        const findInput = content.querySelector('#find-input');
        const textarea = content.querySelector('#editor-content');
        
        if (findInput.value) {
            this.findNext();
        }
    }

    findNext() {
        const content = windowManager.getWindowContent(this.windowId);
        const findInput = content.querySelector('#find-input');
        const textarea = content.querySelector('#editor-content');
        
        if (!findInput.value) return;
        
        const searchText = findInput.value;
        const text = textarea.value;
        const currentPos = textarea.selectionEnd;
        
        const index = text.indexOf(searchText, currentPos);
        if (index !== -1) {
            textarea.setSelectionRange(index, index + searchText.length);
            textarea.focus();
        } else {
            // Wrap around to beginning
            const wrapIndex = text.indexOf(searchText, 0);
            if (wrapIndex !== -1) {
                textarea.setSelectionRange(wrapIndex, wrapIndex + searchText.length);
                textarea.focus();
            }
        }
    }

    findPrevious() {
        const content = windowManager.getWindowContent(this.windowId);
        const findInput = content.querySelector('#find-input');
        const textarea = content.querySelector('#editor-content');
        
        if (!findInput.value) return;
        
        const searchText = findInput.value;
        const text = textarea.value;
        const currentPos = textarea.selectionStart;
        
        const index = text.lastIndexOf(searchText, currentPos - 1);
        if (index !== -1) {
            textarea.setSelectionRange(index, index + searchText.length);
            textarea.focus();
        } else {
            // Wrap around to end
            const wrapIndex = text.lastIndexOf(searchText);
            if (wrapIndex !== -1) {
                textarea.setSelectionRange(wrapIndex, wrapIndex + searchText.length);
                textarea.focus();
            }
        }
    }

    replaceCurrent() {
        const content = windowManager.getWindowContent(this.windowId);
        const findInput = content.querySelector('#find-input');
        const replaceInput = content.querySelector('#replace-input');
        const textarea = content.querySelector('#editor-content');
        
        const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        if (selected === findInput.value) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + replaceInput.value + textarea.value.substring(end);
            textarea.setSelectionRange(start, start + replaceInput.value.length);
            this.onContentChange();
        }
        
        this.findNext();
    }

    replaceAll() {
        const content = windowManager.getWindowContent(this.windowId);
        const findInput = content.querySelector('#find-input');
        const replaceInput = content.querySelector('#replace-input');
        const textarea = content.querySelector('#editor-content');
        
        if (!findInput.value) return;
        
        const regex = new RegExp(findInput.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        textarea.value = textarea.value.replace(regex, replaceInput.value);
        this.onContentChange();
        
        this.showStatus(`Replaced all occurrences of "${findInput.value}"`);
    }

    updateCursorPosition() {
        const content = windowManager.getWindowContent(this.windowId);
        const textarea = content.querySelector('#editor-content');
        const lineColSpan = content.querySelector('#editor-line-col');
        
        const text = textarea.value.substring(0, textarea.selectionStart);
        const lines = text.split('\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;
        
        lineColSpan.textContent = `Line ${line}, Column ${col}`;
    }

    updateStatus() {
        const content = windowManager.getWindowContent(this.windowId);
        const charCountSpan = content.querySelector('#editor-char-count');
        const fileInfoSpan = content.querySelector('#editor-file-info');
        
        charCountSpan.textContent = `${this.content.length} characters`;
        fileInfoSpan.textContent = this.currentFile ? `File: ${virtualFS.getFileName(this.currentFile)}` : 'Untitled';
    }

    updateTitle() {
        const fileName = this.currentFile ? virtualFS.getFileName(this.currentFile) : 'Untitled';
        const title = `Text Editor - ${fileName}${this.isDirty ? ' *' : ''}`;
        windowManager.updateWindowTitle(this.windowId, title);
    }

    showStatus(message) {
        const content = windowManager.getWindowContent(this.windowId);
        const fileInfoSpan = content.querySelector('#editor-file-info');
        const originalText = fileInfoSpan.textContent;
        
        fileInfoSpan.textContent = message;
        setTimeout(() => {
            fileInfoSpan.textContent = originalText;
        }, 3000);
    }
}