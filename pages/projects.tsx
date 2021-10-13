import type { NextPage } from 'next';
import type { CSSProperties } from 'react';
import { Page, Card, Divider, Grid, Link, Loading, Text, Spacer } from '@geist-ui/react';
import { useGithub } from '@/lib/hooks';
import { GitBranch, Star } from '@geist-ui/react-icons';

const cardStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '350px',
  maxWidth: '400px',
  width: '100%',
};

const cardFooterStyles: CSSProperties = {
  marginTop: 'auto',
  flexDirection: 'column',
};

const Projects: NextPage = () => {
  const { data } = useGithub({ projects: true });
  if (!data) return <Loading type="success" />;
  const { repos = [] } = data;
  return (
    <>
      <Page>
        <Page.Header>
          <Text h3>Github Projects ({repos.length})</Text>
        </Page.Header>
        <Page.Content>
          <Grid.Container gap={2} justify="center">
            {repos.map((repo: any, idx: number) => {
              return (
                <Grid xs={24} md={12} key={idx}>
                  <Card style={cardStyles} shadow>
                    <Card.Content>
                      <h4>{repo.name}</h4>
                      <p>{repo.description}</p>
                    </Card.Content>
                    <Card.Footer style={cardFooterStyles}>
                      <div className="repo_highlights" style={{ display: 'flex', width: '100%', marginTop: 'auto' }}>
                        <div className="repo_language">{repo.language}</div>
                        <div className="repo_forks">
                          <GitBranch size={16} />
                          <span>{repo.forks}</span>
                        </div>
                        <div className="repo_stars">
                          <Star size={16} />
                          <span>{repo.stargazers_count}</span>
                        </div>
                      </div>
                      <Divider />
                      <Link block target="_blank" href={repo.html_url}>
                        Visit source code on GitHub.
                      </Link>
                    </Card.Footer>
                  </Card>
                </Grid>
              );
            })}
          </Grid.Container>
        </Page.Content>
      </Page>
      <style jsx>{`
        .repo_highlights {
          display: flex;
          width: 100%;
          margin-top: auto;
          margin-bottom: 10px;
        }
        .repo_language {
          margin-left: 15px;
          margin-right: 7px;
          font-weight: 600;
        }
        .repo_forks {
          margin-left: 5px;
          display: flex;
          align-items: center;
        }
        .repo_stars {
          margin-left: 5px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Projects;
