import CryptoJS from "crypto-js";
import { Base64 } from 'js-base64';
const key = CryptoJS.enc.Utf8.parse('826913297a42acb5872029a7ff30d96c');
const iv = CryptoJS.enc.Utf8.parse('1587223466855609');

function aesEncrypt(message){
	var ciphertext = CryptoJS.AES.encrypt(message, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding:CryptoJS.pad.Pkcs7
 	});
	return ciphertext;

}

function aesDecrypt(ciphertext){
	var decrypted = CryptoJS.AES.decrypt(ciphertext,key,{
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7
        });
	return decrypted.toString(CryptoJS.enc.Utf8);//WordArray对象转utf8字符串
}

function base64dec(str) {
        return Base64.decode(str)
}

function base64enc(str) {
        return Base64.encode(str)
}

function enc(data) {
        if(typeof data == 'object') {
                data = JSON.stringify(data)
        }
        let str = aesEncrypt(data);
        return base64enc(str)
}

function dec(data) {
        return aesDecrypt(base64dec(data));
}


export default {
        enc,
        dec,
        base64dec,
        base64enc,
        aesDecrypt,
        aesEncrypt
}
