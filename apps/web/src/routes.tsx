import { createBrowserRouter } from 'react-router'
import { SiteShell } from './components/shells/SiteShell'
import { DocsShell } from './components/shells/DocsShell'
import { Home } from './screens/Home'
import { Download } from './screens/Download'
import { Install } from './screens/Install'
import { Releases, ReleaseDetail } from './screens/Releases'
import { Examples, ExampleDetail } from './screens/Examples'
import { Tools, ToolDetail } from './screens/Tools'
import { Blog, BlogPost } from './screens/Blog'
import { Playground } from './screens/Playground'
import { PkgHome, PkgSearch, PkgDetail } from './screens/pkg/PkgPages'
import {
  Roadmap,
  Community,
  Contribute,
  Governance,
  Security,
  About,
  Status,
  GlobalSearch,
} from './screens/MiscPages'
import { Brand } from './screens/Brand'
import { NotFound, ServerError, StatesGallery } from './screens/SystemPages'
import {
  DocsHome,
  DocArticle,
  StdlibIndex,
  StdlibSymbol,
  CliIndex,
  CliCommandPage,
} from './screens/docs/DocsPages'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SiteShell,
    children: [
      { index: true, Component: Home },
      { path: 'download', Component: Download },
      { path: 'install', Component: Install },
      { path: 'releases', Component: Releases },
      { path: 'releases/:version', Component: ReleaseDetail },
      { path: 'examples', Component: Examples },
      { path: 'examples/:slug', Component: ExampleDetail },
      { path: 'tools', Component: Tools },
      { path: 'tools/:slug', Component: ToolDetail },
      { path: 'blog', Component: Blog },
      { path: 'blog/:slug', Component: BlogPost },
      { path: 'play', Component: Playground },
      { path: 'pkg', Component: PkgHome },
      { path: 'pkg/search', Component: PkgSearch },
      { path: 'pkg/:name', Component: PkgDetail },
      { path: 'roadmap', Component: Roadmap },
      { path: 'community', Component: Community },
      { path: 'contribute', Component: Contribute },
      { path: 'governance', Component: Governance },
      { path: 'security', Component: Security },
      { path: 'about', Component: About },
      { path: 'brand', Component: Brand },
      { path: 'search', Component: GlobalSearch },
      { path: 'status', Component: Status },
      { path: 'states', Component: StatesGallery },
      { path: '500', Component: ServerError },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/docs',
    Component: DocsShell,
    children: [
      { index: true, Component: DocsHome },
      { path: 'stdlib', Component: StdlibIndex },
      { path: 'stdlib/:name', Component: StdlibSymbol },
      { path: 'cli', Component: CliIndex },
      { path: 'cli/:name', Component: CliCommandPage },
      { path: ':slug', Component: DocArticle },
    ],
  },
])
