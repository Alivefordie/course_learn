const conf = {
    apiUrlPrefix: 'http://localhost:1337/api',
    loginEndpoint: '/auth/local',
    jwtUserEndpoint: '/users/me',
    jwtSessionStorageKey: 'auth.jwt',
    RoleSessionStorageKey: '/users/me?populate=role',
    test:"/users/me?populate[entries][populate][course]=*",
};

export default conf;
