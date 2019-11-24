"use strict";var csvdata="";function riseSetPage(){$("#starCharts").hide(),$("#riseSetArea").show();var t=Math.PI/180;$("#riseSetPlace1").text(place1),$("#riseSetlong1").html(long1+"&deg;"),$("#riseSetlat1").html(lat1+"&deg;"),$("#riseSetDate1").html(date1.dateString),$("#riseSetTtimeZone1").html("GMT"+tz1.tzString),riseSetLoc({locNum:1,long:long1*t,lat:lat1*t,tz:tz1.tz,yyyy:date1.yyyy,mm:date1.mm,dd:date1.dd}),$("#riseSetPlace2").text(place2),$("#riseSetlong2").html(long2+"&deg;"),$("#riseSetlat2").html(lat2+"&deg;"),$("#riseSetDate2").html(date2.dateString),$("#riseSetTtimeZone2").html("GMT"+tz2.tzString),riseSetLoc({locNum:2,long:long2*t,lat:lat2*t,tz:tz2.tz,yyyy:date2.yyyy,mm:date2.mm,dd:date2.dd})}function backToStarCharts(){$("#RSMultiResult").empty(),$("#riseSetMultipleDays").slideUp(),$("#riseSetMainPage").slideDown(),$("#starCharts").show(),$("#riseSetArea").hide()}function riseSetChangeLocs(){$("button.menu").attr("disabled",!0),$("#RSMultiResult").empty(),$("#riseSetMultipleDays").slideUp(),$("#riseSetMainPage").slideDown();var t=$("#riseSetPlace1").text(),e=$("#riseSetPlace2").text(),a=$("#riseSetlong1").html(),i=a.indexOf("&deg;"),n=parseFloat(a.slice(0,i)),s=$("#riseSetlong2").html();i=s.indexOf("&deg;");var r=parseFloat(s.slice(0,i)),o=$("#riseSetlat1").html();i=o.indexOf("&deg;");var l=parseFloat(o.slice(0,i)),d=$("#riseSetlat2").html();i=d.indexOf("&deg;");var h=parseFloat(d.slice(0,i)),u=$("#riseSetDate1").text(),p=$("#riseSetDate2").text();i=u.indexOf("-");var c=parseInt(u.slice(0,i)),v=parseInt(u.substr(i+1,2)),b=parseInt(u.substr(i+4,2));i=p.indexOf("-");var S=parseInt(p.slice(0,i)),g=parseInt(p.substr(i+1,2)),m=parseInt(p.substr(i+4,2)),M=$("#riseSetTtimeZone1").text(),y=$("#riseSetTtimeZone2").text(),f=M.substr(3,1),w=y.substr(3,1),T=parseFloat(M.substr(4,2))+parseFloat(M.substr(6,2))/60;"-"==f&&(T=-T);var z=parseFloat(y.substr(4,2))+parseFloat(y.substr(6,2))/60;"-"==w&&(z=-z),$("#riseSetInputlocs").slideDown(),$("#riseSetPlace1in").val(t),$("#riseSetLong1in").val(n),$("#riseSetLat1in").val(l),$("#riseSetYear1in").val(c),$("#riseSetMonth1in").val(v),$("#riseSetDay1in").val(b),$("#riseSetTz1in").val(T),$("#riseSetPlace2in").val(e),$("#riseSetLong2in").val(r),$("#riseSetLat2in").val(h),$("#riseSetYear2in").val(S),$("#riseSetMonth2in").val(g),$("#riseSetDay2in").val(m),$("#riseSetTz2in").val(z),$("#riseSetSynTimeYes").prop("checked",!0),$("#riseSetSynTimeNo").prop("checked",!1),$(".timeInputLoc2").hide()}function riseSetChangeLocationsAndDates(t){var e=t.riseSetPlace1in.value,a=parseFloat(t.riseSetLong1in.value),i=parseFloat(t.riseSetLat1in.value),n=parseFloat(t.riseSetTz1in.value),s={tz:60*-n},r=Math.abs(n)+.5/60;s.tzString=n>=0?"+":"-";var o=Math.floor(r).toString();o.length<2&&(o="0"+o);var l=Math.floor(60*(r-Math.floor(r))).toString();l.length<2&&(l="0"+l),s.tzString+=o+l;var d=parseInt(t.riseSetYear1in.value),h=parseInt(t.riseSetMonth1in.value),u=parseInt(t.riseSetDay1in.value),p=t.riseSetPlace2in.value,c=parseFloat(t.riseSetLong2in.value),v=parseFloat(t.riseSetLat2in.value),b=parseFloat(t.riseSetTz2in.value),S={tz:60*-b};r=Math.abs(b)+.5/60,S.tzString=b>=0?"+":"-",(o=Math.floor(r).toString()).length<2&&(o="0"+o),(l=Math.floor(60*(r-Math.floor(r))).toString()).length<2&&(l="0"+l),S.tzString+=o+l;var g,m,M,y=document.getElementById("riseSetSynTimeYes").checked;y?(g=d,m=h,M=u):(g=parseInt(t.riseSetYear2in.value),m=parseInt(t.riseSetMonth2in.value),M=parseInt(t.riseSetDay2in.value));var f="#riseSetErrorlocs";$(f).empty();var w=-180,T=180,z="Invalid longitude! Longitude must be a number between -180 and 180. West of Greenwich is negative; east of Greenwich is positive.";if(sanityCheck(a,"#riseSetLong1in",w,T,z,f),sanityCheck(c,"#riseSetLong2in",w,T,z,f),w=-90,T=90,z="Invalid latitude! Latitude must be a number between -90 and 90, positive in the northern hemisphere and negative in the southern hemisphere.",sanityCheck(i,"#riseSetLat1in",w,T,z,f),sanityCheck(v,"#riseSetLat2in",w,T,z,f),w=-3e3,T=3e3,z="Invalid year! Please enter an integer between -3000 and 3000. Note that 0 means 1 BCE, -1 means 2 BCE and so on. This webpage can only handle years between -3000 and 3000.",sanityCheck(d,"#riseSetYear1in",w,T,z,f),y||sanityCheck(g,"#riseSetYear2in",w,T,z,f),w=1,T=12,z="Invalid month! Month must be an integer between 1 and 12.",sanityCheck(h,"#riseSetMonth1in",w,T,z,f),y||sanityCheck(m,"#riseSetMonth2in",w,T,z,f),w=1,T=31,z="Invalid day! Day must be an integer between 1 and 31.",sanityCheck(u,"#riseSetDay1in",w,T,z,f),y||sanityCheck(M,"#riseSetDay2in",w,T,z,f),w=-12,T=14,z="Invalid time zone! Time zone must be a number between -12 and 14.",sanityCheck(n,"#riseSetTz1in",w,T,z,f),sanityCheck(b,"#riseSetTz2in",w,T,z,f),""==$(f).text()){$("#riseSetInputlocs").slideUp(),$("button.menu").attr("disabled",!1);var R=getDm(d,h,u,0),D=CalDat(R);d=D.yy,h=D.mm,u=D.dd;var I=D.dateString;R=getDm(g,m,M,0),g=(D=CalDat(R)).yy,m=D.mm,M=D.dd;var P=D.dateString;$("#riseSetPlace1").text(e),$("#riseSetlong1").html(a+"&deg;"),$("#riseSetlat1").html(i+"&deg;"),$("#riseSetDate1").html(I),$("#riseSetTtimeZone1").html("GMT"+s.tzString);var k=Math.PI/180;riseSetLoc({locNum:1,long:a*k,lat:i*k,tz:s.tz,yyyy:d,mm:h,dd:u}),$("#riseSetPlace2").text(p),$("#riseSetlong2").html(c+"&deg;"),$("#riseSetlat2").html(v+"&deg;"),$("#riseSetDate2").html(P),$("#riseSetTtimeZone2").html("GMT"+S.tzString),riseSetLoc({locNum:2,long:c*k,lat:v*k,tz:S.tz,yyyy:g,mm:m,dd:M})}}function riseSetMultipleDates(){if($("button.menu").attr("disabled",!0),$("#riseSetMainPage").slideUp(10),$("#RSMultiResult").empty(),$("#riseSetMultipleDays").slideDown(10),$("#riseSetMultipleDaysInput").slideDown(10),""==$("#RSMultiLongin").val()){var t=$("#riseSetPlace1").text(),e=$("#riseSetlong1").html(),a=e.indexOf("&deg;"),i=parseFloat(e.slice(0,a)),n=$("#riseSetlat1").html();a=n.indexOf("&deg;");var s=parseFloat(n.slice(0,a)),r=$("#riseSetTtimeZone1").text(),o=r.substr(3,1),l=parseFloat(r.substr(4,2))+parseFloat(r.substr(6,2))/60;"-"==o&&(l=-l),$("#RSMultiPlacein").val(t),$("#RSMultiLongin").val(i),$("#RSMultiLatin").val(s),$("#RSMultiTzin").val(l),$("#RSMultiEpoch").val(2e3),$("#RSMultiDt").val(1)}"Star"==$("#objects").val()&&$(".RSMultiRaDec").show()}function RSMultipleDays(t){var e=t.RSMultiPlacein.value,a=parseFloat(t.RSMultiLongin.value),i=parseFloat(t.RSMultiLatin.value),n=parseFloat(t.RSMultiTzin.value),s=Math.abs(n)+.5/60,r="GMT";r+=n>=0?"+":"-";var o=Math.floor(s).toString();o.length<2&&(o="0"+o);var l=Math.floor(60*(s-Math.floor(s))).toString();l.length<2&&(l="0"+l),r+=o+l;var d,h,u,p=t.objects.value;"Star"==p&&(d=parseFloat(t.RSMultiRa.value),h=parseFloat(t.RSMultiDec.value),u=parseFloat(t.RSMultiEpoch.value));var c=parseInt(t.RSMultiYear1in.value),v=parseInt(t.RSMultiMonth1in.value),b=parseInt(t.RSMultiDay1in.value),S=parseInt(t.RSMultiYear2in.value),g=parseInt(t.RSMultiMonth2in.value),m=parseInt(t.RSMultiDay2in.value),M=parseInt(t.RSMultiDt.value),y="#RSMultiErrorlocs";$(y).empty();var f=["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Star"],w=!1;$("#objects").css("background-color","white");for(var T=0;T<f.length;T++)if(p==f[T]){w=!0;break}if(!w){var z='<p style="color:red;">Please select an object.</p>';$("#objects").css("background-color","#e2a8a8"),$(y).append(z)}var R=-180,D=180,I="Invalid longitude! Longitude must be a number between -180 and 180. West of Greenwich is negative; east of Greenwich is positive.";if(sanityCheck(a,"#RSMultiLongin",R,D,I,y),R=-90,D=90,I="Invalid latitude! Latitude must be a number between -90 and 90, positive in the northern hemisphere and negative in the southern hemisphere.",sanityCheck(i,"#RSMultiLatin",R,D,I,y),R=-12,D=14,I="Invalid time zone! Time zone must be a number between -12 and 14.",sanityCheck(n,"#RSMultiTzin",R,D,I,y),"Star"==p&&(R=0,D=24,I="Invalid RA! RA must be a number between 0 and 24.",sanityCheck(d,"#RSMultiRa",R,D,I,y),R=-90,D=90,I="Invalid Dec! Dec must be a number between -90 and 90.",sanityCheck(h,"#RSMultiDec",R,D,I,y),R=-2e5,D=2e5,I="Invalid epoch. Please enter a year bteween -200,000 and 200,000: 2000 means J2000.0, 2050 means 50 years after J2000.0.",sanityCheck(u,"#RSMultiEpoch",R,D,I,y)),R=-3e3,D=3e3,I="Invalid year! Please enter an integer between -3000 and 3000. Note that 0 means 1 BCE, -1 means 2 BCE and so on. This webpage can only handle years between -3000 and 3000.",sanityCheck(c,"#RSMultiYear1in",R,D,I,y),sanityCheck(S,"#RSMultiYear2in",R,D,I,y),R=1,D=12,I="Invalid month! Month must be an integer between 1 and 12.",sanityCheck(v,"#RSMultiMonth1in",R,D,I,y),sanityCheck(g,"#RSMultiMonth2in",R,D,I,y),R=1,D=31,I="Invalid day! Day must be an integer between 1 and 31.",sanityCheck(b,"#RSMultiDay1in",R,D,I,y),sanityCheck(m,"#RSMultiDay2in",R,D,I,y),R=1,D=Number.POSITIVE_INFINITY,I="Invalid time step! Time step must be a positive integer.",sanityCheck(M,"#RSMultiDt",R,D,I,y),""==$(y).text()){$("#riseSetMultipleDaysInput").slideUp(),$("button.menu").attr("disabled",!1);z="<p>Location: "+e+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Longitude: "+a.toString()+"&deg;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Latitude: "+i.toString()+"&deg;";$("#RSMultiResult").append(z),z="<p>Time zone: "+r+"</p>",$("#RSMultiResult").append(z),z="Star"==p?"<p>Object: a star with RA = "+d+"<sup>h</sup>, &nbsp;&nbsp; Dec = "+h+"&deg;, &nbsp;&nbsp; epoch:"+u+"</p>":"<p>Object: "+p+"</p>",$("#RSMultiResult").append(z),calcRiseSetMultipleDates({long:a,lat:i,tz:n,D1:getDm(c,v,b,0),D2:getDm(S,g,m,0),deltaD:M,obj:p,ra:d,dec:h,epoch:u})}}function riseSetShowHideRADec(t,e){var a="."+e;t?$(a).show():$(a).hide()}function getLST0(t,e,a,i){var n=Math.floor(t-.5)+.5,s=i/60;s<0&&(s+=24);var r=.06570748587250752*n;r-=24*Math.floor(r/24),r+=6.697374558336001+1.0027378119113546*s,r-=24*Math.floor(r/24);var o=(r+=e*(.08541030618518518+2577003148148148e-20*e)+2.686296296296296e-7)+12*a/Math.PI;return(o-=24*Math.floor(o/24))*Math.PI/12}function riseSetLoc(t){t.locNum.toString();var e=getDm(t.yyyy,t.mm,t.dd,t.tz),a=e/36525,i=getLST0(e,a+DeltaT(a),t.long,t.tz);riseSetPlanetsTwilights(i,t.locNum,t.lat,a),riseSetBrightestStars(i,t.locNum,t.lat,a+DeltaT(a))}function riseSetPlanetsTwilights(t,e,a,i){var n,s=DeltaT(i),r=(Math.sin(a),Math.cos(a),[]);for(n=0;n<25;n++)r[n]=sunMoonPlanets(i+n/876600+s);var o,l,d,h,u=[],p=[];for(o="#riseSetSun"+e.toString(),$(o).empty(),n=0;n<25;n++)u[n]=r[n][0].ra,p[n]=r[n][0].dec;for(d=getTransitTime(t,a,u,p,!1),"above"==(l=getRiseSet(-.01454441043328608,t,a,u,p)).rise?(h="<p>Upper transit: "+d.t+" (Altitude = "+d.alt+"); ",h+="the sun is above the horizon all day."):"below"==l.rise?(h="<p>Upper transit: "+d.t+" (Altitude = "+d.alt+"); ",h+="the sun is below the horizon all day."):(h="<p>Sunrise: "+l.rise+" (Azimuth = "+l.azRise+")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",h+="Sunset: "+l.set+" (Azimuth = "+l.azSet+")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",h+="Upper transit: "+d.t+" (Altitude = "+d.alt+")</p>"),$(o).append(h),h="above"==(l=getRiseSet(-.1047197551196598,t,a,u,p)).rise?"<p>No civil twilights. The Sun's altitude is above -6&deg; all day.</p>":"below"==l.rise?"<p>No civil twilights. The Sun's altitude is below -6&deg; all day.</p>":"<p>Civil twilight: begins at "+l.rise+", ends at "+l.set+".</p>",$(o).append(h),h="above"==(l=getRiseSet(-.2094395102393196,t,a,u,p)).rise?"<p>No nautical twilights. The Sun's altitude is above -12&deg; all day.</p>":"below"==l.rise?"<p>No nautical twilights. The Sun's altitude is below -12&deg; all day.</p>":"<p>Nautical twilight: begins at "+l.rise+", ends at "+l.set+".</p>",$(o).append(h),h="above"==(l=getRiseSet(-.3141592653589793,t,a,u,p)).rise?"<p>No astronomical twilights. The Sun's altitude is above -18&deg; all day.</p>":"below"==l.rise?"<p>No astronomical twilights. The Sun's altitude is below -18&deg; all day.</p>":"<p>Astronomical twilight: begins at "+l.rise+", ends at "+l.set+".</p>",$(o).append(h),o="#riseSetMoon"+e.toString(),$(o).empty(),n=0;n<25;n++)u[n]=r[n][1].ra,p[n]=r[n][1].dec;d=getTransitTime(t,a,u,p,!0),"above"==(l=getRiseSet(.002327105669325773,t,a,u,p)).rise?(h="<p>Upper transit: "+d.t+" (Altitude = "+d.alt+"); ",h+="the Moon is above the horizon all day."):"below"==l.rise?(h="<p>Upper transit: "+d.t+" (Altitude = "+d.alt+"); ",h+="the Moon is below the horizon all day."):(h="<p>Moonrise: "+l.rise+" (Azimuth = "+l.azRise+")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",h+="Moonset: "+l.set+" (Azimuth = "+l.azSet+")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",h+="Upper transit: "+d.t+" (Altitude = "+d.alt+")</p>"),$(o).append(h);var c=r[12][0].ra,v=r[12][0].dec,b=r[12][1].ra,S=r[12][1].dec,g=r[12][1].rGeo,m=r[12][0].lam2000,M=r[12][0].rGeo,y=r[12][1].lam2000,f=moonIlluminated(c,v,b,S,m,y,g,M),w=f.illuminated,T=f.phase,z=f.mag.toFixed(1);h="<p>At 12:00 in the given time zone...<br />",h+="Fraction of Moon illuminated: "+w.toFixed(2)+",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phase: "+T+",<br />",h+="Apparent Magnitude: "+z+",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solar elongation: "+f.elongTxt+".</p>",$(o).append(h);var R=["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"];o="#riseSetPlanets"+e.toString(),$(o).empty(),h="<p>The elongation is the angular distance between the planet and the Sun. Elongations, fractions illuminated and magnitudes of the planets are given at 12:00 in the given time zone.</p>",$(o).append(h),$(o).append("<table>"),h="<tr><th>Planet</th> <th>Rise (Azimuth)</th> <th>Transit (Alt)</th> ",h+="<th>Set (Azimuth)</th> <th>Elong.</th> <th>Illum.</th> <th>Mag.</th> </tr>",$(o).append(h);for(var D=2;D<9;D++){for(n=0;n<25;n++)u[n]=r[n][D].ra,p[n]=r[n][D].dec;d=getTransitTime(t,a,u,p,!1);var I=(l=getRiseSet(-.009890199094634533,t,a,u,p)).rise+" ("+l.azRise+")",P=l.set+" ("+l.azSet+")";"above"==l.rise?(I="circumpolar",P="circumpolar"):"below"==l.rise&&(I="invisible",P="invisible");var k=r[12][D],C=r[12][0],A=elongationPhase(k,C),L=A.elongation,x=(w=A.illuminated,{object:R[D-2],i:A.phaseAng,rHelio:k.rHelio,rGeo:k.rGeo,T:i+.5/36525+s,planet:k,sun:C});z=planetMag(x);h="<tr><td>"+R[D-2]+"</td>",h+=" <td>"+I+"</td>",h+=" <td>"+d.t+" ("+d.alt+")</td>",h+=" <td>"+P+"</td>",h+=" <td>"+L+"</td>",h+=" <td>"+w+"</td>",h+=" <td>"+z.toFixed(1)+"</td> </tr>",$(o).append(h)}$(o).append("</table>")}function riseSetBrightestStars(t,e,a,i){var n=brightestStarsLoc[e-1],s=n[0].Tepoch;Math.abs(i-s)>.1&&recomputeStarPos(i,n);var r="#riseSetStars"+e.toString();$(r).empty(),$(r).append("<table>");var o="<tr><th>Star</th> <th>Rise (Azimuth)</th> <th>Transit</th> ";o+="<th>Set</th> </tr>",$(r).append(o);for(var l=1;l<n.length;l++){var d=riseSetStar(t,-.009890199094634533,a,n[l].ra,n[l].dec),h=d.rise+" ("+d.azRise+")",u=d.transit+" ("+d.altTransit+")";"above"==d.rise?(h="circumpolar",d.set="circumpolar"):"below"==d.rise&&(h="invisible",d.set="invisible"),o="<tr><td>"+n[l].name+"</td>",o+=" <td>"+h+"</td>",o+=" <td>"+u+"</td>",o+=" <td>"+d.set+"</td> </tr>",$(r).append(o)}$(r).append("</table>"),o="<p>Note: For stars, the azimuth at the set time is the negative of its azimuth when it rises.</p>",$(r).append(o)}function calcRiseSetMultipleDates(t){var e,a,i,n,s,r,o,l,d,h,u,p=Math.PI/180,c=t.long*p,v=t.lat*p,b=(t.D1-t.tz/24)/36525,S=t.deltaD/36525,g=0,m="#RSMultiResult",M=[],y=[],f=[!1,!1,!1,!1,!1,!1,!1,!1];switch(h="<p>Note: The table shows data up to 500 dates. The csv file contains data up to 10000 dates.</p>",$(m).append(h),h="<p>Times are given according to the time zone listed above. Daylight saving time is not taken into account.</p>",$(m).append(h),t.obj){case"Sun":for(h="<p>The Gregorian calendar is approximately in sync with the Sun's motion, so the times are approximately the same at the same date every year. It is therefore not necessary to calculate the times for more than a year.</p>",$(m).append(h),h="<p>In the table below, the angles beside the rise and set times are the azimuths of the Sun at the rise and set times. Azimuth is measured from north and turning positive towards the east. The angle and direction beside the upper transit time is the altitute and direction of the Sun's center at transit. Atmospheric refraction is added when the altitude is above -1&deg;. For the twilights, the first time is the beginning of the twilight and the second time is the end of the twilight.</p>",$(m).append(h),h="<p><button onclick=\"download_csv(csvdata,'Sun.csv')\">Download csv file</button></p>",$(m).append(h),$(m).append("<table>"),h="<tr><th>Date</th> <th>Rise</th> <th>Transit</th> <th>Set</th>",h+="<th>Civ. Twi.</th> <th>Nat. Twi.</th>",h+="<th>Ast. Twi.</th> </tr>",$(m).append(h),csvdata="Date, Rise, Transit, Set, Civ. Twi. beg., Civ. Twi. end, Nat. Twi. beg., Nat. Twi. end, Ast. Twi. beg., Ast. Twi. end\n",f[2]=!0,e=t.D1;e<=t.D2;e+=t.deltaD){for(u=CalDat(e).dateString,a=b+g*S,i=DeltaT(a),n=getLST0(e-t.tz/24,a+i,c,60*-t.tz),h="<tr> <td>"+u+"</td>",csvdata+=u+", ",s=0;s<25;s++)r=planetPos(a+s/876600+i,f),M[s]=r[2].ra,y[s]=r[2].dec;if(d=getTransitTime(n,v,M,y,!1),"above"==(l=getRiseSet(o=-.01454441043328608,n,v,M,y)).rise?(h+="<td>circumpolar</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+="circumpolar</td> ",csvdata+="circumpolar, "+d.t+" ("+d.alt+"), ",csvdata+="circumpolar, "):"below"==l.rise?(h+="<td>invisible</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+="invisible</td> ",csvdata+="invisible, "+d.t+" ("+d.alt+"), ",csvdata+="invisible, "):(h+="<td>"+l.rise+" ("+l.azRise+")</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+=l.set+" ("+l.azSet+")</td> ",csvdata+=l.rise+" ("+l.azRise+"), ",csvdata+=d.t+" ("+d.alt+"), ",csvdata+=l.set+" ("+l.azSet+"), "),"above"==(l=getRiseSet(o=-.1047197551196598,n,v,M,y)).rise?(h+="<td>above -6&deg;</td> ",csvdata+="above -6 degrees, above -6 degrees, "):"below"==l.rise?(h+="<td>below -6&deg;</td> ",csvdata+="below -6 degrees, below -6 degrees, "):(h+="<td>"+l.rise+", "+l.set+"</td> ",csvdata+=l.rise+", "+l.set+", "),"above"==(l=getRiseSet(o=-.2094395102393196,n,v,M,y)).rise?(h+="<td>above -12&deg;</td> ",csvdata+="above -12 degrees, above -12 degrees, "):"below"==l.rise?(h+="<td>below -12&deg;</td> ",csvdata+="below -12 degrees, below -12 degrees, "):(h+="<td>"+l.rise+", "+l.set+"</td> ",csvdata+=l.rise+", "+l.set+", "),"above"==(l=getRiseSet(o=-.3141592653589793,n,v,M,y)).rise?(h+="<td>above -18&deg;</td>",csvdata+="above -18 degrees, above -18 degrees\n"):"below"==l.rise?(h+="<td>below -18&deg;</td>",csvdata+="below -18 degrees, below -18 degrees\n"):(h+="<td>"+l.rise+", "+l.set+"</td>",csvdata+=l.rise+", "+l.set+"\n"),h+=" </tr>",++g<=500&&$(m).append(h),1e4==g)break}$(m).append("</table>");break;case"Moon":for(h="<p>In the table below, the angles beside the rise and set times are the azimuths of the Moon at the rise and set times. Azimuth is measured from north and turning positive towards the east. The angle and direction beside the upper transit time is the altitute and direction of the Moon's center at transit. Atmospheric refraction is added when the altitude is above -1&deg;. Illumination gives the fraction of the Moon illuminated. Elongation is the angular distance between the Moon and the Sun. Illumination, apparent magnitude and elongation are the values at 12:00 in the given time zone.</p>",$(m).append(h),h="<p><button onclick=\"download_csv(csvdata,'Moon.csv')\">Download csv file</button></p>",$(m).append(h),$(m).append("<table>"),h="<tr><th>Date</th> <th>Rise</th> <th>Transit</th> <th>Set</th> <th>Illum.</th> <th>Mag.</th> <th>Elong.</th> <th>Phase</th> </tr>",$(m).append(h),csvdata="Date, Rise, Transit, Set, Illuminated, Magnitude, Elongation, Phase\n",o=.002327105669325773,e=t.D1;e<=t.D2;e+=t.deltaD){var w,T;for(u=CalDat(e).dateString,a=b+g*S,i=DeltaT(a),n=getLST0(e-t.tz/24,a+i,c,60*-t.tz),h="<tr> <td>"+u+"</td>",csvdata+=u+", ",s=0;s<25;s++){var z=MediumMoon(a+i+s/24/36525);M[s]=z.ra,y[s]=z.dec,12==s&&(w=z.lam2000,T=z.rGeo)}d=getTransitTime(n,v,M,y,!0),"above"==(l=getRiseSet(o,n,v,M,y)).rise?(h+="<td>circumpolar</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+="circumpolar</td> ",csvdata+="circumpolar, "+d.t+" ("+d.alt+"), ",csvdata+="circumpolar, "):"below"==l.rise?(h+="<td>invisible</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+="invisible</td> ",csvdata+="invisible, "+d.t+" ("+d.alt+"), ",csvdata+="invisible, "):(h+="<td>"+l.rise+" ("+l.azRise+")</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+=l.set+" ("+l.azSet+")</td> ",csvdata+=l.rise+" ("+l.azRise+"), ",csvdata+=d.t+" ("+d.alt+"), ",csvdata+=l.set+" ("+l.azSet+"), "),f[2]=!0;(A=planetPos(a+i+.5/36525,f)[2]).ra,A.dec;var R=A.rGeo,D=(M[12],y[12],moonIlluminated(A.ra,A.dec,M[12],y[12],A.lam2000,w,T,R)),I=D.illuminated.toFixed(2),P=D.phase,k=D.mag.toFixed(1);if(h+="<td>"+I+"</td>",csvdata+=I+", ",h+="<td>"+k+"</td>",csvdata+=k+", ",h+="<td>"+D.elongTxt+"</td>",csvdata+=D.elongTxt+", ",h+="<td>"+P+"</td> </tr>",csvdata+=P+"\n",++g<=500&&$(m).append(h),1e4==g)break}$(m).append("</table>");break;case"Mercury":case"Venus":case"Mars":case"Jupiter":case"Saturn":case"Uranus":case"Neptune":var C={Mercury:0,Venus:1,Mars:3,Jupiter:4,Saturn:5,Uranus:6,Neptune:7}[t.obj];for(f[2]=!0,f[C]=!0,h="<p>In the table below, the angles beside the rise and set times are the azimuths of "+t.obj,h+=" at the rise and set times. Azimuth is measured from north and turning positive towards the east. The angle and direction beside the upper transit time is the altitute and direction of "+t.obj,h+=" at transit. Atmospheric refraction is added when the altitude is above -1&deg;. Elongation is the angular distance between "+t.obj+" and the Sun. Elongation and magnitude are given at 12:00 in the given time zone.</p>",$(m).append(h),h="<p><button onclick=\"download_csv(csvdata,'"+t.obj+".csv')\">Download csv file</button></p>",$(m).append(h),$(m).append("<table>"),h="<tr><th>Date</th> <th>Rise (Azi)</th> <th>Transit (Alt)</th> <th>Set (Azi)</th> <th>Elong.</th> <th>Illum.</th> <th>Mag.</th></tr>",$(m).append(h),csvdata="Date, Rise (Azimuth), Transit (Altitude), Set (Azimuth), Elongation, Illuminated, Magnitude\n",o=-.009890199094634533,e=t.D1;e<=t.D2;e+=t.deltaD){var A,L;for(u=CalDat(e).dateString,a=b+g*S,i=DeltaT(a),n=getLST0(e-t.tz/24,a+i,c,60*-t.tz),h="<tr> <td>"+u+"</td> ",csvdata+=u+", ",s=0;s<25;s++)r=planetPos(a+s/876600+i,f),M[s]=r[C].ra,y[s]=r[C].dec,12==s&&(A=r[2],L=r[C]);d=getTransitTime(n,v,M,y,!1);var x=(l=getRiseSet(o,n,v,M,y)).rise+" ("+l.azRise+")",F=l.set+" ("+l.azSet+")";"above"==l.rise?(x="circumpolar",F="circumpolar"):"below"==l.rise&&(x="invisible",F="invisible");var N=elongationPhase(L,A),E=N.elongation,H=(I=N.illuminated,{object:t.obj,i:N.phaseAng,rHelio:L.rHelio,rGeo:L.rGeo,T:a+.5/36525+i,planet:L,sun:A});k=planetMag(H).toFixed(1);if(h+="<td>"+x+"</td> <td>",h+=d.t+" ("+d.alt+")</td> <td>",h+=F+"</td> <td>"+E+"</td> <td>"+I+"</td> <td>",h+=k+"</td> </tr>",csvdata+=x+", "+d.t+" ("+d.alt+"), ",csvdata+=F+", "+E+", "+I+", "+k+"\n",++g<=500&&$(m).append(h),1e4==g)break}break;case"Star":h="<p>Note that the rise, set and upper transit times of a star are 3 minutes and 56 seconds earlier than those in the previous day. The only long-term changes are caused by precession and the star's proper motion, which occurs on a very long time scale.</p>",$(m).append(h),h="<p>In the table below, the angles beside the rise time is the azimuth of the star at the rise time. Azimuth is measured from north and turning positive towards the east. For stars, the azimuth at the set time is always equal to the negative of the azimuth at the rise time and the azimuth is the same every day. The angle and direction beside the upper transit time is the altitute and direction of the star at transit, which is also the same every day. Atmospheric refraction is added when the altitude is above -1&deg;.</p>",$(m).append(h);var j=t.ra*Math.PI/12,G=t.dec*p,U=.01*(t.epoch-2e3);for(h="<p><button onclick=\"download_csv(csvdata,'star.csv')\">Download csv file</button></p>",$(m).append(h),$(m).append("<table>"),h="<tr><th>Date</th> <th>Rise</th> <th>Transit</th> <th>Set</th> </tr>",$(m).append(h),csvdata="Date, Rise, Transit, Set\n",o=-.009890199094634533,e=t.D1;e<=t.D2;e+=t.deltaD){if(u=CalDat(e).dateString,a=b+g*S,n=getLST0(e-t.tz/24,a+i,c,60*-t.tz),h="<tr> <td>"+u+"</td> ",csvdata+=u+", ",Math.abs(a-U)>.1){var Y=precession_matrix(U,a-U),O=precessed_ra_dec(j,G,Y);j=O.ra,G=O.dec,U=a}var _=riseSetStar(n,o,v,j,G);x=_.rise+" ("+_.azRise+")",F=_.set;if("above"==_.rise?(x="circumpolar",F="circumpolar"):"below"==_.rise&&(x="invisible",F="invisible"),h+="<td>"+x+"</td> <td>",h+=_.transit+" ("+_.altTransit+")</td> <td>",h+=F+"</td></tr>",csvdata+=x+", "+_.transit+" ("+_.altTransit+"), ",csvdata+=F+"\n",++g<=500&&$(m).append(h),1e4==g)break}}}function Quad(t,e,a,i){return((.5*(i+e)-a)*t+.5*(i-e))*t+a}function QuadRootSearch(t,e,a){var i,n,s,r,o,l=.5*(a+t)-e,d=.5*(a-t),h=e;if(Math.abs(l)<1e-6)return i=d>0?1:-1,0==d?(i=0,s=1/0,o=0):(s=-h/d,o=1,Math.abs(s)>1&&(o=0)),{xe:i,ye:n=d*i+h,nroot:o,root1:s,root2:s};n=(l*(i=-.5*d/l)+d)*i+h;var u=d*d-4*l*h;if(u>=0){if(Math.abs(l*h)>.001*u){var p=.5*Math.sqrt(u)/Math.abs(l);s=i-p,r=i+p}else{var c=d+Math.sqrt(u);d<0&&(c=d-Math.sqrt(u));var v=-2*h/c,b=-.5*c/l;s=Math.min(v,b),r=Math.max(v,b)}o=0,Math.abs(s)<=1&&o++,Math.abs(r)<=1&&o++,1==o&&(s=Math.abs(s)<=1?s:r)}else o=0,s=1/0,r=1/0;return{xe:i,ye:n,nroot:o,root1:s,root2:r}}function getTransitTime(t,e,a,i,n){var s,r,o=2*Math.PI,l=[];for(s=0;s<25;s++)l[s]=t-a[s]+.262516170790829*s,l[s]-=o*Math.floor((l[s]+Math.PI)/o);for(s=0;s<24;s++)if(l[s]*l[s+1]<0&&Math.abs(l[s]-l[s+1])<1){r=s;break}if(void 0===r)return{t:"-",alt:"-"};0==r&&(r=1);var d=QuadRootSearch(l[r-1],l[r],l[r+1]);if(1!=d.nroot)return{t:"NA",alt:"NA"};var h=convertHoursToHourMinute(r+d.root1),u=Quad(d.root1,i[r-1],i[r],i[r+1]),p=.5*Math.PI-Math.abs(e-u);if(n){p-=6371*Math.cos(p)/(384400-6371*Math.sin(p))}return p>-.0175&&(p+=atmosphericRefraction(p,101,286)),p=(p*=180/Math.PI).toFixed(1)+"&deg;",{t:h,alt:p+=e<u?" N":" S"}}function getRiseSet(t,e,a,i,n){var s,r,o=Math.cos(a),l=Math.sin(a),d=Math.sin(t),h=[];for(s=0;s<25;s++)r=e-i[s]+.262516170790829*s,h[s]=l*Math.sin(n[s])+o*Math.cos(n[s])*Math.cos(r)-d;var u,p,c,v,b=!1,S=!1;for(s=1;s<25;s+=2){var g=QuadRootSearch(h[s-1],h[s],h[s+1]);if(g.nroot>0&&(1==g.nroot?h[s-1]<0?(u=s,b=!0,c=s+g.root1):(p=s,S=!0,v=s+g.root1):(u=s,p=s,b=!0,S=!0,g.ye>=0?(c=s+g.root1,v=s+g.root2):(v=s+g.root1,c=s+g.root2))),b&&S)break}var m=function(t,a){var s,d,h,u,p,c,v,b,S,g;p=Math.sin(i[t]),c=Math.sin(i[t+1]),b=Quad(a,Math.sin(i[t-1]),p,c),p=Math.cos(i[t]),c=Math.cos(i[t+1]),v=Quad(a,Math.cos(i[t-1]),p,c),S=Math.atan2(b,v),g=Quad(a,n[t-1],n[t],n[t+1]),r=e-S+.262516170790829*(t+a),s=Math.cos(g),d=Math.sin(g),h=s*Math.sin(r),u=s*Math.cos(r)*l-d*o;var m=180+180/Math.PI*Math.atan2(h,u);return m>180&&(m-=360),Math.round(m).toString()+"&deg;"},M="-",$="-",y="-",f="-";return b&&(y=convertHoursToHourMinute(c),M=m(u,c-u)),S&&(f=convertHoursToHourMinute(v),$=m(p,v-p)),b||S||(h[0]>0?(y="above",f="above"):(y="below",f="below")),{rise:y,set:f,azRise:M,azSet:$}}function convertHoursToHourMinute(t){var e=t+.5/60,a=Math.floor(e),i=Math.floor(60*(e-a)).toString();return(a=a.toString()).length<2&&(a="0"+a),i.length<2&&(i="0"+i),a+":"+i}function riseSetStar(t,e,a,i,n){var s=.5*Math.PI,r=180/Math.PI,o=s-Math.abs(a-n),l=-s+Math.abs(a+n),d=12*(i-t)/Math.PI,h=(d-=24*Math.floor(d/24))/1.0027378119113546,u=convertHoursToHourMinute(h),p="";a<n?p="N":a>n&&(p="S");var c,v,b,S=o;if(S>-.0175&&(S+=atmosphericRefraction(o,101,286)),S=(S*=r).toFixed(1)+"&deg; "+p,e<l)c="above",v="above",b="-";else if(e>o)c="below",v="below",b="-";else{Math.sin(i),Math.cos(i);var g=Math.sin(n),m=Math.cos(n),M=Math.sin(a),$=Math.cos(a),y=Math.acos((Math.sin(e)-M*g)/($*m)),f=y+i;h=12*(f-t)/Math.PI,v=convertHoursToHourMinute((h-=24*Math.floor(h/24))/1.0027378119113546),h=12*((f=i-y)-t)/Math.PI,c=convertHoursToHourMinute((h-=24*Math.floor(h/24))/1.0027378119113546),b=Math.atan2(-Math.sin(y)*m,m*Math.cos(y)*M-g*$),b=Math.round(b*r+180).toString()+"&deg;"}return{rise:c,set:v,azRise:b,transit:u,altTransit:S}}function download_csv(t,e){var a=window.document.createElement("a");a.href=window.URL.createObjectURL(new Blob([t],{type:"text/csv"})),a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a)}
