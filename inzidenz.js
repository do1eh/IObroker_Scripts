const request = require('request');

const link = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,cases7_per_100k,last_update&geometry=6.609%2C51.049%2C7.023%2C51.351&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelContains&returnGeometry=false&outSR=4326&f=json';
 
 on({id: "0_userdata.0.inzidenztelegram"/*inzidenz*/, val: true}, async function (obj) {
  
        request(link, function(error,response, body) {
        if(error) console.log('Fehler request: ' + error, 'error');

        else {

            var obj = JSON.parse(body);
            var inzidenz=obj['features'][0]['attributes']['cases7_per_100k'];
            var text="Inzidenzwert in Düsseldorf: "+inzidenz.toFixed(1);
            text=text.replace('.',',');
            console.log(text);
            sendTo("telegram.0", "send", {text: text});
            setState("0_userdata.0.inzidenztelegram", false);
            
        }    
    
    });
 
});
