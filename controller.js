window.onload = function () {
    var formData = $('#searchform').serializeArray();
    // console.log("formData", formData)

    var Today = new Date();
    var Tyear = Today.getFullYear(); 
    var Tmonth = Today.getMonth(); 
    var Oyear = Today.getFullYear() - 1; 
    var outstr = {}; 
    j = Tmonth; 
    if(Tmonth < 10){
        j = "0" + j; 
    }else{ 
        j = "" + j; 
    } 
    outstr['All'] = "resource/" + j + ".json"; 

    // Determine whether this month is within May, if it is an option, it needs to be pushed back to last year.
    if (Tmonth <= 5){
        // This year
        for(i = Tmonth - 1; i > 0; i--) { 
            j = i; 
            if(j < 10) { 
                j = "0" + j; 
            } else { 
                j = "" + j; 
            } 
            jj = Tyear + "/" + j; 
            outstr[jj] = "resource/" + j + ".json";
        } 
        // Last year
        for(i = 12; i > (12 + (Tmonth - 6)); i--){ 
            j = i; 
            if(j < 10) { 
                j = "0" + j; 
            } else { 
                j = "" + j; 
            } 
            jj = Oyear + "/" + j; 
            outstr[jj] = "resource/" + j + ".json"; 
        } 
    }else{
        for(i = Tmonth - 1; i >= (Tmonth - 5); i--) { 
            j = i; 
            if(j < 10) { 
                j = "0" + j; 
            } else { 
                j = "" + j; 
            } 
            jj = Tyear + "/" + j; 
            outstr[jj] = "resource/" + j + ".json";
        } 
    }

    let url = '';
    for(key in outstr){
        if(formData[0].value == key){
            url = outstr[key];
        }
    }
    // console.log("url", url)

    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            var list = document.querySelector(".list");
            var str = ''; 
            for (var i = 0; i < json.length; i++) {
                if(formData[1].value != 'All' & formData[2].value != 'All'){
                    if(json[i].Column1 == formData[1].value & json[i].Column4 == formData[2].value){
                        var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                        str += content;
                    }else{
                        continue
                    }
                }else if(formData[1].value != 'All'){
                    if(json[i].Column1 == formData[1].value){
                        var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                        str += content;
                    }else{
                        continue
                    }
                }else if(formData[2].value != 'All'){
                    if(json[i].Column4 == formData[2].value){
                        var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                        str += content;
                    }else{
                        continue
                    }
                }else{
                    var content = "<li><a href='https://nthu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" + json[i].Column2 + "&context=L&vid=886UST_NTHU:886UST_NTHU' target='_blank'>" + json[i].Column3 + "</a></li>";
                    str += content;
                }
            }

            if(str == ''){
                str += "<h4>無新到館藏!!</h4>"
            }

            list.innerHTML = str;
        }
    }
}