class WebcamApp {
    constructor() {
        this.windowId = null;
        this.stream = null;
        this.video = null;
        this.canvas = null;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
    }

    async open() {
        this.windowId = windowManager.createWindow({
            title: 'Webcam',
            width: 640,
            height: 520,
            content: this.createInterface()
        });

        this.setupEventListeners();
        await this.initializeCamera();
    }

    createInterface() {
        return `
            <div class="webcam-app">
                <div class="webcam-container">
                    <video id="webcam-video" class="webcam-video" autoplay muted playsinline></video>
                    <canvas id="webcam-canvas" style="display: none;"></canvas>
                </div>
                
                <div class="webcam-controls">
                    <button id="webcam-start" disabled>Start Camera</button>
                    <button id="webcam-stop" disabled>Stop Camera</button>
                    <button id="webcam-snapshot" disabled>📸 Snapshot</button>
                    <button id="webcam-record" disabled>🔴 Record</button>
                    <button id="webcam-stop-record" disabled style="display: none;">⏹️ Stop Recording</button>
                    <button id="webcam-switch-camera" disabled>🔄 Switch Camera</button>
                </div>
                
                <div class="webcam-settings">
                    <label for="webcam-resolution">Resolution:</label>
                    <select id="webcam-resolution">
                        <option value="320x240">320x240</option>
                        <option value="640x480" selected>640x480</option>
                        <option value="1280x720">1280x720</option>
                        <option value="1920x1080">1920x1080</option>
                    </select>
                    
                    <label for="webcam-quality">JPEG Quality:</label>
                    <input type="range" id="webcam-quality" min="0.1" max="1" step="0.1" value="0.8">
                    <span id="quality-value">80%</span>
                </div>
                
                <div class="webcam-status">
                    <span id="webcam-status">Click "Start Camera" to begin</span>
                    <span id="webcam-info"></span>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const content = windowManager.getWindowContent(this.windowId);
        
        // Control buttons
        content.querySelector('#webcam-start').addEventListener('click', () => this.startCamera());
        content.querySelector('#webcam-stop').addEventListener('click', () => this.stopCamera());
        content.querySelector('#webcam-snapshot').addEventListener('click', () => this.takeSnapshot());
        content.querySelector('#webcam-record').addEventListener('click', () => this.startRecording());
        content.querySelector('#webcam-stop-record').addEventListener('click', () => this.stopRecording());
        content.querySelector('#webcam-switch-camera').addEventListener('click', () => this.switchCamera());
        
        // Settings
        content.querySelector('#webcam-resolution').addEventListener('change', () => this.changeResolution());
        content.querySelector('#webcam-quality').addEventListener('input', (e) => {
            const qualityValue = content.querySelector('#quality-value');
            qualityValue.textContent = Math.round(e.target.value * 100) + '%';
        });
        
        // Get video and canvas elements
        this.video = content.querySelector('#webcam-video');
        this.canvas = content.querySelector('#webcam-canvas');
        
        // Video events
        this.video.addEventListener('loadedmetadata', () => this.onVideoLoaded());
    }

    async initializeCamera() {
        try {
            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera access not supported in this browser');
            }
            
            // Get available devices
            await this.getAvailableDevices();
            
            const content = windowManager.getWindowContent(this.windowId);
            content.querySelector('#webcam-start').disabled = false;
            this.updateStatus('Camera ready. Click "Start Camera" to begin.');
        } catch (error) {
            this.updateStatus(`Camera initialization failed: ${error.message}`, 'error');
        }
    }

    async getAvailableDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            this.videoDevices = devices.filter(device => device.kind === 'videoinput');
            this.currentDeviceIndex = 0;
            
            const content = windowManager.getWindowContent(this.windowId);
            const switchBtn = content.querySelector('#webcam-switch-camera');
            switchBtn.disabled = this.videoDevices.length <= 1;
            
            this.updateInfo(`Found ${this.videoDevices.length} camera(s)`);
        } catch (error) {
            console.warn('Could not enumerate devices:', error);
        }
    }

    async startCamera() {
        try {
            const content = windowManager.getWindowContent(this.windowId);
            const resolution = content.querySelector('#webcam-resolution').value;
            const [width, height] = resolution.split('x').map(Number);
            
            const constraints = {
                video: {
                    width: { ideal: width },
                    height: { ideal: height },
                    facingMode: 'user'
                },
                audio: true // For recording
            };
            
            // Use specific device if available
            if (this.videoDevices && this.videoDevices.length > 0) {
                constraints.video.deviceId = this.videoDevices[this.currentDeviceIndex].deviceId;
            }
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            
            this.updateStatus('Camera started successfully');
            this.updateControlButtons(true);
            
        } catch (error) {
            this.updateStatus(`Failed to start camera: ${error.message}`, 'error');
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
            this.video.srcObject = null;
        }
        
        if (this.isRecording) {
            this.stopRecording();
        }
        
        this.updateStatus('Camera stopped');
        this.updateControlButtons(false);
    }

    async takeSnapshot() {
        if (!this.stream || !this.video.videoWidth) {
            this.updateStatus('No camera feed available', 'error');
            return;
        }
        
        try {
            // Set canvas size to match video
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            
            // Draw video frame to canvas
            const ctx = this.canvas.getContext('2d');
            ctx.drawImage(this.video, 0, 0);
            
            // Get image data
            const content = windowManager.getWindowContent(this.windowId);
            const quality = parseFloat(content.querySelector('#webcam-quality').value);
            const dataUrl = this.canvas.toDataURL('image/jpeg', quality);
            
            // Convert to blob and save to virtual filesystem
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Generate filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `snapshot-${timestamp}.jpg`;
            const filepath = `/photos/${filename}`;
            
            // Ensure photos directory exists
            await this.ensurePhotosDirectory();
            
            // Save image as binary data (we'll need to handle this properly in the filesystem)
            await virtualFS.createFile('/photos', filename, dataUrl, 'image/jpeg');
            
            this.updateStatus(`Snapshot saved as ${filename}`);
            this.showPreview(dataUrl, filename);
            
        } catch (error) {
            this.updateStatus(`Failed to take snapshot: ${error.message}`, 'error');
        }
    }

    async startRecording() {
        if (!this.stream) {
            this.updateStatus('No camera feed available', 'error');
            return;
        }
        
        try {
            this.recordedChunks = [];
            
            const options = {
                mimeType: 'video/webm;codecs=vp9,opus'
            };
            
            // Fallback to more compatible format if needed
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'video/webm';
            }
            
            this.mediaRecorder = new MediaRecorder(this.stream, options);
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                this.saveRecording();
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            
            const content = windowManager.getWindowContent(this.windowId);
            content.querySelector('#webcam-record').style.display = 'none';
            content.querySelector('#webcam-stop-record').style.display = 'inline-block';
            
            this.updateStatus('Recording started...');
            this.startRecordingTimer();
            
        } catch (error) {
            this.updateStatus(`Failed to start recording: ${error.message}`, 'error');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            
            const content = windowManager.getWindowContent(this.windowId);
            content.querySelector('#webcam-record').style.display = 'inline-block';
            content.querySelector('#webcam-stop-record').style.display = 'none';
            
            this.stopRecordingTimer();
            this.updateStatus('Recording stopped');
        }
    }

    async saveRecording() {
        if (this.recordedChunks.length === 0) return;
        
        try {
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
            const arrayBuffer = await blob.arrayBuffer();
            const dataUrl = URL.createObjectURL(blob);
            
            // Generate filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `recording-${timestamp}.webm`;
            
            // Ensure photos directory exists
            await this.ensurePhotosDirectory();
            
            // Save recording (simplified - storing as data URL)
            await virtualFS.createFile('/photos', filename, dataUrl, 'video/webm');
            
            this.updateStatus(`Recording saved as ${filename}`);
            
        } catch (error) {
            this.updateStatus(`Failed to save recording: ${error.message}`, 'error');
        }
    }

    async switchCamera() {
        if (!this.videoDevices || this.videoDevices.length <= 1) return;
        
        this.currentDeviceIndex = (this.currentDeviceIndex + 1) % this.videoDevices.length;
        
        if (this.stream) {
            this.stopCamera();
            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
            await this.startCamera();
        }
        
        const deviceName = this.videoDevices[this.currentDeviceIndex].label || `Camera ${this.currentDeviceIndex + 1}`;
        this.updateInfo(`Switched to: ${deviceName}`);
    }

    async changeResolution() {
        if (this.stream) {
            // Restart camera with new resolution
            this.stopCamera();
            await new Promise(resolve => setTimeout(resolve, 100));
            await this.startCamera();
        }
    }

    onVideoLoaded() {
        const content = windowManager.getWindowContent(this.windowId);
        this.updateInfo(`Resolution: ${this.video.videoWidth}x${this.video.videoHeight}`);
    }

    startRecordingTimer() {
        this.recordingStartTime = Date.now();
        this.recordingTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.updateStatus(`Recording... ${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
    }

    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
    }

