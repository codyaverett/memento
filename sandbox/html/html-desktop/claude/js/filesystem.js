class VirtualFileSystem {
    constructor() {
        this.dbName = 'VirtualFS';
        this.dbVersion = 1;
        this.db = null;
        this.currentPath = '/';
        
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                this.ensureRootStructure();
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('files')) {
                    const fileStore = db.createObjectStore('files', { keyPath: 'path' });
                    fileStore.createIndex('parent', 'parent', { unique: false });
                    fileStore.createIndex('name', 'name', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('metadata')) {
                    db.createObjectStore('metadata', { keyPath: 'key' });
                }
            };
        });
    }

    async ensureRootStructure() {
        const rootExists = await this.exists('/');
        if (!rootExists) {
            await this.createDirectory('/', 'root');
        }
        
        const defaultDirs = ['/home', '/photos', '/documents', '/downloads'];
        for (const dir of defaultDirs) {
            const exists = await this.exists(dir);
            if (!exists) {
                await this.createDirectory(dir, this.getFileName(dir));
            }
        }
    }

    async createFile(path, name, content = '', type = 'text/plain') {
        const fullPath = this.joinPath(path, name);
        
        const file = {
            path: fullPath,
            name: name,
            parent: path,
            type: type,
            content: content,
            size: new Blob([content]).size,
            created: new Date(),
            modified: new Date(),
            isDirectory: false
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readwrite');
            const store = transaction.objectStore('files');
            const request = store.put(file);
            
            request.onsuccess = () => resolve(file);
            request.onerror = () => reject(request.error);
        });
    }

    async createDirectory(path, name) {
        const fullPath = path === '/' ? `/${name}` : this.joinPath(path, name);
        
        const dir = {
            path: fullPath,
            name: name,
            parent: path,
            type: 'directory',
            content: null,
            size: 0,
            created: new Date(),
            modified: new Date(),
            isDirectory: true
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readwrite');
            const store = transaction.objectStore('files');
            const request = store.put(dir);
            
            request.onsuccess = () => resolve(dir);
            request.onerror = () => reject(request.error);
        });
    }

    async readFile(path) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readonly');
            const store = transaction.objectStore('files');
            const request = store.get(path);
            
            request.onsuccess = () => {
                const file = request.result;
                if (file && !file.isDirectory) {
                    resolve(file);
                } else {
                    reject(new Error('File not found or is a directory'));
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async writeFile(path, content, type = 'text/plain') {
        const file = await this.readFile(path).catch(() => null);
        
        if (file) {
            file.content = content;
            file.size = new Blob([content]).size;
            file.modified = new Date();
            file.type = type;
        } else {
            const parentPath = this.getParentPath(path);
            const fileName = this.getFileName(path);
            return this.createFile(parentPath, fileName, content, type);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readwrite');
            const store = transaction.objectStore('files');
            const request = store.put(file);
            
            request.onsuccess = () => resolve(file);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteFile(path) {
        const file = await this.getFileInfo(path);
        if (!file) throw new Error('File not found');
        
        if (file.isDirectory) {
            const children = await this.listDirectory(path);
            for (const child of children) {
                await this.deleteFile(child.path);
            }
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readwrite');
            const store = transaction.objectStore('files');
            const request = store.delete(path);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async listDirectory(path = this.currentPath) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readonly');
            const store = transaction.objectStore('files');
            const index = store.index('parent');
            const request = index.getAll(path);
            
            request.onsuccess = () => {
                const files = request.result.sort((a, b) => {
                    if (a.isDirectory && !b.isDirectory) return -1;
                    if (!a.isDirectory && b.isDirectory) return 1;
                    return a.name.localeCompare(b.name);
                });
                resolve(files);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getFileInfo(path) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readonly');
            const store = transaction.objectStore('files');
            const request = store.get(path);
            
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    async exists(path) {
        const file = await this.getFileInfo(path);
        return !!file;
    }

    async moveFile(fromPath, toPath) {
        const file = await this.getFileInfo(fromPath);
        if (!file) throw new Error('Source file not found');
        
        const newParent = this.getParentPath(toPath);
        const newName = this.getFileName(toPath);
        
        file.path = toPath;
        file.parent = newParent;
        file.name = newName;
        file.modified = new Date();
        
        if (file.isDirectory) {
            const children = await this.listDirectory(fromPath);
            for (const child of children) {
                const newChildPath = this.joinPath(toPath, child.name);
                await this.moveFile(child.path, newChildPath);
            }
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readwrite');
            const store = transaction.objectStore('files');
            
            store.delete(fromPath);
            const request = store.put(file);
            
            request.onsuccess = () => resolve(file);
            request.onerror = () => reject(request.error);
        });
    }

    async copyFile(fromPath, toPath) {
        const file = await this.getFileInfo(fromPath);
        if (!file) throw new Error('Source file not found');
        
        const newParent = this.getParentPath(toPath);
        const newName = this.getFileName(toPath);
        
        const newFile = {
            ...file,
            path: toPath,
            parent: newParent,
            name: newName,
            created: new Date(),
            modified: new Date()
        };
        
        if (file.isDirectory) {
            await this.createDirectory(newParent, newName);
            const children = await this.listDirectory(fromPath);
            for (const child of children) {
                const newChildPath = this.joinPath(toPath, child.name);
                await this.copyFile(child.path, newChildPath);
            }
        } else {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['files'], 'readwrite');
                const store = transaction.objectStore('files');
                const request = store.put(newFile);
                
                request.onsuccess = () => resolve(newFile);
                request.onerror = () => reject(request.error);
            });
        }
    }

    async exportToZip() {
        const zip = new JSZip();
        const allFiles = await this.getAllFiles();
        
        for (const file of allFiles) {
            if (!file.isDirectory && file.path !== '/') {
                const relativePath = file.path.startsWith('/') ? file.path.slice(1) : file.path;
                zip.file(relativePath, file.content);
            }
        }
        
        return zip.generateAsync({ type: 'blob' });
    }

    async importFromZip(zipFile) {
        const zip = await JSZip.loadAsync(zipFile);
        const importedFiles = [];
        
        for (const [path, zipEntry] of Object.entries(zip.files)) {
            if (!zipEntry.dir) {
                const content = await zipEntry.async('text');
                const fullPath = `/${path}`;
                const parentPath = this.getParentPath(fullPath);
                const fileName = this.getFileName(fullPath);
                
                await this.ensureDirectoryExists(parentPath);
                const file = await this.createFile(parentPath, fileName, content);
                importedFiles.push(file);
            }
        }
        
        return importedFiles;
    }

    async ensureDirectoryExists(path) {
        if (path === '/' || await this.exists(path)) return;
        
        const parentPath = this.getParentPath(path);
        await this.ensureDirectoryExists(parentPath);
        
        const dirName = this.getFileName(path);
        await this.createDirectory(parentPath, dirName);
    }

    async getAllFiles() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['files'], 'readonly');
            const store = transaction.objectStore('files');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async search(query, path = '/') {
        const allFiles = await this.getAllFiles();
        return allFiles.filter(file => {
            const matchesPath = file.path.startsWith(path);
            const matchesName = file.name.toLowerCase().includes(query.toLowerCase());
            const matchesContent = !file.isDirectory && 
                file.content && 
                file.content.toLowerCase().includes(query.toLowerCase());
            
            return matchesPath && (matchesName || matchesContent);
        });
    }

    joinPath(...parts) {
        const path = parts
            .filter(part => part && part !== '/')
            .join('/')
            .replace(/\/+/g, '/');
        
        return path.startsWith('/') ? path : `/${path}`;
    }

    getParentPath(path) {
        if (path === '/') return null;
        const parts = path.split('/').filter(p => p);
        parts.pop();
        return parts.length === 0 ? '/' : `/${parts.join('/')}`;
    }

    getFileName(path) {
        if (path === '/') return '';
        return path.split('/').pop();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getFileIcon(file) {
        if (file.isDirectory) return '📁';
        
        const ext = file.name.split('.').pop()?.toLowerCase();
        const icons = {
            'txt': '📄',
            'md': '📝',
            'js': '📜',
            'html': '🌐',
            'css': '🎨',
            'json': '📋',
            'png': '🖼️',
            'jpg': '🖼️',
            'jpeg': '🖼️',
            'gif': '🖼️',
            'mp3': '🎵',
            'mp4': '🎬',
            'pdf': '📕',
            'zip': '📦'
        };
        
        return icons[ext] || '📄';
    }
}

window.virtualFS = new VirtualFileSystem();