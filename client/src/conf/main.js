const conf = {
    apiUrlPrefix: 'http://localhost:1337/api',
    loginEndpoint: '/auth/local',
    jwtUserEndpoint: '/users/me',
    jwtSessionStorageKey: 'auth.jwt',
    RoleSessionStorageKey: '/users/me?populate=role',
    findanything:"/users/me?populate[entries][populate][course]=*",
    Cart:"/cart",
    Profile: '/users/me?populate=*',
    Picture: "users/me?populate[picture]=*",
    Course:"/courses?populate=*",
    Entries:"/entries?populate[owner]=*"
};

export default conf;
