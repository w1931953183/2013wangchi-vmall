function setCookie(e,o,t){t=(new Date).getTime()-288e5+1e3*t;document.cookie=`${e}=${o};expires=${new Date(t)}`}function getCookie(e){for(var o=document.cookie.split("; "),t=0;t<o.length;t++){var i=o[t].split("=");if(e==i[0])return i[1]}}function delCookie(e){setCookie(e,1,-1)}