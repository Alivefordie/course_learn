const conf = {
	url: "http://localhost:1337",
	apiUrlPrefix: "http://localhost:1337/api",
	loginEndpoint: "/auth/local",
	jwtUserEndpoint: "/users/me?populate[0]=role&populate[1]=picture",
	jwtSessionStorageKey: "auth.jwt",
	RoleSessionStorageKey: "/users/me?populate[0]=role&populate[1]=picture",
	findanything: "/users/me?populate[entries][populate][course]=*",
	Cart: "/cart",
	Profile: "/users/me?populate=*",
	Picture: "users/me?populate[picture]=*",
	Course: "/courses?populate=*",
	Entries: "/entries?populate[owner]=*",
	Silp:"/api/tansactions?populate[slip]=*"
};

export default conf;
