class DatabaseApp {
    constructor() {
        this.windowId = null;
        this.currentView = 'list'; // 'list' or 'add' or 'edit'
        this.editingKey = null;
    }

    async open() {
        this.windowId = windowManager.createWindow({
            title: 'Simple Database',
            width: 700,
            height: 500,
            content: this.createInterface()
        });

        this.setupEventListeners();
        await this.refreshData();
    }

    createInterface() {
        return `
            <div class="database-app">
                <div class="db-toolbar">
                    <button id="db-add" title="Add Entry">➕ Add</button>
                    <button id="db-refresh" title="Refresh">🔄 Refresh</button>
                    <button id="db-search" title="Search">🔍 Search</button>
                    <button id="db-clear" title="Clear All">🗑️ Clear All</button>
                    <button id="db-export" title="Export">📤 Export</button>
                    <button id="db-import" title="Import">📥 Import</button>
                </div>
                
                <div id="db-search-panel" class="db-search-panel" style="display: none;">
                    <input type="text" id="db-search-input" placeholder="Search keys and values...">
                    <button id="db-search-close">×</button>
                </div>
                
                <div id="db-content" class="db-content">
                    ${this.createListView()}
                </div>
                
                <div class="db-status">
                    <span id="db-entry-count">0 entries</span>
                    <span id="db-status-message"></span>
                </div>
            </div>
        `;
    }

    createListView() {
        return `
            <div class="db-list-view">
                <table class="database-table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Type</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="db-table-body">
                        <tr>
                            <td colspan="5" class="loading">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    createAddEditView(entry = null) {
        const isEdit = !!entry;
        const title = isEdit ? 'Edit Entry' : 'Add New Entry';
        
        return `
            <div class="db-form-view">
                <h3>${title}</h3>
                <form id="db-entry-form">
                    <div class="form-group">
                        <label for="entry-key">Key:</label>
                        <input type="text" id="entry-key" value="${entry ? entry.key : ''}" ${isEdit ? 'readonly' : ''} required>
                    </div>
                    
                    <div class="form-group">
                        <label for="entry-type">Type:</label>
                        <select id="entry-type">
                            <option value="string" ${entry && entry.type === 'string' ? 'selected' : ''}>String</option>
                            <option value="number" ${entry && entry.type === 'number' ? 'selected' : ''}>Number</option>
                            <option value="boolean" ${entry && entry.type === 'boolean' ? 'selected' : ''}>Boolean</option>
                            <option value="object" ${entry && entry.type === 'object' ? 'selected' : ''}>Object (JSON)</option>
                            <option value="array" ${entry && entry.type === 'array' ? 'selected' : ''}>Array (JSON)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="entry-value">Value:</label>
                        <textarea id="entry-value" rows="6" required>${entry ? this.formatValueForEdit(entry.value, entry.type) : ''}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <button type="submit">${isEdit ? 'Update' : 'Add'}</button>
                        <button type="button" id="form-cancel">Cancel</button>
                        ${isEdit ? '<button type="button" id="form-delete" class="delete-btn">Delete</button>' : ''}
                    </div>
                </form>
            </div>
        `;
    }

    setupEventListeners() {
        const content = windowManager.getWindowContent(this.windowId);
        
        // Toolbar buttons
        content.querySelector('#db-add').addEventListener('click', () => this.showAddForm());
        content.querySelector('#db-refresh').addEventListener('click', () => this.refreshData());
        content.querySelector('#db-search').addEventListener('click', () => this.toggleSearch());
        content.querySelector('#db-clear').addEventListener('click', () => this.clearAll());
        content.querySelector('#db-export').addEventListener('click', () => this.exportData());
        content.querySelector('#db-import').addEventListener('click', () => this.importData());
        
        // Search panel
        this.setupSearchPanel(content);
    }

    setupSearchPanel(content) {
        const searchInput = content.querySelector('#db-search-input');
        const searchClose = content.querySelector('#db-search-close');
        
        searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
        searchClose.addEventListener('click', () => this.toggleSearch());
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.toggleSearch();
            }
        });
    }

    setupFormEventListeners() {
        const content = windowManager.getWindowContent(this.windowId);
        const form = content.querySelector('#db-entry-form');
        
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            const cancelBtn = content.querySelector('#form-cancel');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => this.showListView());
            }
            
            const deleteBtn = content.querySelector('#form-delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.deleteEntry(this.editingKey));
            }
        }
    }

    async refreshData() {
        try {
            const entries = await simpleDB.entries();
            this.renderEntries(entries);
            this.updateStatus(entries.length);
        } catch (error) {
            this.showMessage(`Error loading data: ${error.message}`, 'error');
        }
    }

    renderEntries(entries) {
        const content = windowManager.getWindowContent(this.windowId);
        const tbody = content.querySelector('#db-table-body');
        
        if (entries.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty">No entries found</td></tr>';
            return;
        }
        
        tbody.innerHTML = entries.map(entry => `
            <tr>
                <td class="key-cell">${this.escapeHtml(entry.key)}</td>
                <td class="value-cell">${this.formatValue(entry.value, entry.type)}</td>
                <td class="type-cell">${entry.type}</td>
                <td class="date-cell">${entry.created.toLocaleDateString()}</td>
                <td class="actions-cell">
                    <button onclick="window.dbApp.editEntry('${entry.key}')" title="Edit">✏️</button>
                    <button onclick="window.dbApp.deleteEntry('${entry.key}')" title="Delete">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    async performSearch(query) {
        if (!query.trim()) {
            await this.refreshData();
            return;
        }
        
        try {
            const results = await simpleDB.search(query);
            this.renderEntries(results);
            this.updateStatus(results.length, `Found ${results.length} results for "${query}"`);
        } catch (error) {
            this.showMessage(`Search error: ${error.message}`, 'error');
        }
    }

    toggleSearch() {
        const content = windowManager.getWindowContent(this.windowId);
        const panel = content.querySelector('#db-search-panel');
        const input = content.querySelector('#db-search-input');
        
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            input.focus();
        } else {
            panel.style.display = 'none';
            input.value = '';
            this.refreshData();
        }
    }

