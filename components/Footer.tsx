import { Text, Link, Spacer, useTheme } from '@geist-ui/react';
import { Github } from '@geist-ui/react-icons';

type FooterProps = {
  projectLink?: string;
};

const Footer: React.FC<FooterProps> = ({ projectLink }: FooterProps) => {
  const theme = useTheme();
  return (
    <>
      <footer>
        <Link
          href={projectLink ? projectLink : `https://github.com/${process.env.GITHUB_USERNAME || 'octocat'}`}
          target="_blank"
          rel="noopener"
          underline
        >
          <div className="github">
            <Github size={18} aria-label="Github" />
            <Spacer inline w={0.35} />
            <Text>@{process.env.GITHUB_USERNAME || 'octocat'}</Text>
          </div>
        </Link>
        <style jsx>
          {`
            footer {
              background: ${theme.palette.background};
              border-top: 1px solid ${theme.palette.border};
              padding: ${theme.layout.gapQuarter} ${theme.layout.gap};
              text-align: center;
              position: fixed;
              bottom: 0;
              width: 100%;
            }
            .github {
              display: flex;
              flex-direction: row;
              align-items: center;
            }
          `}
        </style>
      </footer>
    </>
  );
};

export default Footer;
