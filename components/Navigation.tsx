import { useRouter } from 'next/router';
import { Tabs, Text, Button, useTheme } from '@geist-ui/react';

const MenuLinks: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <>
      <div className="submenu__wrapper">
        <div className="submenu__inner">
          <Tabs value={router.asPath} onChange={(r) => router.push(r)}>
            <Tabs.Item label="Home" value="/" />
            <Tabs.Item label="Blog" value="/posts" />
            <Tabs.Item label="Projects" value="/projects" />
            <Tabs.Item label="Tech Stack" value="/techstack" />
          </Tabs>
        </div>
      </div>
      <style jsx>{`
        .submenu__wrapper {
          height: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 -1px ${theme.palette.border};
        }
        .submenu__inner {
          display: flex;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          height: 48px;
          box-sizing: border-box;
          overflow-y: hidden;
          overflow-x: auto;
          overflow: -moz-scrollbars-none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          box-sizing: border-box;
        }
        .submenu__inner :global(.content) {
          display: none;
        }
        .submenu__inner :global(.tabs),
        .submenu__inner :global(header) {
          height: 100%;
          border: none;
        }
        .submenu__inner :global(.tab) {
          height: calc(100% - 2px);
          padding-top: 0;
          padding-bottom: 0;
          color: ${theme.palette.accents_5};
          font-size: 0.875rem;
        }
        .submenu__inner :global(.tab):hover {
          color: ${theme.palette.foreground};
        }
        .submenu__inner :global(.active) {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  );
};

type HeaderProps = {
  switchThemes: () => void;
};

const Navigation: React.FC<HeaderProps> = (props?: HeaderProps) => {
  const theme = useTheme();
  return (
    <>
      <nav className="nav_menu">
        <h1 className="title">React Blog with NextJS & DynamoDB</h1>
        <div>
          <Button onClick={() => props?.switchThemes()}>
            <Text h4>{theme.type} Mode</Text>
          </Button>
        </div>
      </nav>
      <MenuLinks />
      <style jsx>{`
        .nav_menu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${theme.layout.pageWidthWithMargin};
          height: 54px;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          background-color: ${theme.palette.background};
          font-size: 16px;
          box-sizing: border-box;
        }

        .title {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
          letter-spacing: 0;
        }
      `}</style>
    </>
  );
};

export default Navigation;
