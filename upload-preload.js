import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

function isExist( path ) {
	try {
		fs.accessSync( path );
		return true;
	} catch ( error ) {
		return false;
	}
}

const configPath = path.resolve( __dirname, "ali-oss.config.json" );
if ( !isExist( configPath ) ) {
	fs.writeFileSync( configPath, JSON.stringify( {
		region: "Oss-cn-hangzhou",
		accessKeyId: "",
		accessKeySecret: "",
		bucket: "",
		stsToken: "",
		endpoint: "",
		internal: false,
		cname: false,
		isRequestPay: false,
		secure: true,
		timeout: 60000
	}, undefined, 2 ) )
	console.log( "/ali-oss.config.json 已创建，请修改其中的内容并再次尝试上传" );
	process.exit( 0 );
}