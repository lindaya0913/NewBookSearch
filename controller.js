window.onload = function () {
    var formData = $('#searchform').serializeArray();
    console.log("formData", formData)
    let url = "09.json";
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            var el = document.querySelector(".list");
            var str = ''; 
            x = 0;
            for (var i = 0; i < json.length; i++) {
                if(formData[1].value != 'All' & formData[2].value != 'All'){
                    if(json[i].Column1 == formData[1].value & json[i].Column4 == formData[2].value){
                        var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                        str += content;
                        x++;
                    }else{
                        continue
                    }
                }else if(formData[1].value != 'All'){
                    if(json[i].Column1 == formData[1].value){
                        var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                        str += content;
                        x++;
                    }else{
                        continue
                    }
                }else if(formData[2].value != 'All'){
                    if(json[i].Column4 == formData[2].value){
                        var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                        str += content;
                        x++;
                    }else{
                        continue
                    }
                }else{
                    var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                    str += content;
                    x++;
                }
            }

            if(str == ''){
                str += "<h4>無新到館藏!!</h4>"
            }

            console.log('x', x)
            el.innerHTML = str;
        }
    }
}