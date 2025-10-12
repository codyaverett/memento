class SimpleDatabase {
    constructor() {
        this.dbName = 'SimpleKVDB';
        this.dbVersion = 1;
        this.db = null;
        
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('keyvalue')) {
                    const store = db.createObjectStore('keyvalue', { keyPath: 'key' });
                    store.createIndex('type', 'type', { unique: false });
                    store.createIndex('created', 'created', { unique: false });
                }
            };
        });
    }

    async set(key, value, type = 'string') {
        const entry = {
            key: key,
            value: value,
            type: type,
            created: new Date(),
            modified: new Date()
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readwrite');
            const store = transaction.objectStore('keyvalue');
            const request = store.put(entry);
            
            request.onsuccess = () => resolve(entry);
            request.onerror = () => reject(request.error);
        });
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readonly');
            const store = transaction.objectStore('keyvalue');
            const request = store.get(key);
            
            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.value : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getEntry(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readonly');
            const store = transaction.objectStore('keyvalue');
            const request = store.get(key);
            
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readwrite');
            const store = transaction.objectStore('keyvalue');
            const request = store.delete(key);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async exists(key) {
        const entry = await this.getEntry(key);
        return !!entry;
    }

    async keys() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readonly');
            const store = transaction.objectStore('keyvalue');
            const request = store.getAllKeys();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async entries() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readonly');
            const store = transaction.objectStore('keyvalue');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async clear() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readwrite');
            const store = transaction.objectStore('keyvalue');
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async count() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['keyvalue'], 'readonly');
            const store = transaction.objectStore('keyvalue');
            const request = store.count();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async search(query) {
        const entries = await this.entries();
        return entries.filter(entry => {
            const keyMatch = entry.key.toLowerCase().includes(query.toLowerCase());
            const valueMatch = entry.value && 
                entry.value.toString().toLowerCase().includes(query.toLowerCase());
            return keyMatch || valueMatch;
        });
    }

    async backup() {
        const entries = await this.entries();
        const backup = {
            timestamp: new Date().toISOString(),
            entries: entries
        };
        return JSON.stringify(backup, null, 2);
    }

    async restore(backupData) {
        const backup = JSON.parse(backupData);
        await this.clear();
        
        for (const entry of backup.entries) {
            await this.set(entry.key, entry.value, entry.type);
        }
        
        return backup.entries.length;
    }

    formatValue(value, type) {
        switch (type) {
            case 'number':
                return Number(value);
            case 'boolean':
                return value === 'true' || value === true;
            case 'object':
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            case 'array':
                try {
                    return JSON.parse(value);
                } catch {
                    return [value];
                }
            default:
                return String(value);
        }
    }

    detectType(value) {
        if (typeof value === 'number') return 'number';
        if (typeof value === 'boolean') return 'boolean';
        if (Array.isArray(value)) return 'array';
        if (typeof value === 'object' && value !== null) return 'object';
        return 'string';
    }
}

window.simpleDB = new SimpleDatabase();