    async ensurePhotosDirectory() {
        const exists = await virtualFS.exists('/photos');
        if (!exists) {
            await virtualFS.createDirectory('/', 'photos');
        }
    }

    showPreview(dataUrl, filename) {
        // Create a small preview window
        const previewWindowId = windowManager.createWindow({
            title: `Preview - ${filename}`,
            width: 400,
            height: 350,
            content: `
                <div style="text-align: center; padding: 10px;">
                    <img src="${dataUrl}" style="max-width: 100%; max-height: 250px; border-radius: 8px;">
                    <p style="margin-top: 10px; color: #ccc;">Saved to /photos/${filename}</p>
                    <button onclick="windowManager.closeWindow('${previewWindowId}')">Close</button>
                </div>
            `
        });
    }

    updateControlButtons(cameraOn) {
        const content = windowManager.getWindowContent(this.windowId);
        
        content.querySelector('#webcam-start').disabled = cameraOn;
        content.querySelector('#webcam-stop').disabled = !cameraOn;
        content.querySelector('#webcam-snapshot').disabled = !cameraOn;
        content.querySelector('#webcam-record').disabled = !cameraOn || this.isRecording;
        content.querySelector('#webcam-switch-camera').disabled = !cameraOn || (this.videoDevices && this.videoDevices.length <= 1);
    }

    updateStatus(message, type = 'info') {
        const content = windowManager.getWindowContent(this.windowId);
        const statusEl = content.querySelector('#webcam-status');
        
        statusEl.textContent = message;
        statusEl.className = type;
    }

    updateInfo(message) {
        const content = windowManager.getWindowContent(this.windowId);
        const infoEl = content.querySelector('#webcam-info');
        infoEl.textContent = message;
    }

    // Cleanup when window is closed
    destroy() {
        this.stopCamera();
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
        }
    }
}