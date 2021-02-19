import React, { useCallback, useRef } from 'react';
import {
  Alert,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationsErros';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmationPasswordInputRef = useRef<TextInput>(null);


  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer seu logon no GoBarber!',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        );
      }
  }, [navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
   }, [navigation]);

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
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
          <UserAvatarButton onPress={() => {}}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>
          <View>
            <Title> Meu perfil </Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="mail"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }}
            />

            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordInputRef.current?.focus()
              }}
            />

            <Input
              ref={oldPasswordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus()
              }}
            />

          <Input
              ref={passwordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmationPasswordInputRef.current?.focus()
              }}
            />

          <Input
              ref={confirmationPasswordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => {
              formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
          </Button>

          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>

  </>
  );
}

export default Profile;