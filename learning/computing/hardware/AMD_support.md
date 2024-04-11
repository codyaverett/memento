# AMD Rocm support on ubuntu linux

Install latest drivers from here https://rocm.docs.amd.com/projects/install-on-linux/en/latest/tutorial/quick-start.html

```
sudo apt update
wget https://repo.radeon.com/amdgpu-install/6.0.2/ubuntu/jammy/amdgpu-install_6.0.60002-1_all.deb
sudo apt install ./amdgpu-install_6.0.60002-1_all.deb
sudo amdgpu-install --usecase=graphics,rocm
```

## stable-diffusion-webui

```
(venv) ~/Projects/stable-diffusion-webui$ TORCH_COMMAND='pip install torch torchvision --extra-index-url https://download.pytorch.org/whl/rocm5.1.1' python launch.py --precision full --no-half --skip-torch-cuda-test
```
