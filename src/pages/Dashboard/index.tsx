import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    //navigate('Profile');
    signOut();
  }, [signOut]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, [setProviders]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        keyExtractor={provider => provider.id}
        data={providers}
        renderItem={({ item }) => (
          <UserName>{item.name}</UserName>
        )}
      />
    </Container>
  );
}

export default Dashboard;