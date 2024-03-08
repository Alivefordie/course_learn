const isProd = process.env.NODE_ENV === 'production'

const conf = {
	isProd,
	url: isProd ? 'https://wd13.cloud-workshop.online' :"http://localhost:1337"  ,
	apiUrlPrefix: isProd ? 'https://wd13.cloud-workshop.online/api' :"http://localhost:1337/api",
	loginEndpoint: "/auth/local",
	jwtUserEndpoint: "/users/me?populate[0]=role&populate[1]=picture",
	jwtSessionStorageKey: "auth.jwt",
	RoleSessionStorageKey: "/users/me?populate[0]=role&populate[1]=picture",
	findanything: "/users/me?populate[entries][populate][course][populate]=picture",
	Cart: "/cart",
	Profile: "/users/me?populate=*",
	Picture: "users/me?populate[picture]=*",
	Course: "/courses?populate=*",
	Entries: "/entries?populate[owner]=*",
	Slip:"tansactions?populate=*",
	EditProfile:"users/me?populate[picture]=*",
};

export default conf;
