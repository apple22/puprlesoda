function includeHTML(callback) {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    var elementsToProcess = [];
    
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            elementsToProcess.push(elmnt);
        }
    }
    
    function processElement(index) {
        if (index >= elementsToProcess.length) {
            if (typeof callback === 'function') callback();
            return;
        }
        
        elmnt = elementsToProcess[index];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = this.responseText;
                    if (elmnt.parentNode) {
                        while (tempDiv.firstChild) {
                            elmnt.parentNode.insertBefore(tempDiv.firstChild, elmnt);
                        }
                        elmnt.parentNode.removeChild(elmnt);
                        executeScripts(tempDiv);
                        processElement(index + 1); // 다음 요소 처리
                    }
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
        }
    }
    
    processElement(0); // 첫 번째 요소부터 처리 시작
}

function executeScripts(element) {
    var scripts = element.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script");
        script.type = scripts[i].type || "text/javascript";
        if (scripts[i].src) {
            script.src = scripts[i].src;
            script.onload = function() {
                // Script has been loaded and executed
            };
            document.head.appendChild(script);
        } else {
            script.text = scripts[i].innerHTML;
            document.head.appendChild(script);
        }
        document.head.removeChild(script);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    includeHTML(function() {
        // includeHTML이 완료된 후에 activateMenuAndBreadcrumb 호출
        // 페이지에 설정된 전역 변수를 사용
        activateMenuAndBreadcrumb(P_dp1, P_dp2);
    });
});