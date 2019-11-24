"use strict";var date1,date2,place1,place2,long1,long2,lat1,lat2,tz1,tz2,tipsEnabled,tips,highPrecCalInTips,rotate1=0,rotate2=0,starsLoc=[],brightestStarsLoc=[],conLabelLoc=[];starsLoc[0]=brightStars(),starsLoc[1]=brightStars(),brightestStarsLoc[0]=brightestStars(),brightestStarsLoc[1]=brightestStars(),conLabelLoc[0]=constellationLabel(),conLabelLoc[1]=constellationLabel();var magLimit=5.3,magLimitTip=5.3,milkyLoc=[];function init(){init_cont()}function init_cont(){var t=new Date,a=$("#long1").text(),e=$("#lat1").text();""!=a&&""!=e?(place1=$("#place1").text(),long1=parseFloat(a),lat1=parseFloat(e)):(place1="Champaign, IL, USA",long1=-88.2434,lat1=40.1164);var r="GMT",n=t.getTimezoneOffset(),o=t.toTimeString(),i=o.indexOf("GMT");-1!=i&&(r=o.slice(i+3)),tz1={tz:n,tzString:r},place2="",long2=long1,lat2=-30,lat1<0&&(lat2=30),tz2={tz:tz1.tz,tzString:tz1.tzString};var d=t.getFullYear(),s=t.getMonth()+1,l=t.getDate(),c=t.getHours(),p=t.getMinutes(),h=t.getSeconds()+.001*t.getMilliseconds(),g=generateDateString(d,s,l),u=generateTimeString(c,p,h),m=getDm(d,s,l,tz1.tz)+(c+p/60+h/3600)/24,v=m/36525,M=DeltaT(v),f=getGMST(date1={yyyy:d,mm:s,dd:l,h:c,m:p,s:h,tz:tz1.tz,tzString:tz1.tzString,dateString:g,timeString:u,D:m,T:v,dT:M}),y=getSidereal(f,long1);date1.LST=y.hour,date1.LST_rad=y.rad,date1.LSTstring=y.string;var S=(c+=(tz1.tz-tz2.tz)/60)+p/60+h/3600;S-=24*Math.floor(c/24);var T=CalDat(m+tz2.tz/1440);h=3600*(S-(c=Math.floor(S))-(p=Math.floor(60*(S-c)))/60),u=generateTimeString(c,p,h),y=getSidereal(f=getGMST(date2={yyyy:T.yy,mm:T.mm,dd:T.dd,h:c,m:p,s:h,tz:tz2.tz,tzString:tz2.tzString,dateString:T.dateString,timeString:u,D:m,T:v,dT:M}),long2),date2.LST=y.hour,date2.LST_rad=y.rad,date2.LSTstring=y.string,tipsEnabled=!0,tips=[[],[]],highPrecCalInTips=!0,$("#loc1").on("click",function(t){displayPopup(t,1)}),$("#loc2").on("click",function(t){displayPopup(t,2)}),$("#rotate1").val(180*rotate1/Math.PI),$("#rotate2").val(180*rotate1/Math.PI),starChart()}function displayChangeLocs(){$("button.menu").attr("disabled",!0),$("#inputlocs").slideDown(),$("#geolocmessage").empty(),$("#geolocerr").empty(),$("#place1in").val(place1),$("#long1in").val(long1),$("#lat1in").val(lat1),$("#year1in").val(date1.yyyy),$("#month1in").val(date1.mm),$("#day1in").val(date1.dd),$("#hour1in").val(date1.h),$("#minute1in").val(date1.m),$("#second1in").val(date1.s.toFixed(3)),$("#tz1in").val(-tz1.tz/60),$("#place2in").val(place2),$("#long2in").val(long2),$("#lat2in").val(lat2),$("#year2in").val(date2.yyyy),$("#month2in").val(date2.mm),$("#day2in").val(date2.dd),$("#hour2in").val(date2.h),$("#minute2in").val(date2.m),$("#second2in").val(date2.s.toFixed(3)),$("#tz2in").val(-tz2.tz/60),$("#synTimeYes").prop("checked",!0),$("#synTimeNo").prop("checked",!1),$(".timeInputLoc2").hide()}function geoloc(){$("#geolocmessage").append("Please wait..."),"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(t){var a=t.coords.longitude,e=t.coords.latitude;$("#place1in").val(""),$("#long1in").val(a),$("#lat1in").val(e),$("#geolocmessage").empty();$("#geolocmessage").append("Success! Longitude and latitude have been entered.")},function(t){ipLookUp()}):ipLookUp()}function ipLookUp(){$.ajax({url:"http://ip-api.com/json",success:function(t){var a=t.city;""!=t.region&&(a+=", "+t.region),a+=", "+t.countryCode,$("#place1in").text(a),$("#long1in").text(t.lon),$("#lat1in").text(t.lat),$("#geolocmessage").empty();$("#geolocmessage").append("Success! Longitude and latitude have been entered.")},timeout:1e3,error:function(t,a,e){$("#geolocmessage").empty();$("#geolocerr").append("Unable to determine your location by GPS or IP address!")}})}function changeSyncTime(t,a){var e="#"+a+"Yes",r="#"+a+"No";0==t?($(e).prop("checked",!1),$(r).prop("checked",!0),$(".timeInputLoc2").show()):($(e).prop("checked",!0),$(r).prop("checked",!1),$(".timeInputLoc2").hide())}function changeLocationsAndTimes(t){place1=t.place1in.value,long1=parseFloat(t.long1in.value),lat1=parseFloat(t.lat1in.value);var a=parseFloat(t.tz1in.value);tz1.tz=60*-a;var e=Math.abs(a)+.5/60;tz1.tzString=a>=0?"+":"-";var r=Math.floor(e).toString();r.length<2&&(r="0"+r);var n=Math.floor(60*(e-Math.floor(e))).toString();n.length<2&&(n="0"+n),tz1.tzString+=r+n;var o=parseInt(t.year1in.value),i=parseInt(t.month1in.value),d=parseInt(t.day1in.value),s=parseInt(t.hour1in.value),l=parseInt(t.minute1in.value),c=parseFloat(t.second1in.value);place2=t.place2in.value,long2=parseFloat(t.long2in.value),lat2=parseFloat(t.lat2in.value);var p=parseFloat(t.tz2in.value);tz2.tz=60*-p,e=Math.abs(p)+.5/60,tz2.tzString=p>=0?"+":"-",(r=Math.floor(e).toString()).length<2&&(r="0"+r),(n=Math.floor(60*(e-Math.floor(e))).toString()).length<2&&(n="0"+n),tz2.tzString+=r+n;var h,g,u,m,v,M,f=document.getElementById("synTimeYes").checked;f?(h=o,g=i,u=d,m=s,v=l,M=c):(h=parseInt(t.year2in.value),g=parseInt(t.month2in.value),u=parseInt(t.day2in.value),m=parseInt(t.hour2in.value),v=parseInt(t.minute2in.value),M=parseFloat(t.second2in.value));var y="#errorlocs";$(y).empty();var S=-180,T=180,b="Invalid longitude! Longitude must be a number between -180 and 180. West of Greenwich is negative; east of Greenwich is positive.";if(sanityCheck(long1,"#long1in",S,T,b,y),sanityCheck(long2,"#long2in",S,T,b,y),S=-90,T=90,b="Invalid latitude! Latitude must be a number between -90 and 90, positive in the northern hemisphere and negative in the southern hemisphere.",sanityCheck(lat1,"#lat1in",S,T,b,y),sanityCheck(lat2,"#lat2in",S,T,b,y),b="Invalid year! Please enter an integer between "+(S=-2e5)+" and "+(T=2e5)+". Note that 0 means 1 BCE, -1 means 2 BCE and so on. Warning: positions of the Sun, Moon and planets are not accurate outside the years between -3000 and 3000.",sanityCheck(o,"#year1in",S,T,b,y),f||sanityCheck(h,"#year2in",S,T,b,y),S=1,T=12,b="Invalid month! Month must be an integer between 1 and 12.",sanityCheck(i,"#month1in",S,T,b,y),f||sanityCheck(g,"#month2in",S,T,b,y),S=1,T=31,b="Invalid day! Day must be an integer between 1 and 31.",sanityCheck(d,"#day1in",S,T,b,y),f||sanityCheck(u,"#day2in",S,T,b,y),S=0,T=23,b="Invalid hour! Hour must be an integer between 0 and 23.",sanityCheck(s,"#hour1in",S,T,b,y),f||sanityCheck(m,"#hour2in",S,T,b,y),S=0,T=59,b="Invalid minute! Minute must be an integer between 0 and 59.",sanityCheck(l,"#minute1in",S,T,b,y),f||sanityCheck(v,"#minute2in",S,T,b,y),S=0,T=60,b="Invalid second! Second must be a number between 0 and 60.",sanityCheck(c,"#second1in",S,T,b,y),f||sanityCheck(M,"#second2in",S,T,b,y),S=-12,T=14,b="Invalid time zone! Time zone must be a number between -12 and 14.",sanityCheck(a,"#tz1in",S,T,b,y),sanityCheck(p,"#tz2in",S,T,b,y),""==$(y).text()){$("#inputlocs").slideUp(),$("button.menu").attr("disabled",!1);var x=getDm(o,i,d,0),L=CalDat(x);o=L.yy,i=L.mm,d=L.dd;var P=L.dateString,z=generateTimeString(s,l,c),A=(x=getDm(o,i,d,tz1.tz)+(s+l/60+c/3600)/24)/36525,C=DeltaT(A),_=getGMST(date1={yyyy:o,mm:i,dd:d,h:s,m:l,s:c,tz:tz1.tz,tzString:tz1.tzString,dateString:P,timeString:z,D:x,T:A,dT:C}),w=getSidereal(_,long1);date1.LST=w.hour,date1.LST_rad=w.rad,date1.LSTstring=w.string,x=getDm(h,g,u,0),h=(L=CalDat(x)).yy,g=L.mm,u=L.dd,P=L.dateString,z=generateTimeString(m,v,M),A=(x=getDm(h,g,u,tz2.tz)+(m+v/60+M/3600)/24)/36525,C=DeltaT(A),w=getSidereal(_=getGMST(date2={yyyy:h,mm:g,dd:u,h:m,m:v,s:M,tz:tz2.tz,tzString:tz1.tzString,dateString:P,timeString:z,D:x,T:A,dT:C}),long2),date2.LST=w.hour,date2.LST_rad=w.rad,date2.LSTstring=w.string,starChart()}}function showHide(t,a){var e=t.toString();$("#show"+a+e).toggleClass("active"),starChartLoc(t)}function rotInput(t){var a=t.toString(),e="#rotate"+a,r="#errRotate"+a;$(r).empty();var n=parseInt($(e).val());if($(e).css("background-color","transparent"),isNaN(n)){$(e).css("background-color","#e2a8a8");$(r).append('<p style="color:red;">Invalid input! Please enter an integer.</p>')}""==$(r).text()&&(n-=360*Math.floor(n/360),$(e).val(n),1==t?rotate1=n*Math.PI/180:rotate2=n*Math.PI/180,starChartLoc(t))}function getGMST(t){var a=Math.floor(t.D-.5)+.5,e=t.h+t.m/60+t.s/3600+t.tz/60;e-=24*Math.floor(e/24);var r=.06570748587250752*a;r-=24*Math.floor(r/24),r+=6.697374558336001+1.0027378119113546*e,r-=24*Math.floor(r/24);var n=t.T+t.dT;return r+=n*(.08541030618518518+2577003148148148e-20*n)+2.686296296296296e-7,r-=24*Math.floor(r/24)}function getSidereal(t,a){var e=t+a/15,r=(e-=24*Math.floor(e/24))*Math.PI/12,n=e+.5/3600,o=Math.floor(n).toString(),i=Math.floor(60*(n-o)).toString(),d=Math.floor(3600*(n-o-i/60)).toString();return o.length<2&&(o="0"+o),i.length<2&&(i="0"+i),d.length<2&&(d="0"+d),{hour:e,rad:r,string:o+":"+i+":"+d}}function starChart(){var t=date1.dateString+"&nbsp;&nbsp;"+date1.timeString+"  GMT"+tz1.tzString,a=date2.dateString+"&nbsp;&nbsp;"+date2.timeString+" GMT"+tz2.tzString;$("#place1").text(place1),$("#long1").html(long1+"&deg;"),$("#lat1").html(lat1+"&deg;"),$("#time1").html(t),$("#siderealTime1").text(date1.LSTstring),$("#place2").text(place2),$("#long2").html(long2+"&deg;"),$("#lat2").html(lat2+"&deg;"),$("#time2").html(a),$("#siderealTime2").text(date2.LSTstring);var e=setupDrawingParameters();starChartLoc(1),starChartLoc(2),addLegend(e)}function starChartLoc(t){var a,e,r;1==t?(a=date1,e=lat1):(a=date2,e=lat2);var n=e*Math.PI/180,o=t.toString(),i=document.getElementById("loc"+o);Math.abs(a.yyyy)>3e3&&""==$("#warning"+o).text()&&$("#warning"+o).append('<p style="color:red;">Warning: Positions of the Sun, Moon and planets are not accurate at this time.</p>'),Math.abs(a.yyyy)<3e3&&""!=$("#warning"+o).text()&&$("#warning"+o).empty();a.T;var d=a.T+a.dT,s=setupDrawingParameters();s.loc=t,s.rotate=rotate1,2==t&&(s.rotate=rotate2),s.cosRotAng=Math.cos(s.rotate),s.sinRotAng=Math.sin(s.rotate);var l={milky:{}};if(s.showPlanets=$("#showPlanets"+o).hasClass("active"),s.showEquator=$("#showEquator"+o).hasClass("active"),s.showEcliptic=$("#showEcliptic"+o).hasClass("active"),s.showMilkyWay=$("#showMilkyWay"+o).hasClass("active"),s.showConLines=$("#showConLines"+o).hasClass("active"),s.showConLab=$("#showConLab"+o).hasClass("active"),s.showDayNight=$("#showDayNight"+o).hasClass("active"),s.showEcliptic&&(Math.abs(d)<1?s.eclipticNorthPoleDec=1.16170371649804:s.eclipticNorthPoleDec=.5*Math.PI-epsA(d)),s.showMilkyWay){l.milky.north=milkyLoc[t-1].northernEdge,l.milky.south=milkyLoc[t-1].southernEdge,l.milky.betaCas=milkyLoc[t-1].betaCas,l.milky.thetaOph=milkyLoc[t-1].thetaOph,l.milky.lambdaSco=milkyLoc[t-1].lambdaSco,l.milky.coalsack=milkyLoc[t-1].coalsack,r=l.milky.north[0].Tepoch,Math.abs(d-r)>.1&&milkyWayBoundaryPrecession(l.milky,r,d);var c=galacticNorthPole(d);s.galPoleRa=c.ra,s.galPoleDec=c.dec}if(l.conLines=constellationLines(),s.showConLab&&(l.conLab=conLabelLoc[t-1],r=l.conLab[0].Tepoch,Math.abs(d-r)>.1)){var p=precession_matrix(r,d-r);addPrecession(l.conLab,p,d);for(var h=1;h<l.conLab.length;h++)if("ra2"in l.conLab[h]){var g=precessed_ra_dec(l.conLab[h].ra2,l.conLab[h].dec2,p);l.conLab[h].ra2=g.ra,l.conLab[h].dec2=g.dec}}l.stars=starsLoc[t-1],r=l.stars[0].Tepoch,Math.abs(d-r)>.1&&recomputeStarPos(d,l.stars),s.showPlanets?l.planets=sunMoonPlanets(d):(l.planets=[],l.planets[0]=MiniSun(d)),drawStarsPlanets(i,l,s,a.LST_rad,n)}function drawStarsPlanets(t,a,e,r,n){var o=t.getContext("2d");o.clearRect(0,0,t.width,t.height);var i=Math.cos(n),d=Math.sin(n),s=.5*Math.PI,l=2*Math.PI,c=.47*Math.max(t.width,t.height),p=.5*t.width,h=.5*t.height,g={ra:a.planets[0].ra,dec:a.planets[0].dec},u=180*ra_dec_to_alt_az(g,r,i,d).alt/Math.PI;o.beginPath(),o.setLineDash([]),o.arc(p,h,c,0,2*Math.PI);var m=255,v=255;e.showDayNight&&(m=Math.round(255*(1+u/18)),m=Math.min(m,255),m=Math.max(0,m),v=Math.round(.95*m)),o.fillStyle="rgb("+v+","+v+","+m+")",o.fill(),o.strokeStyle="black",o.stroke();var M,f,y,S,T,b,x={halfPI:s,xc:p,yc:h,r:c,r2:c*c,altSun:u,rotate:e.rotate,cosRotAng:e.cosRotAng,sinRotAng:e.sinRotAng};if(drawAzimuthLabels(o,x),e.showEquator){var L="black";m<170&&(L="yellow"),drawCircle(o,r,i,d,{ra:0,dec:s,linestyle:[],color:L},x)}if(e.showEcliptic){var P="brown";m<170&&(P="yellow"),drawCircle(o,r,i,d,{ra:-.5*Math.PI,dec:e.eclipticNorthPoleDec,linestyle:[10,15],color:P},x)}e.showMilkyWay&&(drawMilkyWay(o,r,a.milky,i,d,x,e),drawCircle(o,r,i,d,{ra:e.galPoleRa,dec:e.galPoleDec,linestyle:[14,15],color:"magenta"},x)),(e.showConLines||tipsEnabled)&&(tipsEnabled&&((M=new Array(a.stars.length)).fill(!0),tips[e.loc-1].length=0),drawConstellationLinesAndSetupTips(o,a.conLines,a.stars,r,i,d,x,e,M));var z=a.stars.length;for(o.fillStyle=m<170?"white":"black",f=1;f<z;f++)a.stars[f].mag>magLimit||(b=ra_dec_to_xy_above(a.stars[f],r,i,d,x)).x>-998&&(T=e.starMagA*a.stars[f].mag+e.starMagB,T=Math.max(T,1),o.beginPath(),o.arc(b.x,b.y,T,0,l),o.fill(),tipsEnabled&&a.stars[f].mag<magLimitTip&&M[f]&&(M[f]=!1,T=Math.max(T,3),tips[e.loc-1].push({x:b.x,y:b.y,r2:T*T,object:"star",starInd:f})));if(tipsEnabled&&(M.length=0),e.showPlanets)for(o.font="20px Arial",f=0;f<9;f++){if(g={ra:a.planets[f].ra,dec:a.planets[f].dec},1==f){var A=topoCentricEquatorial(a.planets[f].rGeo,g.ra,g.dec,r,d,i);g={ra:A.raTopo,dec:A.decTopo}}if((b=ra_dec_to_xy_above(g,r,i,d,x)).x>-998){y=b.x,S=b.y;var C=String.fromCharCode(e.code[f]);o.fillStyle=e.color[f],o.fillText(C,y+e.offset[f].x,S+e.offset[f].y),o.beginPath(),o.arc(y,S,e.size[f],0,l),o.fill(),tipsEnabled&&(T=.5*o.measureText(C).width,T=Math.max(T,10),tips[e.loc-1].push({x:y+e.offset[f].x+T,y:S+e.offset[f].y-10,r2:T*T,object:e.pName[f],pIndex:f}))}}e.showConLab&&drawConstellationLabel(o,a.conLab,r,i,d,x,e)}function drawAzimuthLabels(t,a){var e=10*Math.PI/180,r=180*a.rotate/Math.PI;t.font="15px Arial",t.txtAlign="center",t.fillStyle="black";for(var n=0;n<36;n++){var o=10*n-r;o-=360*Math.floor(o/360);var i,d,s=n*e-a.rotate,l=Math.cos(s),c=Math.sin(s),p=a.xc-a.r*c,h=a.yc-a.r*l,g=a.xc-1.02*a.r*c,u=a.yc-1.02*a.r*l;o<90||o>270?(i=a.xc-1.03*a.r*c,d=a.yc-1.03*a.r*l):(i=a.xc-1.06*a.r*c,d=a.yc-1.06*a.r*l),t.beginPath(),t.moveTo(p,h),t.lineTo(g,u),t.stroke();var m=10*n,v=m+String.fromCharCode(176);0==m?v="N":90==m?v="E":180==m?v="S":270==m&&(v="W"),t.save(),t.translate(i,d),o<90||o>270?t.rotate(-s):t.rotate(Math.PI-s);var M=t.measureText(v).width;t.fillText(v,.5*-M,0),t.restore()}t.txtAlign="start"}function ra_dec_to_alt_az(t,a,e,r){var n=a-t.ra,o=Math.cos(n),i=Math.sin(n),d=Math.cos(t.dec),s=Math.sin(t.dec),l=s*r+e*d*o;l=Math.asin(l);var c=Math.cos(l),p=d*i/c,h=(d*o*r-s*e)/c;return Math.abs(c)<1e-10&&(p=0,h=1),{alt:l,cosA:h,sinA:p}}function atmosphericRefraction(t,a,e){var r=t+.003137559423803098/(t+.08918632477691024);return.000296705972839036*(2.80198*a/e)/Math.tan(r)}function ra_dec_to_xy_above(t,a,e,r,n){var o=a-t.ra,i=Math.cos(o),d=Math.sin(o),s=Math.cos(t.dec),l=Math.sin(t.dec),c=l*r+e*s*i;c=Math.asin(c);var p,h,g=Math.cos(c),u=s*d/g,m=(s*i*r-l*e)/g,v=u*n.cosRotAng-m*n.sinRotAng,M=m*n.cosRotAng+u*n.sinRotAng;if(Math.abs(g)<1e-10&&(v=0,M=1),c>-.0175&&(c+=atmosphericRefraction(c,101,286)),c>=0){var f=n.r*Math.tan(.5*(n.halfPI-c));p=n.xc+f*v,h=n.yc+f*M}else p=-999,h=-999;return{x:p,y:h}}function ra_dec_to_xy(t,a,e,r,n){var o=a-t.ra,i=Math.cos(o),d=Math.sin(o),s=Math.cos(t.dec),l=Math.sin(t.dec),c=l*r+e*s*i;c=Math.asin(c);var p=Math.cos(c),h=s*d/p,g=(s*i*r-l*e)/p,u=h*n.cosRotAng-g*n.sinRotAng,m=g*n.cosRotAng+h*n.sinRotAng;Math.abs(p)<1e-10&&(u=0,m=1),c>-.0175&&(c+=atmosphericRefraction(c,101,286));var v=n.r*Math.tan(.5*(n.halfPI-c));return{x:n.xc+v*u,y:n.yc+v*m}}function topoCentricEquatorial(t,a,e,r,n,o){var i=t*Math.cos(a)*Math.cos(e),d=t*Math.sin(a)*Math.cos(e),s=t*Math.sin(e),l=.9933056020041341,c=6378.1366/Math.sqrt(o*o+l*n*n),p=l*c,h=i-c*o*Math.cos(r),g=d-c*o*Math.sin(r),u=s-p*n,m=Math.sqrt(h*h+g*g+u*u);return{rTopo:m,raTopo:Math.atan2(g,h),decTopo:Math.asin(u/m)}}function drawCircle(t,a,e,r,n,o){var i,d,s,l,c,p=!0;if(Math.abs(n.dec-o.halfPI)<1e-5)i=-e,d=0,s=r;else{var h,g=a-n.ra,u=Math.sin(g),m=Math.cos(g),v=Math.sin(n.dec),M=Math.cos(n.dec),f=r*v+e*M*m;Math.abs(Math.abs(f)-1)<1e-5?p=!1:(i=(h=Math.sqrt(1-f*f))*(c=(M*m*r-v*e)/h),d=h*(l=M*u/h),s=f)}if(p){var y=Math.sqrt(i*i+d*d),S=-d/y,T=i/y,b=-s*T,x=s*S,L=y,P=Math.PI/25;t.beginPath(),t.setLineDash(n.linestyle),c=S;var z=(l=T)*o.cosRotAng-c*o.sinRotAng,A=c*o.cosRotAng+l*o.sinRotAng,C=o.xc+o.r*z,_=o.yc+o.r*A;t.moveTo(C,_);for(var $=1;$<25;$++){var w=$*P,I=Math.cos(w),D=Math.sin(w),k=I*S+D*b,R=I*T+D*x,E=D*L,F=Math.sqrt(k*k+R*R);if(F<1e-5)t.lineTo(o.xc,o.yc);else{c=k/F,z=(l=R/F)*o.cosRotAng-c*o.sinRotAng,A=c*o.cosRotAng+l*o.sinRotAng;var G=Math.asin(E),N=o.r*Math.tan(.5*(o.halfPI-G));C=o.xc+N*z,_=o.yc+N*A;t.lineTo(C,_)}}c=-S,z=(l=-T)*o.cosRotAng-c*o.sinRotAng,A=c*o.cosRotAng+l*o.sinRotAng,C=o.xc+o.r*z,_=o.yc+o.r*A,t.lineTo(C,_),t.strokeStyle=n.color,t.stroke()}}function milkyWayBoundaryPrecession(t,a,e){var r=precession_matrix(a,e-a);addPrecession(t.north,r,e),addPrecession(t.south,r,e),addPrecession(t.betaCas,r),addPrecession(t.thetaOph,r,e),addPrecession(t.lambdaSco,r,e),addPrecession(t.coalsack,r,e)}function addPrecession(t,a,e){t[0].epoch="",t[0].Tepoch=e;for(var r=1;r<t.length;r++){var n=precessed_ra_dec(t[r].ra,t[r].dec,a);t[r].ra=n.ra,t[r].dec=n.dec}}function drawMilkyWay(t,a,e,r,n,o,i){i.showDayNight&&o.altSun<-6?t.strokeStyle="yellow":t.strokeStyle="blue",t.setLineDash([]),drawLineAboveHorizon(t,a,e.north,r,n,o),drawLineAboveHorizon(t,a,e.south,r,n,o),drawLineAboveHorizon(t,a,e.betaCas,r,n,o),drawLineAboveHorizon(t,a,e.thetaOph,r,n,o),drawLineAboveHorizon(t,a,e.lambdaSco,r,n,o),drawLineAboveHorizon(t,a,e.coalsack,r,n,o)}function drawLineAboveHorizon(t,a,e,r,n,o){var i,d,s={ra:e[1].ra,dec:e[1].dec},l=ra_dec_to_xy(s,a,r,n,o);i=l.x,d=l.y;for(var c=2;c<e.length;c++)addLine(t,i,d,i=(l=ra_dec_to_xy(s={ra:e[c].ra,dec:e[c].dec},a,r,n,o)).x,d=l.y,o)}function galacticNorthPole(t){var a=precession_matrix(0,t);return precessed_ra_dec(3.366012906575397,.4734787372451951,a)}function drawConstellationLinesAndSetupTips(t,a,e,r,n,o,i,d,s){var l,c,p,h;for(t.strokeStyle="#1B9722",d.showDayNight&&i.altSun<-6&&(t.strokeStyle="#93ff33"),t.setLineDash([]),c=0;c<a.length;c++)$.each(a[c],function(a,c){if("name"!=a&&"abbr"!=a){var g,u,m,v,M={ra:e[c[0]].ra,dec:e[c[0]].dec},f=ra_dec_to_xy(M,r,n,o,i);u=f.x,v=f.y,h=(u-i.xc)*(u-i.xc)+(v-i.yc)*(v-i.yc),tipsEnabled&&s[c[0]]&&h<i.r2&&(l=c[0],s[l]=!1,p=d.starMagA*e[l].mag+d.starMagB,p=Math.max(p,3),tips[d.loc-1].push({x:u,y:v,r2:p*p,object:"star",starInd:l}));for(var y=1;y<c.length;y++)g=u,m=v,u=(f=ra_dec_to_xy(M={ra:e[c[y]].ra,dec:e[c[y]].dec},r,n,o,i)).x,v=f.y,d.showConLines&&addLine(t,g,m,u,v,i),h=(u-i.xc)*(u-i.xc)+(v-i.yc)*(v-i.yc),tipsEnabled&&s[c[y]]&&h<i.r2&&(l=c[y],s[l]=!1,p=d.starMagA*e[l].mag+d.starMagB,p=Math.max(p,3),tips[d.loc-1].push({x:u,y:v,r2:p*p,object:"star",starInd:l}))}})}function drawConstellationLabel(t,a,e,r,n,o,i){t.font=12..toString()+"px Arial";var d=255,s=255;i.showDayNight&&(d=Math.round(255*(1+o.altSun/18)),d=Math.min(d,255),d=Math.max(0,d),s=Math.round(.95*d));var l="orange";d>130&&(l="#6c3483");for(var c="rgb("+s+","+s+","+d+")",p=1;p<a.length;p++){var h={ra:a[p].ra,dec:a[p].dec},g=ra_dec_to_xy_above(h,e,r,n,o);if(g.x>-998){var u=t.measureText(a[p].abbr).width;t.fillStyle=c,t.fillRect(g.x,g.y-12,u,12),t.fillStyle=l,t.fillText(a[p].abbr,g.x,g.y)}"ra2"in a[p]&&(g=ra_dec_to_xy_above(h={ra:a[p].ra2,dec:a[p].dec2},e,r,n,o)).x>-998&&(t.fillStyle=c,t.fillRect(g.x,g.y-12,u,12),t.fillStyle=l,t.fillText(a[p].abbr,g.x,g.y))}}function recomputeStarPos(t,a){var e=a[0].Tepoch,r=t-e;a[0].epoch="",a[0].Tepoch=t;for(var n=precession_matrix(e,r),o=1;o<a.length;o++){var i=a[o].x+a[o].vx*r,d=a[o].y+a[o].vy*r,s=a[o].z+a[o].vz*r,l=Math.sqrt(i*i+d*d+s*s);a[o].dist2000<99e3&&(a[o].mag=a[o].mag2000+5*Math.LOG10E*Math.log(l/a[o].dist2000)),a[o].x=n.p11*i+n.p12*d+n.p13*s,a[o].y=n.p21*i+n.p22*d+n.p23*s,a[o].z=n.p31*i+n.p32*d+n.p33*s;var c=a[o].vx,p=a[o].vy,h=a[o].vz;a[o].vx=n.p11*c+n.p12*p+n.p13*h,a[o].vy=n.p21*c+n.p22*p+n.p23*h,a[o].vz=n.p31*c+n.p32*p+n.p33*h,a[o].ra=Math.atan2(a[o].y,a[o].x),a[o].dec=Math.asin(a[o].z/l)}}function addLine(t,a,e,r,n,o){var i=function(t){return t*t},d=i(a-o.xc)+i(e-o.yc),s=i(r-o.xc)+i(n-o.yc);if(!(d>o.r2&&s>o.r2)){var l=a,c=r,p=e,h=n;if(d>o.r2||s>o.r2){var g,u=(a-o.xc)*(r-o.xc)+(e-o.yc)*(n-o.yc),m=i(a-r)+i(e-n),v=d-u;d<=o.r2?(c=a+(g=(v+Math.sqrt(v*v+m*(o.r2-d)))/m)*(r-a),h=e+g*(n-e)):(l=a+(g=(v-Math.sqrt(v*v+m*(o.r2-d)))/m)*(r-a),p=e+g*(n-e))}t.beginPath(),t.moveTo(l,p),t.lineTo(c,h),t.stroke()}}function addLegend(t){var a,e,r,n,o=document.getElementById("legend"),i=o.getContext("2d");i.clearRect(0,0,o.width,o.height),i.font="20px Arial",i.fillStyle="black",i.fillText("Magnitude scale:",0,20);var d=2*Math.PI;for(a=-1;a<6;a++){e=t.starMagA*a+t.starMagB,r=180+40*(a+1);var s=-20;-1==a&&(s=-22),i.fillText(a.toString(),r+s,20),i.beginPath(),i.arc(r,15,e,0,d),i.fill()}i.fillText("Planet symbols:   Sun",0,50),i.fillText("Moon",270,50),i.fillText("Mercury",380,50),i.fillText("Venus",160,75),i.fillText("Mars",270,75),i.fillText("Jupiter",380,75),i.fillText("Saturn",160,100),i.fillText("Uranus",270,100),i.fillText("Neptune",380,100),i.fillStyle=t.color[0],r=195,n=50,i.fillText(String.fromCharCode(t.code[0]),r,n),i.beginPath(),i.arc(r-t.offset[0].x,n-t.offset[0].y,t.size[0],0,d),i.fill(),i.fillStyle=t.color[1],r=320,i.fillText(String.fromCharCode(t.code[1]),r,n),i.beginPath(),i.arc(r-t.offset[1].x,n-t.offset[1].y,t.size[1],0,d),i.fill(),i.fillStyle=t.color[2],r=455,i.fillText(String.fromCharCode(t.code[2]),r,n),i.beginPath(),i.arc(r-t.offset[2].x,n-t.offset[2].y,t.size[2],0,d),i.fill(),i.fillStyle=t.color[3],r=220,n=75,i.fillText(String.fromCharCode(t.code[3]),r,n),i.beginPath(),i.arc(r-t.offset[3].x,n-t.offset[3].y,t.size[3],0,d),i.fill(),i.fillStyle=t.color[4],r=320,i.fillText(String.fromCharCode(t.code[4]),r,n),i.beginPath(),i.arc(r-t.offset[4].x,n-t.offset[4].y,t.size[4],0,d),i.fill(),i.fillStyle=t.color[5],r=445,i.fillText(String.fromCharCode(t.code[5]),r,n),i.beginPath(),i.arc(r-t.offset[5].x,n-t.offset[5].y,t.size[5],0,d),i.fill(),i.fillStyle=t.color[6],r=225,n=100,i.fillText(String.fromCharCode(t.code[6]),r,n),i.beginPath(),i.arc(r-t.offset[6].x,n-t.offset[6].y,t.size[6],0,d),i.fill(),i.fillStyle=t.color[7],r=335,i.fillText(String.fromCharCode(t.code[7]),r,n),i.beginPath(),i.arc(r-t.offset[7].x,n-t.offset[7].y,t.size[7],0,d),i.fill(),i.fillStyle=t.color[8],r=460,i.fillText(String.fromCharCode(t.code[8]),r,n),i.beginPath(),i.arc(r-t.offset[8].x,n-t.offset[8].y,t.size[8],0,d),i.fill()}function displayPopup(t,a){var e,r,n=document.getElementById("loc"+a).getBoundingClientRect(),o=t.clientX-n.left,i=t.clientY-n.top,d=!1;for(e=0;e<tips[a-1].length;e++){var s=o-(r=tips[a-1][e]).x,l=i-r.y;if(s*s+l*l<r.r2){d=!0;break}}if(d){var c,p,h="#tip"+a;$(h+"text").empty(),1==a?(c=date1,long1,p=lat1*Math.PI/180):(c=date2,long2,p=lat2*Math.PI/180);var g=c.h+c.m/60+c.s/3600,u=c.LST_rad-1.0027378119113546*g*Math.PI/12;u-=2*Math.PI*Math.floor(.5*u/Math.PI);var m={loc:a,lat:p,LST:c.LST_rad,LST0:u,T:c.T,dT:c.dT,hours:g},v=c.T+c.dT;v>-50&&v<10&&(m.nu=nutation(v),m.LAST=m.LST-m.nu.Ee),"star"==r.object?displayPopupStar(r,m):"Sun"==r.object?displayPopupSun(r,m):"Moon"==r.object?displayPopupMoon(r,m):displayPopupPlanet(r,m),$(h).css("left",r.x+3+"px"),$(h).css("top",r.y+3+"px"),$(h).show()}}function closePopup(t){var a="#"+t;$(a).hide(),$(a+"text").empty(),$(a).css("left","-200px")}function displayPopupSun(t,a){var e,r=[!1,!1,!0,!1,!1,!1,!1,!1],n=a.T+a.dT;e=highPrecCalInTips?planetGeoVSOP(n,"Sun",!1):planetPos(n,r)[2];var o,i,d=180/Math.PI,s=12/Math.PI,l=convertDM(e.ra2000*s,"hm"),c=convertDM(e.dec2000*d,"dm"),p=Math.cos(a.lat),h=Math.sin(a.lat),g=a.LST;"nu"in a?(g=a.LAST,o=precessed_ra_dec(e.ra,e.dec,a.nu),e.ra=o.ra,e.dec=o.dec,i=topoCentricEquatorial(149597870.7*e.rGeo,e.ra,e.dec,g,h,p)):i=topoCentricEquatorial(149597870.7*e.rGeo,e.ra,e.dec,g,h,p);var u={ra:i.raTopo,dec:i.decTopo};if("nu"in a){var m={T:n,m:a.nu,LAST:a.LAST,cosLat:p,sinLat:h};u=aberration(i.raTopo,i.decTopo,m)}var v=convertDM(u.ra*s,"hm"),M=convertDM(u.dec*d,"dm"),f=precession_matrix(n,-n);if("nu"in a){var y={p11:a.nu.p11,p12:a.nu.p21,p13:a.nu.p31,p21:a.nu.p12,p22:a.nu.p22,p23:a.nu.p32,p31:a.nu.p13,p32:a.nu.p23,p33:a.nu.p33};o=precessed_ra_dec(i.raTopo,i.decTopo,y),o=precessed_ra_dec(o.ra,o.dec,f)}else o=precessed_ra_dec(i.raTopo,i.decTopo,f);var S=convertDM(o.ra*s,"hm"),T=convertDM(o.dec*d,"dm"),b=31.965/e.rGeo,x=ra_dec_to_alt_az(o={ra:u.ra,dec:u.dec},g,p,h),L=(x.alt+atmosphericRefraction(x.alt,101,286))*d,P=Math.atan2(x.sinA,x.cosA)*d+180;L=L.toFixed(2)+"&deg;",P=P.toFixed(2)+"&deg;";for(var z=n-a.hours/876600,A=[],C=[],_=0;_<25;_++)e=planetPos(z+_/876600,r)[2],A[_]=e.ra,C[_]=e.dec;var w=getTransitTime(a.LST0,a.lat,A,C,!1),I=w.t+" ("+w.alt+")",D=-.01454441043328608,k=getRiseSet(D,a.LST0,a.lat,A,C),R=k.rise+" ("+k.azRise+"), "+k.set;"above"==k.rise&&(R="circumpolar"),D=-.1047197551196598;var E=(k=getRiseSet(D,a.LST0,a.lat,A,C)).rise+", "+k.set;"above"==k.rise&&(E="above -6&deg;"),D=-.2094395102393196;var F=(k=getRiseSet(D,a.LST0,a.lat,A,C)).rise+", "+k.set;"above"==k.rise&&(F="above -12&deg;"),D=-.3141592653589793;var G=(k=getRiseSet(D,a.LST0,a.lat,A,C)).rise+", "+k.set;"above"==k.rise&&(G="above -18&deg;");var N="<table>";N+='<tr><th colspan="2">Sun</th></tr>',N+="<tr><td>Distance</td> <td>"+e.rGeo.toFixed(3)+" AU</td></tr>",N+="<tr><td>Angular Diameter</td> <td>"+b.toFixed(1)+"'</td></tr>",N+="<tr><td>Geocentric Ra, Dec (J2000)</td> <td>"+l+", "+c+"</td></tr>",N+="<tr><td>Topocentric Ra, Dec (J2000)</td> <td>"+S+", "+T+"</td></tr>","nu"in a?(N+="<tr><td>App. Topo. Ra, Dec (of date)</td> <td>"+v+", "+M+"</td></tr>",N+="<tr><td>Apparent Sidereal Time</td> <td>"+convertDM(12*a.LAST/Math.PI,"hm")+"</td></tr>"):N+="<tr><td>Topocentric Ra, Dec (of date)</td> <td>"+v+", "+M+"</td></tr>",N+="<tr><td>Altitude, Azimuth</td> <td>"+L+", "+P+"</td></tr>",N+="<tr><td>Rise (Azi), Set</td> <td>"+R+"</td></tr>",N+="<tr><td>Upper Transit (Altitude)</td> <td>"+I+"</td></tr>",N+="<tr><td>Civ. Twi. beg., end</td> <td>"+E+"</td></tr>",N+="<tr><td>Nat. Twi. beg., end</td> <td>"+F+"</td></tr>",N+="<tr><td>Ast. Twi. beg., end</td> <td>"+G+"</td></tr>";var q="#tip"+a.loc+"text";$(q).append(N)}function displayPopupMoon(t,a){var e,r,n,o,i,d,s=a.T+a.dT;if(highPrecCalInTips){n=(e=MoonPosElpMpp02(s,!0)).rGeo;d=(r=planetPos(s,[!1,!1,!0,!1,!1,!1,!1,!1])[2]).rGeo,i=r.lam2000,o=e.lam2000}else e=MediumMoon(s),d=1,i=(r=MiniSun(s)).lam,o=e.lam,n=e.rGeo;var l,c,p=180/Math.PI,h=12/Math.PI,g=Math.cos(a.lat),u=Math.sin(a.lat),m=convertDM(e.ra2000*h,"hm"),v=convertDM(e.dec2000*p,"dm"),M=a.LST;"nu"in a?(M=a.LAST,l=precessed_ra_dec(e.ra,e.dec,a.nu),e.ra=l.ra,e.dec=l.dec,c=topoCentricEquatorial(e.rGeo,e.ra,e.dec,M,u,g)):c=topoCentricEquatorial(e.rGeo,e.ra,e.dec,a.LST,u,g);var f={ra:c.raTopo,dec:c.decTopo};if("nu"in a){var y=15514103102587391e-22*g/Math.sqrt(g*g+.9933056020041341*u*u),S=-y*Math.sin(a.LAST),T=y*Math.cos(a.LAST),b=Math.cos(f.ra)*Math.cos(f.dec)+S,x=Math.sin(f.ra)*Math.cos(f.dec)+T,L=Math.sin(f.dec),P=Math.sqrt(b*b+x*x+L*L);f.ra=Math.atan2(x,b),f.dec=Math.asin(L/P)}var z=convertDM(f.ra*h,"hm"),A=convertDM(f.dec*p,"dm"),C=c.rTopo,_=precession_matrix(s,-s);if("nu"in a){var w={p11:a.nu.p11,p12:a.nu.p21,p13:a.nu.p31,p21:a.nu.p12,p22:a.nu.p22,p23:a.nu.p32,p31:a.nu.p13,p32:a.nu.p23,p33:a.nu.p33};l=precessed_ra_dec(c.raTopo,c.decTopo,w),l=precessed_ra_dec(l.ra,l.dec,_)}else l=precessed_ra_dec(c.raTopo,c.decTopo,_);var I=convertDM(l.ra*h,"hm"),D=convertDM(l.dec*p,"dm"),k=ra_dec_to_alt_az(l={ra:f.ra,dec:f.dec},M,g,u),R=(k.alt+atmosphericRefraction(k.alt,101,286))*p,E=Math.atan2(k.sinA,k.cosA)*p+180;R=R.toFixed(2)+"&deg;",E=E.toFixed(2)+"&deg;";for(var F=moonIlluminated(r.ra,r.dec,c.raTopo,c.decTopo,i,o,C,d),G=F.illuminated.toFixed(2),N=F.phase,q=F.elongTxt,U=F.mag.toFixed(1),B=s-a.hours/876600,O=[],j=[],H=0;H<25;H++)e=MediumMoon(B+H/876600),O[H]=e.ra,j[H]=e.dec;var W=getTransitTime(a.LST0,a.lat,O,j,!0),J=W.t+" ("+W.alt+")",V=getRiseSet(.002327105669325773,a.LST0,a.lat,O,j),Y=V.rise+" ("+V.azRise+")",X=V.set+" ("+V.azSet+")";"above"==V.rise&&(Y="circumpolar",X="circumpolar");var K="<table>";K+='<tr><th colspan="2">Moon</th></tr>',K+="<tr><td>Geocentric Distance</td><td>"+n.toFixed(0)+" km ("+(n/6371).toFixed(1)+"R<sub>&oplus;</sub>)</td></tr>",K+="<tr><td>Topocentric Distance</td><td>"+C.toFixed(0)+" km ("+(C/6371).toFixed(1)+"R<sub>&oplus;</sub>)</td></tr>",K+="<tr><td>Angular Diameter</td> <td>"+(3475/C*10800/Math.PI).toFixed(1)+"'</td></tr>",K+="<tr><td>Phase</td> <td>"+N+"</td></tr>",K+="<tr><td>Illuminated</td> <td>"+G+"</td> </tr>",K+="<tr><td>Apparent Magnitude</td> <td>"+U+"</td> </tr>",K+="<tr><td>Solar Elongation</td> <td>"+q+"</td> </tr>",K+="<tr><td>Geocentric Ra, Dec (J2000)</td> <td>"+m+", "+v+"</td></tr>",K+="<tr><td>Topocentric Ra, Dec (J2000)</td> <td>"+I+", "+D+"</td></tr>","nu"in a?(K+="<tr><td>App. Topo. Ra, Dec (of date)</td> <td>"+z+", "+A+"</td></tr>",K+="<tr><td>Apparent Sidereal Time</td> <td>"+convertDM(12*a.LAST/Math.PI,"hm")+"</td></tr>"):K+="<tr><td>Topocentric Ra, Dec (of date)</td> <td>"+z+", "+A+"</td></tr>",K+="<tr><td>Altitude, Azimuth</td> <td>"+R+", "+E+"</td></tr>",K+="<tr><td>Rise (Azimuth)</td> <td>"+Y+"</td></tr>",K+="<tr><td>Upper Transit (Altitude)</td> <td>"+J+"</td></tr>",K+="<tr><td>Set (Azimuth)</td> <td>"+X+"</td></tr>";var Q="#tip"+a.loc+"text";$(Q).append(K)}function displayPopupPlanet(t,a){var e=[!1,!1,!0,!1,!1,!1,!1,!1],r=t.pIndex-1;t.pIndex<4&&r--,e[r]=!0;var n,o,i=a.T+a.dT;if(highPrecCalInTips)o={rGeo:(n=planetGeoVSOP(i,t.object,!0)).dSunEarth,lam2000:n.lamSun2000,bet2000:n.betSun2000};else{var d=planetPos(i,e);n=d[r],o=d[2]}var s,l,c=n.rHelio,p=n.rGeo,h=180/Math.PI,g=12/Math.PI,u=convertDM(n.ra2000*g,"hm"),m=convertDM(n.dec2000*h,"dm"),v=Math.cos(a.lat),M=Math.sin(a.lat),f=a.LST;"nu"in a?(f=a.LAST,s=precessed_ra_dec(n.ra,n.dec,a.nu),n.ra=s.ra,n.dec=s.dec,l=topoCentricEquatorial(149597870.7*p,n.ra,n.dec,f,M,v)):l=topoCentricEquatorial(149597870.7*p,n.ra,n.dec,f,M,v);var y={ra:l.raTopo,dec:l.decTopo};if("nu"in a){var S={T:i,m:a.nu,LAST:a.LAST,cosLat:v,sinLat:M};y=aberration(l.raTopo,l.decTopo,S)}var T=convertDM(y.ra*g,"hm"),b=convertDM(y.dec*h,"dm"),x=precession_matrix(i,-i);if("nu"in a){var L={p11:a.nu.p11,p12:a.nu.p21,p13:a.nu.p31,p21:a.nu.p12,p22:a.nu.p22,p23:a.nu.p32,p31:a.nu.p13,p32:a.nu.p23,p33:a.nu.p33};s=precessed_ra_dec(l.raTopo,l.decTopo,L),s=precessed_ra_dec(s.ra,s.dec,x)}else s=precessed_ra_dec(l.raTopo,l.decTopo,x);var P=convertDM(s.ra*g,"hm"),z=convertDM(s.dec*h,"dm"),A=elongationPhase(n,o),C=A.elongation,_=A.illuminated,w={object:t.object,i:A.phaseAng,rHelio:c,rGeo:p,T:i,planet:n,sun:o},I=planetMag(w),D={Mercury:6.726865375887558,Venus:16.68838398040351,Mars:9.3468517633725,Jupiter:192.78588394427936,Saturn:160.5799887548923,Uranus:69.93800100978119,Neptune:67.89738430970871}[t.object]/p,k=ra_dec_to_alt_az(s={ra:y.ra,dec:y.dec},f,v,M),R=(k.alt+atmosphericRefraction(k.alt,101,286))*h,E=Math.atan2(k.sinA,k.cosA)*h+180;R=R.toFixed(2)+"&deg;",E=E.toFixed(2)+"&deg;";var F=[],G=[],N=i-a.hours/876600;e[2]=!1;for(var q=0;q<25;q++)n=planetPos(N+q/876600,e)[r],F[q]=n.ra,G[q]=n.dec;var U=getTransitTime(a.LST0,a.lat,F,G,!1),B=U.t+" ("+U.alt+")",O=getRiseSet(-.009890199094634533,a.LST0,a.lat,F,G),j=O.rise+" ("+O.azRise+"), "+O.set;"above"==O.rise&&(j="circumpolar");var H="#tip"+a.loc+"text",W="<table>";W+='<tr><th colspan="2">'+t.object+"</th></tr>",W+="<tr><td>Heliocentric Distance</td> <td>"+c.toFixed(3)+" AU</td></tr>",W+="<tr><td>Geocentric Distance</td> <td>"+p.toFixed(3)+" AU</td></tr>",W+="<tr><td>Angular Diameter</td> <td>"+D.toPrecision(3)+'"</td></tr>',W+="<tr> <td>Elongation</td> <td>"+C+"</td></tr>",t.pIndex<5&&(W+="<tr><td>Illuminated</td> <td>"+_+"</td></tr>"),W+="<tr><td>Apparent Magnitude</td> <td>"+I.toFixed(1)+"</td></tr>",W+="<tr><td>Geocentric Ra, Dec (J2000)</td> <td>"+u+", "+m+"</td></tr>",W+="<tr><td>Topocentric Ra, Dec (J2000)</td> <td>"+P+", "+z+"</td></tr>","nu"in a?(W+="<tr><td>App. Topo. Ra, Dec (of date)</td> <td>"+T+", "+b+"</td></tr>",W+="<tr><td>Apparent Sidereal Time</td> <td>"+convertDM(12*a.LAST/Math.PI,"hm")+"</td></tr>"):W+="<tr><td>Topocentric Ra, Dec (of date)</td> <td>"+T+", "+b+"</td></tr>",W+="<tr><td>Altitude, Azimuth</td> <td>"+R+", "+E+"</td></tr>",W+="<tr><td>Rise (Azi), Set</td> <td>"+j+"</td></tr>",W+="<tr><td>Upper Transit (Altitude)</td> <td>"+B+"</td></tr>",$(H).append(W)}function displayPopupStar(t,a){var e=brightStars(),r=e[t.starInd],n=a.T+a.dT,o=e[0].Tepoch,i=n-o,d=r.x+r.vx*i,s=r.y+r.vy*i,l=r.z+r.vz*i,c=Math.sqrt(d*d+s*s+l*l);if(n>-50&&n<10){var p=planetPos(n,[!1,!1,!0,!1,!1,!1,!1,!1])[2],h=p.rGeo*Math.PI/648e3;d-=-h*Math.cos(p.ra2000)*Math.cos(p.dec2000),s-=-h*Math.sin(p.ra2000)*Math.cos(p.dec2000),l-=-h*Math.sin(p.dec2000),c=Math.sqrt(d*d+s*s+l*l)}var g=180/Math.PI,u=12/Math.PI,m=convertDM(Math.atan2(s,d)*u,"hm"),v=convertDM(Math.asin(l/c)*g,"dm"),M=precession_matrix(o,i),f=a.LST;"nu"in a&&(f=a.LAST,M={p11:a.nu.p11*M.p11+a.nu.p12*M.p21+a.nu.p13*M.p31,p12:a.nu.p11*M.p12+a.nu.p12*M.p22+a.nu.p13*M.p32,p13:a.nu.p11*M.p13+a.nu.p12*M.p23+a.nu.p13*M.p33,p21:a.nu.p21*M.p11+a.nu.p22*M.p21+a.nu.p23*M.p31,p22:a.nu.p21*M.p12+a.nu.p22*M.p22+a.nu.p23*M.p32,p23:a.nu.p21*M.p13+a.nu.p22*M.p23+a.nu.p23*M.p33,p31:a.nu.p31*M.p11+a.nu.p32*M.p21+a.nu.p33*M.p31,p32:a.nu.p31*M.p12+a.nu.p32*M.p22+a.nu.p33*M.p32,p33:a.nu.p31*M.p13+a.nu.p32*M.p23+a.nu.p33*M.p33});var y=M.p11*d+M.p12*s+M.p13*l,S=M.p21*d+M.p22*s+M.p23*l,T=M.p31*d+M.p32*s+M.p33*l,b=Math.atan2(S,y),x=Math.asin(T/c);if("nu"in a){var L={T:n,m:a.nu,LAST:a.LAST,cosLat:Math.cos(a.lat),sinLat:Math.sin(a.lat)};b=(N=aberration(b,x,L)).ra,x=N.dec}var P,z=convertDM(b*u,"hm"),A=convertDM(x*g,"dm"),C="<table>",_=r.name,w=3.2616*c,I="";P=r.dist2000>=99e3?"?":c.toPrecision(4)+" pc ("+w.toPrecision(4)+" ly)","bayer"in r&&"<"!=_.slice(0,1)&&(_+=", "+r.bayer+" "+r.con);var D=r.mag.toFixed(2),k="Mag.",R=0;if(r.dist2000<99e3){var E=r.mag+5-5*Math.LOG10E*Math.log(r.dist2000);R=5*Math.LOG10E*Math.log(c/r.dist2000),k+=", Abs. Mag.",D=(D=r.mag+R).toFixed(2)+", "+E.toFixed(2)}if("varMax"in r&&"varMin"in r){var F=parseFloat(r.varMax)+R,G=parseFloat(r.varMin)+R;I=F.toFixed(2)+" &ndash; "+G.toFixed(2)}C+='<tr><th colspan="2">'+_+"</th></tr>",C+="<tr><td>"+k+"</td> <td>"+D+"</td></tr>",""!=I&&(C+="<tr><td>Variable</td> <td>"+I+"</td></tr>"),C+="<tr><td>Distance</td> <td>"+P+"</td></tr>","spect"in r&&(C+="<tr><td>Spec, col. ind.</td> <td>"+r.spect,"colorInd"in r&&(C+=", "+r.colorInd),C+="</td></tr>"),C+="<tr><td>Constellation</td> <td>"+constellationAbbrNames()[r.con]+"</td></tr>",C+="<tr><td>Ra, Dec (J2000)</td> <td>"+m+", "+v+"</td></tr>","nu"in a?(C+="<tr><td>App. Ra, Dec (of date)</td> <td>"+z+", "+A+"</td></tr>",C+="<tr><td>Apparent Sidereal Time</td> <td>"+convertDM(12*a.LAST/Math.PI,"hm")+"</td></tr>"):C+="<tr><td>Ra, Dec (of date)</td> <td>"+z+", "+A+"</td></tr>";var N={ra:b,dec:x},q=ra_dec_to_alt_az(N,f,Math.cos(a.lat),Math.sin(a.lat)),U=(q.alt+atmosphericRefraction(q.alt,101,286))*g,B=Math.atan2(q.sinA,q.cosA)*g+180;C+="<tr><td>Alt, Azimuth</td> <td>"+U.toFixed(2)+"&deg;, "+B.toFixed(2)+"&deg;</td></tr>",U=-.009890199094634533;var O=riseSetStar(a.LST0,U,a.lat,b,x);C+="<tr><td>Upper Transit (Alt)</td> <td>"+(O.transit+" ("+O.altTransit+")")+"</td></tr>";var j=O.rise+" ("+O.azRise+"), "+O.set;"above"==O.rise&&(j="circumpolar"),C+="<tr><td>Rise (Azi), Set</td> <td>"+j+"</td></tr>",C+="</table>";var H="#tip"+a.loc+"text";$(H).append(C)}function setupDrawingParameters(){return{color:["red","orange","maroon","#FF00FF","red","brown","brown","#7277e6","#7277e6"],code:[9788,9789,9791,9792,9794,9795,9796,9954,9798],size:[1,2,1,2,2,2,2,2,2],offset:[{x:-10,y:7},{x:-10,y:7},{x:-5,y:7},{x:-7,y:0},{x:-7,y:2},{x:-10,y:7},{x:-5,y:7},{x:-10,y:3},{x:-8,y:5}],pName:["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"],starMagA:-4/6.5,starMagB:1- -4/6.5*5}}milkyLoc[0]={northernEdge:northernEdge(),southernEdge:southernEdge(),betaCas:betaCas(),thetaOph:thetaOph(),lambdaSco:lambdaSco(),coalsack:coalsack()},milkyLoc[1]={northernEdge:northernEdge(),southernEdge:southernEdge(),betaCas:betaCas(),thetaOph:thetaOph(),lambdaSco:lambdaSco(),coalsack:coalsack()};
