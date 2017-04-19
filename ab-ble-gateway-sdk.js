module.exports ={
		decode:(indata)=>{
			const outdata={
					header:"",
					payload:[	
						{
							type:'',
							mac:'',
							rssi:'',	
							rawdata:''
						}
						]
				};
			
							hexdata=indata.toString('hex');
							p=hexdata.split('0d0a0d0a');
							outdata.header=JSON.parse(new Buffer(p[0],'hex').toString());
							s=p[1].split('0d0a');
							outdata.payload.pop();
							for (i in s) {		
								r=s[i];
								recode={};
								if(r==""){	
									continue;
								}
								recode.type=r.slice(4,6);
								recode.mac=r.slice(6,18);
								recode.rssi=r.slice(18,20);
								recode.rawdata=r.slice(20,r.length);
								outdata.payload.push(recode);
							}
			
			return outdata;
		},
		server:()=>{
			const http =require('http');	
			const formidable = require("formidable");
			const fs=require('fs')
			var server= http.createServer((req,res)=>{
				if(req.method=="GET"){
					return res.end('ab-ble-gateway-nodejs');
				}
				if(req.method=="POST"){	
					var form = new formidable.IncomingForm();
					form.uploadDir="/tmp";
					form.parse(req,function(err,fields,files){
						tmpfiledir=files.chunk.path;
						fs.readFile(tmpfiledir,(err,data)=>{
							console.log(module.exports.decode(data));
						})	
					})
					return res.end('ab-ble-gateway-nodejs');
		
				}
			});
			server.listen(8080);
			
		}
}
