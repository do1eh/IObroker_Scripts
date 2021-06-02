var url;
var request;

request = require('request'),
url = "https://www.hochwasser-rlp.de/karte/einzelpegel/flussgebiet/rhein/teilgebiet/niederrhein/pegel/DUESSELDORF"; 
 
 on({id: "0_userdata.0.pegeltelegram"/*Pegelabfragen*/, val: true}, async function (obj) {
  
request({url : url}, function (error, response, body) {
        
        var start=body.search("Letzter");
        var steigend=body.search("steigend");
        var fallend=body.search("fallend");
        var tendenz="Tendenz ";
        if (steigend>0 && fallend<0)
        {
           tendenz+=" steigend";
        }
        else if (steigend<0 && fallend>0)
        {
           tendenz+=" fallend";
        } else if (steigend>0 && fallend>0)
        {
            if (steigend<fallend)
            {
                tendenz+=" steigend"; 
            }
            else
            {
               tendenz+=" fallend";
            }
        }
        if (tendenz.length==8)
        {
            tendenz="";
        }

        var pegel = body.substr(start+65,1)+","+body.substr(start+66,3);
        var uhrzeit=body.substr(start+38,2)+":"+body.substr(start+41,2);
        
        var text="Rheinpegel um "+uhrzeit+" Uhr: "+pegel+"m "+tendenz;
        
        console.log(text);
        sendTo("telegram.0", "send", {text: text});
       
});
 setState("0_userdata.0.Pegelabfragen", false);
 
});
