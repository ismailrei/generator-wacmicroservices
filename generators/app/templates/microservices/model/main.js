var querystring = require('querystring');   
   	http = require("http"),
   	fs=require("fs"),
   	m=require("./libs/functions");
       
var model=require('../../../devis/devis');

       var options,
        
            cookie;

        model.add({role:"model",action:"Initialise"},(args,done)=>{
            options=args.options;
            done(null,{res:options})
                    });
        model.add({role:"model",action:"PUT"},(args,done)=>{//for update
            if(args.table) options['link']=options['path']+"/"+args.table;
            m.Post(options,args.Add,done);
            });

        model.add({role:"model",action:"GET"},(args,done)=>{//for query(FOR TEST ONLY)
            var res="",
                toReplace=["[","]"],
                transmission={Response:"",stric:{result:false}};

            if(args.conditions) res=m.Conditions(args.conditions);

            m.GET(m.Link(options,args.table+"/?$asArray=true"+res),toReplace,done,transmission);
            
        });

        model.add({role:"model",action:"DELETE"},(args,done)=>{//for update
           
           m.GET(m.Link(options,args.table+"/?$filter=\"ID="+args.ID+"\"&"+options.delete),"undefined",done,{Response:"Success"});
        });
        
        model.add({role:"model",action:"POST"},(args,done)=>{
            args.table?options['link']=options['path']+"/"+args.table:
                      (options["link"]=args.link);
                      
            m.Post(options,args.Add,done,args.opt);
        });

module.exports=model;