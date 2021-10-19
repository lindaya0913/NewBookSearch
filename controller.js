window.onload = function () {
    var formData = $('#searchform').serializeArray();
    console.log("formData", formData)

    let month = {'2021/4':'resource/04.json','2021/5':'resource/05.json','2021/6':'resource/06.json',
                 '2021/7':'resource/07.json','2021/8':'resource/08.json','2021/9':'resource/09.json'};

    let url = '';
    for(key in month){
        if(formData[0].value == key){
            url = month[key];
        }
    }
    console.log("url", url)

    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            var list = document.querySelector(".list");
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
            list.innerHTML = str;
        }
    }
}