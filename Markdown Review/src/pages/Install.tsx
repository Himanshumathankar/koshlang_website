import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Container, PageHeader } from '../components/ui/layout'
import { Card, Eyebrow } from '../components/ui/primitives'
import { SegmentedControl, Tabs } from '../components/ui/controls'
import { Callout } from '../components/ui/feedback'
import { InstallCommand } from '../components/dev/InstallCommand'

type OS = 'macos' | 'windows' | 'linux'
type Method = 'recommended' | 'pkg' | 'installer' | 'archive' | 'source'

const commands: Record<OS, Record<Method, { prereq: string; install: string[]; verify: string; update: string; uninstall: string }>> = {
  macos: {
    recommended: { prereq: 'macOS 12+', install: ['brew install koshlang'], verify: 'kosh --version', update: 'brew upgrade koshlang', uninstall: 'brew uninstall koshlang' },
    pkg: { prereq: 'Homebrew installed', install: ['brew tap koshlang/tap', 'brew install koshlang'], verify: 'kosh --version', update: 'brew upgrade koshlang', uninstall: 'brew uninstall koshlang' },
    installer: { prereq: 'Admin privileges', install: ['open KoshLang-1.4.0.pkg'], verify: 'kosh --version', update: 'Re-run the installer', uninstall: 'sudo /usr/local/kosh/uninstall.sh' },
    archive: { prereq: 'tar available', install: ['tar -xzf koshlang-1.4.0-aarch64-apple-darwin.tar.gz', 'mv kosh /usr/local/bin/'], verify: 'kosh --version', update: 'Replace the binary', uninstall: 'rm /usr/local/bin/kosh' },
    source: { prereq: 'A C toolchain + kosh bootstrap', install: ['git clone https://github.com/koshlang/kosh', 'cd kosh && ./bootstrap build --release'], verify: './target/release/kosh --version', update: 'git pull && ./bootstrap build --release', uninstall: 'rm -rf kosh' },
  },
  windows: {
    recommended: { prereq: 'Windows 10+', install: ['winget install KoshLang.Kosh'], verify: 'kosh --version', update: 'winget upgrade KoshLang.Kosh', uninstall: 'winget uninstall KoshLang.Kosh' },
    pkg: { prereq: 'Scoop installed', install: ['scoop bucket add koshlang', 'scoop install koshlang'], verify: 'kosh --version', update: 'scoop update koshlang', uninstall: 'scoop uninstall koshlang' },
    installer: { prereq: 'Admin privileges', install: ['KoshLang-1.4.0-setup.exe'], verify: 'kosh --version', update: 'Re-run the installer', uninstall: 'Add/Remove Programs → KoshLang' },
    archive: { prereq: 'Extraction tool', install: ['Expand-Archive koshlang-1.4.0-x86_64-pc-windows-msvc.zip', 'Move kosh.exe to a folder on PATH'], verify: 'kosh --version', update: 'Replace kosh.exe', uninstall: 'Delete kosh.exe' },
    source: { prereq: 'MSVC build tools', install: ['git clone https://github.com/koshlang/kosh', 'cd kosh; .\\bootstrap.ps1 build --release'], verify: '.\\target\\release\\kosh --version', update: 'git pull; .\\bootstrap.ps1 build', uninstall: 'Remove the repo folder' },
  },
  linux: {
    recommended: { prereq: 'glibc 2.31+', install: ['curl -fsSL https://kosh.sh | sh'], verify: 'kosh --version', update: 'kosh self update', uninstall: 'kosh self uninstall' },
    pkg: { prereq: 'apt or dnf', install: ['sudo apt install koshlang'], verify: 'kosh --version', update: 'sudo apt upgrade koshlang', uninstall: 'sudo apt remove koshlang' },
    installer: { prereq: 'AppImage support', install: ['chmod +x KoshLang-1.4.0.AppImage', './KoshLang-1.4.0.AppImage'], verify: 'kosh --version', update: 'Download a newer AppImage', uninstall: 'Delete the AppImage' },
    archive: { prereq: 'tar available', install: ['tar -xzf koshlang-1.4.0-x86_64-unknown-linux-gnu.tar.gz', 'sudo mv kosh /usr/local/bin/'], verify: 'kosh --version', update: 'Replace the binary', uninstall: 'sudo rm /usr/local/bin/kosh' },
    source: { prereq: 'gcc/clang + make', install: ['git clone https://github.com/koshlang/kosh', 'cd kosh && ./bootstrap build --release'], verify: './target/release/kosh --version', update: 'git pull && ./bootstrap build --release', uninstall: 'rm -rf kosh' },
  },
}

