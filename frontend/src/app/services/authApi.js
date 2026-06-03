const getGraphqlEndpoint = () => {
  if (window.SD_GRAPHQL_ENDPOINT) return window.SD_GRAPHQL_ENDPOINT;
  const storedEndpoint = localStorage.getItem('sd-graphql-endpoint');
  if (storedEndpoint) return storedEndpoint;
  return `${window.location.protocol}//${window.location.hostname}:8001/graphql`;
};

const requestGraphql = async (query, variables) => {
  let response;

  try {
    response = await fetch(getGraphqlEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (error) {
    throw new Error('No se pudo conectar con el backend.');
  }

  const body = await response.json();
  if (!response.ok || body.errors?.length) {
    throw new Error(translateAuthError(body.errors?.[0]?.message));
  }

  return body.data;
};

const translateAuthError = (message = '') => {
  const normalized = message.toLowerCase();

  if (normalized.includes('email not found')) {
    return 'No existe una cuenta con ese correo.';
  }

  if (normalized.includes('incorrect password')) {
    return 'La contraseña es incorrecta.';
  }

  if (normalized.includes('user already exists')) {
    return 'Ya existe una cuenta con ese correo.';
  }

  if (normalized.includes('network') || normalized.includes('failed to fetch')) {
    return 'No se pudo conectar con el backend.';
  }

  return message || 'No se pudo completar la solicitud.';
};

export const AuthApi = {
  async login({ email, password }) {
    const data = await requestGraphql(
      `mutation Login($input: LoginInput!) {
        login(login: $input) {
          email
          token
        }
      }`,
      {
        input: { email, password },
      }
    );

    localStorage.setItem('sd-auth-token', data.login.token);
    localStorage.setItem('sd-auth-email', data.login.email);

    return data.login;
  },

  async register({ name, email, password, companyName }) {
    const data = await requestGraphql(
      `mutation Register($input: RegisterInput!) {
        register(registerInput: $input)
      }`,
      {
        input: { name, email, password, companyName },
      }
    );

    return data.register;
  },
};
