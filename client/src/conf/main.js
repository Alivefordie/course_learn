const conf = {
    apiUrlPrefix: 'http://localhost:1337/api',
    loginEndpoint: '/auth/local',
    jwtUserEndpoint: '/users/me',
    jwtSessionStorageKey: 'auth.jwt',
    RoleSessionStorageKey: '/users/me?populate=role' 
};

export default conf;
