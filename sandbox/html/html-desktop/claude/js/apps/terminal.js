class TerminalApp {
    constructor() {
        this.windowId = null;
        this.currentPath = '/';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.environment = {
            USER: 'user',
            HOME: '/home',
            PATH: '/bin:/usr/bin',
            PWD: '/'
        };
    }

    async open() {
        this.windowId = windowManager.createWindow({
            title: 'Terminal',
            width: 700,
            height: 500,
            content: this.createInterface()
        });

        this.setupEventListeners();
        this.printWelcome();
        this.showPrompt();
    }

    createInterface() {
        return `
            <div class="terminal-app">
                <div class="terminal" id="terminal-output">
                    <div class="terminal-line">Web Terminal v1.0</div>
                    <div class="terminal-line">Type 'help' for available commands.</div>
                    <div class="terminal-line"></div>
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt" id="terminal-prompt">user@webdesktop:~$ </span>
                    <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" spellcheck="false">
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const content = windowManager.getWindowContent(this.windowId);
        const input = content.querySelector('#terminal-input');
        
        input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        input.focus();
        
        // Keep input focused when clicking on terminal
        content.addEventListener('click', () => {
            input.focus();
        });
    }

    handleKeyDown(e) {
        const input = e.target;
        
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand(input.value.trim());
                input.value = '';
                this.historyIndex = -1;
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
                
            case 'Tab':
                e.preventDefault();
                this.handleTabCompletion(input);
                break;
                
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.printLine('^C');
                    this.showPrompt();
                }
                break;
                
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.clearTerminal();
                }
                break;
        }
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        const content = windowManager.getWindowContent(this.windowId);
        const input = content.querySelector('#terminal-input');
        
        if (direction === -1) {
            // Up arrow
            if (this.historyIndex === -1) {
                this.historyIndex = this.commandHistory.length - 1;
            } else if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else {
            // Down arrow
            if (this.historyIndex !== -1) {
                this.historyIndex++;
                if (this.historyIndex >= this.commandHistory.length) {
                    this.historyIndex = -1;
                }
            }
        }
        
        input.value = this.historyIndex === -1 ? '' : this.commandHistory[this.historyIndex];
    }

    async handleTabCompletion(input) {
        const value = input.value;
        const lastWord = value.split(' ').pop();
        
        if (lastWord.includes('/')) {
            // Path completion
            const pathPart = lastWord.substring(0, lastWord.lastIndexOf('/') + 1);
            const namePart = lastWord.substring(lastWord.lastIndexOf('/') + 1);
            
            try {
                const fullPath = this.resolvePath(pathPart || '.');
                const files = await virtualFS.listDirectory(fullPath);
                const matches = files
                    .filter(f => f.name.startsWith(namePart))
                    .map(f => pathPart + f.name + (f.isDirectory ? '/' : ''));
                
                if (matches.length === 1) {
                    const newValue = value.substring(0, value.lastIndexOf(lastWord)) + matches[0];
                    input.value = newValue;
                } else if (matches.length > 1) {
                    this.printLine(matches.join('  '));
                    this.showPrompt();
                }
            } catch (error) {
                // Ignore completion errors
            }
        } else {
            // Command completion
            const commands = Object.keys(this.getCommands());
            const matches = commands.filter(cmd => cmd.startsWith(lastWord));
            
            if (matches.length === 1) {
                const newValue = value.substring(0, value.lastIndexOf(lastWord)) + matches[0];
                input.value = newValue;
            } else if (matches.length > 1) {
                this.printLine(matches.join('  '));
                this.showPrompt();
            }
        }
    }

    async executeCommand(commandLine) {
        if (!commandLine) {
            this.showPrompt();
            return;
        }
        
        // Add to history
        this.commandHistory.push(commandLine);
        if (this.commandHistory.length > 100) {
            this.commandHistory.shift();
        }
        
        // Echo command
        this.printLine(`${this.getPromptText()}${commandLine}`);
        
        // Parse command
        const parts = this.parseCommand(commandLine);
        const command = parts[0];
        const args = parts.slice(1);
        
        try {
            await this.runCommand(command, args);
        } catch (error) {
            this.printLine(`Error: ${error.message}`);
        }
        
        this.showPrompt();
    }

    parseCommand(commandLine) {
        // Simple command parsing - doesn't handle quotes or complex cases
        return commandLine.trim().split(/\s+/);
    }

    async runCommand(command, args) {
        const commands = this.getCommands();
        
        if (commands[command]) {
            await commands[command].call(this, args);
        } else {
            this.printLine(`Command not found: ${command}`);
            this.printLine(`Type 'help' for available commands.`);
        }
    }

    getCommands() {
        return {
            help: this.cmdHelp,
            ls: this.cmdLs,
            cd: this.cmdCd,
            pwd: this.cmdPwd,
            mkdir: this.cmdMkdir,
            rmdir: this.cmdRmdir,
            rm: this.cmdRm,
            cat: this.cmdCat,
            echo: this.cmdEcho,
            touch: this.cmdTouch,
            cp: this.cmdCp,
            mv: this.cmdMv,
            find: this.cmdFind,
            grep: this.cmdGrep,
            tree: this.cmdTree,
            clear: this.cmdClear,
            whoami: this.cmdWhoami,
            date: this.cmdDate,
            env: this.cmdEnv,
            export: this.cmdExport,
            history: this.cmdHistory
        };
    }

    async cmdHelp(args) {
        const helpText = `
Available commands:
  help      - Show this help message
  ls        - List directory contents
  cd        - Change directory
  pwd       - Print working directory
  mkdir     - Create directory
  rmdir     - Remove empty directory
  rm        - Remove files/directories
  cat       - Display file contents
  echo      - Display text
  touch     - Create empty file
  cp        - Copy files
  mv        - Move/rename files
  find      - Search for files
  grep      - Search in files
  tree      - Show directory tree
  clear     - Clear terminal
  whoami    - Show current user
  date      - Show current date/time
  env       - Show environment variables
  export    - Set environment variable
  history   - Show command history

Navigation:
  Use Tab for autocompletion
  Use ↑/↓ arrows for command history
  Ctrl+C to cancel current line
  Ctrl+L to clear screen
        `;
        this.printLine(helpText);
    }

    async cmdLs(args) {
        const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
        const path = args.find(arg => !arg.startsWith('-')) || '.';
        
        try {
            const resolvedPath = this.resolvePath(path);
            const files = await virtualFS.listDirectory(resolvedPath);
            
            if (files.length === 0) {
                return;
            }
            
            if (longFormat) {
                files.forEach(file => {
                    const type = file.isDirectory ? 'd' : '-';
                    const size = file.isDirectory ? '' : virtualFS.formatFileSize(file.size);
                    const date = file.modified.toLocaleDateString();
                    const name = file.name;
                    this.printLine(`${type}rw-rw-rw- 1 user user ${size.padStart(8)} ${date} ${name}`);
                });
            } else {
                const names = files.map(f => f.isDirectory ? `${f.name}/` : f.name);
                this.printLine(names.join('  '));
            }
        } catch (error) {
            this.printLine(`ls: ${error.message}`);
        }
    }

    async cmdCd(args) {
        const path = args[0] || this.environment.HOME;
        
        try {
            const resolvedPath = this.resolvePath(path);
            const exists = await virtualFS.exists(resolvedPath);
            
            if (!exists) {
                this.printLine(`cd: ${path}: No such file or directory`);
                return;
            }
            
            const fileInfo = await virtualFS.getFileInfo(resolvedPath);
            if (!fileInfo.isDirectory) {
                this.printLine(`cd: ${path}: Not a directory`);
                return;
            }
            
            this.currentPath = resolvedPath;
            this.environment.PWD = resolvedPath;
            this.updatePrompt();
        } catch (error) {
            this.printLine(`cd: ${error.message}`);
        }
    }

    async cmdPwd(args) {
        this.printLine(this.currentPath);
    }

    async cmdMkdir(args) {
        if (args.length === 0) {
            this.printLine('mkdir: missing operand');
            return;
        }
        
        for (const dirName of args) {
            try {
                const resolvedPath = this.resolvePath(dirName);
                const parentPath = virtualFS.getParentPath(resolvedPath);
                const name = virtualFS.getFileName(resolvedPath);
                
                await virtualFS.createDirectory(parentPath, name);
                this.printLine(`Created directory: ${dirName}`);
            } catch (error) {
                this.printLine(`mkdir: ${dirName}: ${error.message}`);
            }
        }
    }

    async cmdRmdir(args) {
        if (args.length === 0) {
            this.printLine('rmdir: missing operand');
            return;
        }
        
        for (const dirName of args) {
            try {
                const resolvedPath = this.resolvePath(dirName);
                const files = await virtualFS.listDirectory(resolvedPath);
                
                if (files.length > 0) {
                    this.printLine(`rmdir: ${dirName}: Directory not empty`);
                    continue;
                }
                
                await virtualFS.deleteFile(resolvedPath);
                this.printLine(`Removed directory: ${dirName}`);
            } catch (error) {
                this.printLine(`rmdir: ${dirName}: ${error.message}`);
            }
        }
    }

    async cmdRm(args) {
        if (args.length === 0) {
            this.printLine('rm: missing operand');
            return;
        }
        
        const recursive = args.includes('-r') || args.includes('-rf');
        const force = args.includes('-f') || args.includes('-rf');
        const files = args.filter(arg => !arg.startsWith('-'));
        
        for (const fileName of files) {
            try {
                const resolvedPath = this.resolvePath(fileName);
                const fileInfo = await virtualFS.getFileInfo(resolvedPath);
                
                if (fileInfo.isDirectory && !recursive) {
                    this.printLine(`rm: ${fileName}: is a directory`);
                    continue;
                }
                
                await virtualFS.deleteFile(resolvedPath);
                this.printLine(`Removed: ${fileName}`);
            } catch (error) {
                if (!force) {
                    this.printLine(`rm: ${fileName}: ${error.message}`);
                }
            }
        }
    }

    async cmdCat(args) {
        if (args.length === 0) {
            this.printLine('cat: missing operand');
            return;
        }
        
        for (const fileName of args) {
            try {
                const resolvedPath = this.resolvePath(fileName);
                const file = await virtualFS.readFile(resolvedPath);
                this.printLine(file.content);
            } catch (error) {
                this.printLine(`cat: ${fileName}: ${error.message}`);
            }
        }
    }

    async cmdEcho(args) {
        this.printLine(args.join(' '));
    }

    async cmdTouch(args) {
        if (args.length === 0) {
            this.printLine('touch: missing operand');
            return;
        }
        
        for (const fileName of args) {
            try {
                const resolvedPath = this.resolvePath(fileName);
                const parentPath = virtualFS.getParentPath(resolvedPath);
                const name = virtualFS.getFileName(resolvedPath);
                
                const exists = await virtualFS.exists(resolvedPath);
                if (exists) {
                    // Update modification time (simplified - just recreate)
                    const file = await virtualFS.readFile(resolvedPath);
                    await virtualFS.writeFile(resolvedPath, file.content);
                } else {
                    await virtualFS.createFile(parentPath, name, '');
                }
            } catch (error) {
                this.printLine(`touch: ${fileName}: ${error.message}`);
            }
        }
    }

    async cmdCp(args) {
        if (args.length < 2) {
            this.printLine('cp: missing operand');
            return;
        }
        
        const source = args[0];
        const dest = args[1];
        
        try {
            const sourcePath = this.resolvePath(source);
            const destPath = this.resolvePath(dest);
            
            await virtualFS.copyFile(sourcePath, destPath);
            this.printLine(`Copied ${source} to ${dest}`);
        } catch (error) {
            this.printLine(`cp: ${error.message}`);
        }
    }

    async cmdMv(args) {
        if (args.length < 2) {
            this.printLine('mv: missing operand');
            return;
        }
        
        const source = args[0];
        const dest = args[1];
        
        try {
            const sourcePath = this.resolvePath(source);
            const destPath = this.resolvePath(dest);
            
            await virtualFS.moveFile(sourcePath, destPath);
            this.printLine(`Moved ${source} to ${dest}`);
        } catch (error) {
            this.printLine(`mv: ${error.message}`);
        }
    }

    async cmdFind(args) {
        const path = args[0] || '.';
        const query = args[1] || '';
        
        try {
            const resolvedPath = this.resolvePath(path);
            const results = await virtualFS.search(query, resolvedPath);
            
            results.forEach(file => {
                this.printLine(file.path);
            });
        } catch (error) {
            this.printLine(`find: ${error.message}`);
        }
    }

    async cmdGrep(args) {
        if (args.length < 2) {
            this.printLine('grep: missing operand');
            return;
        }
        
        const pattern = args[0];
        const fileName = args[1];
        
        try {
            const resolvedPath = this.resolvePath(fileName);
            const file = await virtualFS.readFile(resolvedPath);
            
            const lines = file.content.split('\n');
            lines.forEach((line, index) => {
                if (line.toLowerCase().includes(pattern.toLowerCase())) {
                    this.printLine(`${index + 1}: ${line}`);
                }
            });
        } catch (error) {
            this.printLine(`grep: ${error.message}`);
        }
    }

    async cmdTree(args) {
        const path = args[0] || '.';
        
        try {
            const resolvedPath = this.resolvePath(path);
            await this.printTree(resolvedPath, '', true);
        } catch (error) {
            this.printLine(`tree: ${error.message}`);
        }
    }

    async printTree(path, prefix, isLast) {
        try {
            const files = await virtualFS.listDirectory(path);
            const name = virtualFS.getFileName(path) || path;
            
            this.printLine(prefix + (isLast ? '└── ' : '├── ') + name);
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const isLastFile = i === files.length - 1;
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                
                if (file.isDirectory) {
                    await this.printTree(file.path, newPrefix, isLastFile);
                } else {
                    this.printLine(newPrefix + (isLastFile ? '└── ' : '├── ') + file.name);
                }
            }
        } catch (error) {
            // Skip directories we can't read
        }
    }

    async cmdClear(args) {
        this.clearTerminal();
    }

    async cmdWhoami(args) {
        this.printLine(this.environment.USER);
    }

    async cmdDate(args) {
        this.printLine(new Date().toString());
    }

    async cmdEnv(args) {
        Object.entries(this.environment).forEach(([key, value]) => {
            this.printLine(`${key}=${value}`);
        });
    }

    async cmdExport(args) {
        if (args.length === 0) {
            this.cmdEnv([]);
            return;
        }
        
        const assignment = args[0];
        const [key, value] = assignment.split('=', 2);
        
        if (value !== undefined) {
            this.environment[key] = value;
        } else {
            this.printLine(`export: ${assignment}: invalid assignment`);
        }
    }

    async cmdHistory(args) {
        this.commandHistory.forEach((cmd, index) => {
            this.printLine(`${index + 1}  ${cmd}`);
        });
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }
        
        if (path === '.') {
            return this.currentPath;
        }
        
        if (path === '..') {
            return virtualFS.getParentPath(this.currentPath) || '/';
        }
        
        if (path.startsWith('./')) {
            path = path.substring(2);
        }
        
        return virtualFS.joinPath(this.currentPath, path);
    }

    printWelcome() {
        this.printLine('Welcome to Web Desktop Terminal!');
        this.printLine('');
    }

    printLine(text) {
        const content = windowManager.getWindowContent(this.windowId);
        const output = content.querySelector('#terminal-output');
        
        const lines = text.split('\n');
        lines.forEach(line => {
            const lineEl = document.createElement('div');
            lineEl.className = 'terminal-line';
            lineEl.textContent = line;
            output.appendChild(lineEl);
        });
        
        // Auto-scroll to bottom
        output.scrollTop = output.scrollHeight;
    }

    showPrompt() {
        const content = windowManager.getWindowContent(this.windowId);
        const input = content.querySelector('#terminal-input');
        input.focus();
    }

    updatePrompt() {
        const content = windowManager.getWindowContent(this.windowId);
        const prompt = content.querySelector('#terminal-prompt');
        prompt.textContent = this.getPromptText();
    }

    getPromptText() {
        const shortPath = this.currentPath === this.environment.HOME ? '~' : 
                         this.currentPath === '/' ? '/' : 
                         virtualFS.getFileName(this.currentPath);
        return `${this.environment.USER}@webdesktop:${shortPath}$ `;
    }

    clearTerminal() {
        const content = windowManager.getWindowContent(this.windowId);
        const output = content.querySelector('#terminal-output');
        output.innerHTML = '';
    }
}