const methodLabels: { value: Method; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'pkg', label: 'Package Manager' },
  { value: 'installer', label: 'Installer' },
  { value: 'archive', label: 'Archive' },
  { value: 'source', label: 'Build from Source' },
]

export function Install() {
  const [os, setOs] = useState<OS>('macos')
  const [method, setMethod] = useState<Method>('recommended')
  const c = commands[os][method]

  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="terminal">Install</Eyebrow>}
        title="Install KoshLang"
        description="Pick your operating system and preferred method. Each path covers prerequisites, verification, updating, and uninstalling."
      />
      <Container className="py-14">
        <SegmentedControl<OS>
          value={os}
          onChange={setOs}
          options={[
            { value: 'macos', label: 'macOS', icon: 'cpu' },
            { value: 'windows', label: 'Windows', icon: 'cpu' },
            { value: 'linux', label: 'Linux', icon: 'terminal' },
          ]}
        />

        <div className="mt-6">
          <Tabs<Method> tabs={methodLabels} value={method} onChange={setMethod} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">Install</h3>
              <div className="mt-4 space-y-3">
                {c.install.map((cmd) => (
                  <InstallCommand key={cmd} command={cmd} />
                ))}
              </div>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">Verify</h3>
                <div className="mt-4"><InstallCommand command={c.verify} /></div>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">Update</h3>
                <div className="mt-4">
                  {c.update.startsWith('kosh') || c.update.includes('brew') || c.update.includes('apt') || c.update.includes('winget') || c.update.includes('scoop') || c.update.includes('git') ? (
                    <InstallCommand command={c.update} />
                  ) : (
                    <p className="text-sm text-muted">{c.update}</p>
                  )}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">Uninstall</h3>
              <div className="mt-4">
                {c.uninstall.includes('/') || c.uninstall.startsWith('kosh') || c.uninstall.includes('brew') || c.uninstall.includes('apt') || c.uninstall.includes('winget') || c.uninstall.includes('scoop') || c.uninstall.startsWith('rm') || c.uninstall.startsWith('sudo') ? (
                  <InstallCommand command={c.uninstall} />
                ) : (
                  <p className="text-sm text-muted">{c.uninstall}</p>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-subtle">Prerequisites</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <Icon name="check" size={16} className="text-[var(--success)]" /> {c.prereq}
              </p>
            </Card>

            {/* Troubleshooting — deliberately not buried */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-subtle">
                <Icon name="warning" size={15} className="text-[var(--warning)]" /> PATH troubleshooting
              </h3>
              <p className="mt-3 text-sm text-muted">
                If <code className="font-mono text-foreground">kosh</code> isn’t found after
                install, the binary directory may not be on your PATH.
              </p>
              <div className="mt-4">
                <InstallCommand
                  command={os === 'windows' ? 'setx PATH "%PATH%;C:\\kosh\\bin"' : 'export PATH="$HOME/.kosh/bin:$PATH"'}
                />
              </div>
              <Callout kind="tip" title="Restart your shell">
                Open a new terminal (or run <code className="font-mono">source ~/.zshrc</code>) so
                the updated PATH takes effect.
              </Callout>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}
