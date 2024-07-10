import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import AliOss from "ali-oss";

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

const config = JSON.parse( fs.readFileSync( path.resolve( __dirname, "./ali-oss.config.json" ), "utf-8" ) );
const oss = new AliOss( config );

( async () => {
	const result = await oss.listV2( {
		prefix: "",
		"max-keys": 1000,
		"fetch-owner": false,
		"continuation-token": ""
	} );
	console.log( "正在删除线上原文件" );
	await Promise.all( result.objects.map( async v => {
		try {
			await oss.delete( v.name )
		} catch ( error ) {
			error.failObjectName = v.name;
			return error;
		}
	} ) );
	
	console.log( "正在上传新静态文件" );
	const distFileList = await getDirFileList( `dist` );
	// 上传 dist 文件
	await Promise.all( distFileList.map( async file => {
		return oss.put( file.name, file.path );
	} ) );
} )();

function getFileType( filePath ) {
	return new Promise( resolve => {
		fs.stat( filePath, ( error, stats ) => {
			if ( error ) {
				return resolve( null );
			}
			resolve( stats.isFile() ? "file" : "directory" );
		} );
	} );
}


function getDirFiles( dirPath ) {
	return new Promise( resolve => {
		fs.readdir( dirPath, ( res, data ) => {
			if ( res ) {
				return resolve( [] );
			}
			resolve( data );
		} )
	} );
}

/** 获取目录内的全部文件绝对路径 */
async function getDirFileList( basePath, fileName = "" ) {
	const targetPath = [ basePath, fileName ].join( path.sep );
	const filePath = path.resolve( process.cwd(), targetPath );
	const fileType = await getFileType( filePath );
	if ( !fileType ) {
		return [];
	}
	if ( fileType === "directory" ) {
		const dirFiles = await getDirFiles( filePath );
		const fileList = await Promise.all( dirFiles.map( async file => {
			return await getDirFileList( basePath, fileName ? [ fileName, file ].join( "/" ) : file );
		} ) );
		// @ts-ignore
		return fileList.flat( Infinity );
	} else {
		return [ { path: filePath, name: fileName } ];
	}
}