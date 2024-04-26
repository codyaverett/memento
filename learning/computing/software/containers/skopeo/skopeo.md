# Skopeo

## Usage

```shell
skopeo --help                                                                                          1 ↵ caavere@Codys-MacBook-Pro
Various operations with container images and container image registries

Usage:
  skopeo [flags]
  skopeo [command]

Available Commands:
  copy                                          Copy an IMAGE-NAME from one location to another
  delete                                        Delete image IMAGE-NAME
  generate-sigstore-key                         Generate a sigstore public/private key pair
  help                                          Help about any command
  inspect                                       Inspect image IMAGE-NAME
  list-tags                                     List tags in the transport/repository specified by the SOURCE-IMAGE
  login                                         Login to a container registry
  logout                                        Logout of a container registry
  manifest-digest                               Compute a manifest digest of a file
  standalone-sign                               Create a signature using local files
  standalone-verify                             Verify a signature using local files
  sync                                          Synchronize one or more images from one location to another

Flags:
      --command-timeout duration   timeout for the command execution
      --debug                      enable debug output
  -h, --help                       help for skopeo
      --insecure-policy            run the tool without any policy check
      --override-arch ARCH         use ARCH instead of the architecture of the machine for choosing images
      --override-os OS             use OS instead of the running OS for choosing images
      --override-variant VARIANT   use VARIANT instead of the running architecture variant for choosing images
      --policy string              Path to a trust policy file
      --registries.d DIR           use registry configuration files in DIR (e.g. for container signature storage)
      --tmpdir string              directory used to store temporary files
  -v, --version                    Version for Skopeo

Use "skopeo [command] --help" for more information about a command.
```
