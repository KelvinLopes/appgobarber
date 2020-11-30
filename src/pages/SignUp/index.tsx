import React from 'react';
import { 
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { 
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
} from './styles';

const SingUp: React.FC = () => {
  const navigation = useNavigation();

  return (
   <>
   <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
    enabled
  >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title> Crie sua conta </Title>
          </View>
          <Input name="name" icon="mail" placeholder="Name"/>
          <Input name="email" icon="mail" placeholder="E-mail"/>
          <Input  name="password" icon="lock" placeholder="Senha"/>

          <Button onPress={() => {}}>Entrar</Button>
        </Container>
        </ScrollView>
    </KeyboardAvoidingView>

    <BackToSignIn onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <BackToSignInText>Voltar para logon</BackToSignInText>
    </BackToSignIn>
  </>
  );
}

export default SingUp;