    showAddForm() {
        this.currentView = 'add';
        this.editingKey = null;
        
        const content = windowManager.getWindowContent(this.windowId);
        content.querySelector('#db-content').innerHTML = this.createAddEditView();
        this.setupFormEventListeners();
    }

    async editEntry(key) {
        try {
            const entry = await simpleDB.getEntry(key);
            if (!entry) {
                this.showMessage('Entry not found', 'error');
                return;
            }
            
            this.currentView = 'edit';
            this.editingKey = key;
            
            const content = windowManager.getWindowContent(this.windowId);
            content.querySelector('#db-content').innerHTML = this.createAddEditView(entry);
            this.setupFormEventListeners();
        } catch (error) {
            this.showMessage(`Error loading entry: ${error.message}`, 'error');
        }
    }

    async deleteEntry(key) {
        const confirmed = confirm(`Delete entry "${key}"?`);
        if (!confirmed) return;
        
        try {
            await simpleDB.delete(key);
            this.showMessage('Entry deleted successfully');
            
            if (this.currentView === 'edit' && this.editingKey === key) {
                this.showListView();
            } else {
                await this.refreshData();
            }
        } catch (error) {
            this.showMessage(`Error deleting entry: ${error.message}`, 'error');
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const content = windowManager.getWindowContent(this.windowId);
        const key = content.querySelector('#entry-key').value.trim();
        const type = content.querySelector('#entry-type').value;
        const valueText = content.querySelector('#entry-value').value;
        
        if (!key || !valueText) {
            this.showMessage('Key and value are required', 'error');
            return;
        }
        
        try {
            const value = simpleDB.formatValue(valueText, type);
            await simpleDB.set(key, value, type);
            
            this.showMessage(`Entry ${this.currentView === 'edit' ? 'updated' : 'added'} successfully`);
            this.showListView();
        } catch (error) {
            this.showMessage(`Error saving entry: ${error.message}`, 'error');
        }
    }

    showListView() {
        this.currentView = 'list';
        this.editingKey = null;
        
        const content = windowManager.getWindowContent(this.windowId);
        content.querySelector('#db-content').innerHTML = this.createListView();
        this.refreshData();
    }

    async clearAll() {
        const confirmed = confirm('Delete all entries? This cannot be undone.');
        if (!confirmed) return;
        
        try {
            await simpleDB.clear();
            this.showMessage('All entries deleted');
            await this.refreshData();
        } catch (error) {
            this.showMessage(`Error clearing database: ${error.message}`, 'error');
        }
    }

    async exportData() {
        try {
            const backup = await simpleDB.backup();
            const blob = new Blob([backup], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `database-backup-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            
            URL.revokeObjectURL(url);
            this.showMessage('Database exported successfully');
        } catch (error) {
            this.showMessage(`Export error: ${error.message}`, 'error');
        }
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                const text = await file.text();
                const entriesRestored = await simpleDB.restore(text);
                
                this.showMessage(`Imported ${entriesRestored} entries successfully`);
                await this.refreshData();
            } catch (error) {
                this.showMessage(`Import error: ${error.message}`, 'error');
            }
        };
        
        input.click();
    }

    formatValue(value, type) {
        if (value === null || value === undefined) return '<null>';
        
        switch (type) {
            case 'object':
            case 'array':
                try {
                    return `<pre>${JSON.stringify(value, null, 2)}</pre>`;
                } catch {
                    return String(value);
                }
            case 'boolean':
                return value ? 'true' : 'false';
            case 'string':
                return this.escapeHtml(String(value));
            default:
                return this.escapeHtml(String(value));
        }
    }

    formatValueForEdit(value, type) {
        if (value === null || value === undefined) return '';
        
        switch (type) {
            case 'object':
            case 'array':
                try {
                    return JSON.stringify(value, null, 2);
                } catch {
                    return String(value);
                }
            default:
                return String(value);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStatus(count, message = '') {
        const content = windowManager.getWindowContent(this.windowId);
        const countEl = content.querySelector('#db-entry-count');
        const messageEl = content.querySelector('#db-status-message');
        
        countEl.textContent = `${count} entries`;
        messageEl.textContent = message;
    }

    showMessage(message, type = 'info') {
        const content = windowManager.getWindowContent(this.windowId);
        const messageEl = content.querySelector('#db-status-message');
        
        messageEl.textContent = message;
        messageEl.className = type;
        
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = '';
        }, 3000);
    }
}

// Global reference for onclick handlers
window.dbApp = null;

// Override the original open function to set global reference
const originalOpen = DatabaseApp.prototype.open;
DatabaseApp.prototype.open = async function() {
    window.dbApp = this;
    return originalOpen.call(this);
};