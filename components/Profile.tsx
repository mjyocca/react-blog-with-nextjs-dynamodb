import { Avatar, Text, Spacer } from '@geist-ui/react';
import { useGithub } from '@/lib/hooks';

const Profile: React.FC = () => {
  const { data: user } = useGithub({ profile: true });
  return (
    <>
      <Avatar h={4} w={4} src={user?.profile?.avatar_url} />
      <Spacer inline w={1} />
      <div className="profile_description">
        <div>
          <Text h2>{user?.profile?.name}</Text>
          <Text h6>{user?.profile?.company}</Text>
          <Text h6>{user?.profile?.location}</Text>
        </div>
      </div>
      <style jsx>{`
        .profile_description {
          display: flex;
          align-items: center;
          margin: auto 0 auto 0;
          flex: 1;
        }
      `}</style>
    </>
  );
};

export default Profile;
