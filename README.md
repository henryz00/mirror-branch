# Mirror Branch action

Want to rename a branch? Want to rename it right now, but worried that it will break things that are pulling from its current name (e.g. CI jobs)?

Have you already renamed a branch and broken everything and you want to fix it ASAP?

This action updates another branch whenever you push to the branch it's triggered on. It should serve as a handy stopgap while you track down those last few jobs that are still set to the old name.

## Inputs

### `source-branch`

The name of the source branch to update. Required.

### `target-branch`

The name of the target branch to update. Default `"master"`.

### `force`

Whether or not to force push. "true" means to force push, "false" means don't. Defaults to true.

## Example usage

Mirror the `release` branch to the `deployment` branch, when master is updated:

```
name: Mirror branch

on:
  push:
    branches: [ master ]

jobs:
  mirror-to-master:
    runs-on: ubuntu-latest
    steps:
    - uses: zofrex/mirror-branch@v1
      with:
        target-branch: release
        target-branch: deployment
        force: true
```

Original repo: https://github.com/zofrex/mirror-branch
