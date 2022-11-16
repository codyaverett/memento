---
title: c++ package managers
created: 2022-10-19T20:15:36-05:00
updated: 2022-11-16T15:48:02-06:00
---

Historically the c++ package managers have been the operating system package managers.  Today is a new day though and I've found a couple cross platform solutions for downloading and installing packages from various sources. 

## BPT
Seems to be a rather obscure package manager, at least I didn't try too hard to get it working.

```shell
# For Linux, writes a file in the working directory called "bpt"
curl dds.pizza/get/linux -Lo bpt

# For macOS, writes a file in the working directory called "bpt"
curl dds.pizza/get/macos -Lo bpt
```

```shell
./bpt

Usage: ./bpt [--log-level <level>] [--data-dir <directory>]
             [--pkg-cache-dir <directory>] [--pkg-db-path <database-path>]
             {build,compile-file,build-deps,pkg,repoman,install-yourself}
```

## vcpkg
Visual Studio package manager - used by Visual studio behind the scenes, can be used on command-line and is cross platform.

```shell
./vcpkg

Commands:
  vcpkg search [pat]              Search for packages available to be built.
  vcpkg install <pkg>...          Install a package.
  vcpkg remove <pkg>...           Uninstall a package.
  vcpkg update                    List packages that can be updated.
  vcpkg remove --outdated         Uninstall all out-of-date packages.
  vcpkg upgrade                   Rebuild all outdated packages.
  vcpkg hash <file> [alg]         Hash a file by specific algorithm, default SHA512.
  vcpkg help topics               Display the list of help topics.
  vcpkg help <topic>              Display help for a specific topic.
  vcpkg list                      List installed packages.

  vcpkg integrate install         Make installed packages available user - wide.Requires admin
                                  privileges on first use
  vcpkg integrate remove          Remove user-wide integration
  vcpkg integrate bash            Enable bash tab-completion
  vcpkg integrate zsh             Enable zsh tab-completion
  vcpkg integrate x-fish          Enable fish tab-completion

  vcpkg export <pkg>... [opt]...  Exports a package.
  vcpkg edit <pkg>                Open a port for editing (use the environment variable 'EDITOR' to
                                  set an editor program, defaults to 'code').
  vcpkg create <pkg> <url> [archivename]
                                  Create a new port.
  vcpkg x-init-registry <path>    Initializes a registry in the directory <path>.
  vcpkg format-manifest --all     Formats all vcpkg.json files. Run this before committing to vcpkg.
  vcpkg owns <pat>                Search for files in installed packages.
  vcpkg depend-info <pkg>...      Display a list of dependencies for ports.
  vcpkg env                       Creates a clean shell environment for development or compiling.
  vcpkg version                   Display version information.
  vcpkg contact                   Display contact information to send feedback.

Options:
  --triplet=<t>                   Specify the target architecture triplet. See 'vcpkg help triplet'.
                                  (default: 'VCPKG_DEFAULT_TRIPLET')
  --host-triplet=<t>              Specify the host architecture triplet. See 'vcpkg help triplet'.
                                  (default: 'VCPKG_DEFAULT_HOST_TRIPLET')
  --overlay-ports=<path>          Specify directories to be used when searching for ports.
                                  (also: 'VCPKG_OVERLAY_PORTS')
  --overlay-triplets=<path>       Specifiy directories containing triplets files.
                                  (also: 'VCPKG_OVERLAY_TRIPLETS')
  --binarysource=<path>           Add sources for binary caching. See 'vcpkg help binarycaching'.
  --x-asset-sources=<path>        Add sources for asset caching. See 'vcpkg help assetcaching'.
  --downloads-root=<path>         Specify the downloads root directory.
                                  (default: VCPKG_DOWNLOADS)
  --vcpkg-root=<path>             Specify the vcpkg root directory.
                                  (default: 'VCPKG_ROOT')
  --x-buildtrees-root=<path>      (Experimental) Specify the buildtrees root directory.
  --x-install-root=<path>         (Experimental) Specify the install root directory.
  --x-packages-root=<path>        (Experimental) Specify the packages root directory.
  --x-json                        (Experimental) Request JSON output.

  @response_file                  Specify a response file to provide additional parameters.

For more help (including examples) see the accompanying README.md and docs folder.
```

## Conan
[Website](https://conan.io/center/)
[Install](https://conan.io/downloads.html)
[Github](https://github.com/conan-io/conan)

Based on [JFrog Artifactory](https://docs.conan.io/en/latest/uploading_packages/artifactory/artifactory_ce.html), seems to be pretty full featured.  Allows you to easily host your own packages from your own server.

```shell
conan --help                                                                                                                                   caavere@Codys-MacBook-Pro
Consumer commands
  install    Installs the requirements specified in a recipe (conanfile.py or conanfile.txt).
  config     Manages Conan configuration.
  get        Gets a file or list a directory of a given reference or package.
  info       Gets information about the dependency graph of a recipe.
  search     Searches package recipes and binaries in the local cache or a remote. Unless a
             remote is specified only the local cache is searched.
Creator commands
  new        Creates a new package recipe template with a 'conanfile.py' and optionally,
             'test_package' testing files.
  create     Builds a binary package for a recipe (conanfile.py).
  upload     Uploads a recipe and binary packages to a remote.
  export     Copies the recipe (conanfile.py & associated files) to your local cache.
  export-pkg Exports a recipe, then creates a package from local source and build folders.
  test       Tests a package consuming it from a conanfile.py with a test() method.
Package development commands
  source     Calls your local conanfile.py 'source()' method.
  build      Calls your local conanfile.py 'build()' method.
  package    Calls your local conanfile.py 'package()' method.
  editable   Manages editable packages (packages that reside in the user workspace, but are
             consumed as if they were in the cache).
  workspace  Manages a workspace (a set of packages consumed from the user workspace that
             belongs to the same project).
Misc commands
  profile    Lists profiles in the '.conan/profiles' folder, or shows profile details.
  remote     Manages the remote list and the package recipes associated with a remote.
  user       Authenticates against a remote with user/pass, caching the auth token.
  imports    Calls your local conanfile.py or conanfile.txt 'imports' method.
  copy       Copies conan recipes and packages to another user/channel.
  remove     Removes packages or binaries matching pattern from local cache or remote.
  alias      Creates and exports an 'alias package recipe'.
  download   Downloads recipe and binaries to the local cache, without using settings.
  inspect    Displays conanfile attributes, like name, version, and options. Works locally,
             in local cache and remote.
  help       Shows help for a specific command.
  lock       Generates and manipulates lock files.
  frogarian  Conan The Frogarian

Conan commands. Type "conan <command> -h" for help
```