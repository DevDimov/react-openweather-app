(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{18:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a(10),s=a.n(n),r=a(9),i=a(2),o=a.n(i),l=a(7),u=a(6),d=a(3),m=a(0),h=function(e){var t=e.headerData,a=e.tempUnit,c=e.setTempUnit;return Object(m.jsxs)("div",{className:"d-flex fd-column p-relative location-header",children:[Object(m.jsxs)("div",{className:"d-flex f-wrap location-info",children:[Object(m.jsx)("h3",{children:t.name}),Object(m.jsxs)("div",{className:"d-flex",children:[Object(m.jsxs)("div",{className:"d-flex f-wrap icon-info",children:[Object(m.jsx)("img",{className:"icon",src:t.icon,alt:"icon"}),Object(m.jsxs)("h3",{id:"header-current-temp",children:[t.temp,"\xb0"]})]}),Object(m.jsx)("div",{id:"temp-units-switch",className:"d-flex fd-column overflow-y-hidden",onClick:function(){var e,t=document.getElementsByClassName("temp-units"),n=Object(l.a)(t);try{for(n.s();!(e=n.n()).done;){e.value.classList.toggle("slideup")}}catch(s){n.e(s)}finally{n.f()}setTimeout((function(){c("C"===a?"F":"C")}),1e3)},children:Object(m.jsxs)("div",{className:"F"===a?"d-flex fd-column temp-units slideup":"d-flex fd-column temp-units",children:[Object(m.jsx)("span",{children:"C"}),Object(m.jsx)("span",{children:"F"})]})})]})]}),Object(m.jsx)("p",{children:t.weather})]})},p=a.p+"static/media/chevron-right-solid.93bc49d8.svg",j=function(e){var t=e.buttonClass,a=e.imgClass;return Object(m.jsx)("button",{className:t,onClick:function(e){var t=e.currentTarget,a=e.currentTarget.parentElement.childNodes[0];"scroll-button-right"===t.className&&(a.scrollLeft+=170),"scroll-button-left"===t.className&&(a.scrollLeft-=170)},children:Object(m.jsx)("img",{className:a,src:p,alt:"chevron"})})},f=function(e){var t=e.hourDetails,a=e.tempUnit;return Object(m.jsxs)("div",{className:"hour-details collapsed",children:[Object(m.jsx)("p",{className:"font-weight-600",children:t.description}),Object(m.jsxs)("p",{children:["Feels like ",Object(m.jsxs)("span",{children:[t.feels_like,"\xb0",a]})]}),Object(m.jsxs)("p",{children:["Cloudiness ",Object(m.jsxs)("span",{children:[t.cloudiness,"%"]})]}),Object(m.jsxs)("p",{children:["Wind speed ",Object(m.jsxs)("span",{children:[t.wind_speed," m/s"]})]})]})},b=function(e){var t=e.time,a=e.icon,c=e.temp,n=e.hourDetails,s=e.onClick,r=e.tempUnit;return Object(m.jsxs)("div",{className:"hourly-block-container",children:[Object(m.jsxs)("div",{className:"hourly-block",onClick:s,children:[Object(m.jsx)("p",{children:t}),Object(m.jsx)("img",{className:"icon",src:a,alt:"icon"}),Object(m.jsxs)("p",{className:"hourly-temp",children:[c,"\xb0"]})]}),Object(m.jsx)(f,{hourDetails:n,tempUnit:r})]})},x=a(11),v=function(e){var t=e.hourData,a=e.activeDayTab,n=e.tempUnit,s=t.filter((function(e){return e.weekDay===a}))[0],r=Object(c.useRef)(),i=function(e){var t=e.currentTarget.nextSibling;null===r.current||void 0===r.current?(r.current=t,r.current.classList.toggle("collapsed")):r.current===t?(r.current.classList.toggle("collapsed"),r.current=null):(r.current.classList.toggle("collapsed"),r.current=t,r.current.classList.toggle("collapsed"))};return Object(c.useEffect)((function(){r.current&&(r.current.classList.toggle("collapsed"),r.current=null)})),Object(m.jsxs)("div",{className:"d-flex p-relative",children:[Object(m.jsx)("div",{className:"hourly-forecast",children:s.hourly_data.map((function(e,t){return Object(m.jsx)(b,{time:e.time_string,icon:e.icon,temp:e.temp,tempUnit:n,hourDetails:e,onClick:i},Object(x.a)(3))}))}),Object(m.jsx)(j,{buttonClass:"scroll-button-left",imgClass:"chevron-left"}),Object(m.jsx)(j,{buttonClass:"scroll-button-right",imgClass:"chevron-right"})]})},O=function(e){var t=e.dayTab,a=e.activeDayTab,c=e.style,n=e.handleOnChange,s="tab"+e.index+"_"+e.locationName;return Object(m.jsxs)("div",{className:"day-block",children:[Object(m.jsx)("input",{type:"radio",id:s,checked:a===t.dayName,value:t.dayName,onChange:n}),Object(m.jsxs)("label",{htmlFor:s,className:"label-radio",children:[Object(m.jsx)("p",{className:"week-day",children:t.dayName}),Object(m.jsxs)("p",{children:[t.maxTemp,"\xb0"]})]}),Object(m.jsx)("label",{htmlFor:s,className:"daytab-image",style:c})]})},g=function(e){var t=e.dailyMax,a=e.activeDayTab,c=e.setActiveTab,n=e.locationName,s=function(e){c(e.target.value)};return Object(m.jsx)("div",{className:"daily-forecast",children:t.map((function(e,t){var c={backgroundImage:"url(".concat(e.maxTempIcon,")")};return Object(m.jsx)(O,{dayTab:e,activeDayTab:a,handleOnChange:s,style:c,index:t,locationName:n},t)}))})},y=function(e){var t=e.hourData,a=e.dayData,n=e.locationName,s=e.tempUnit,r=Object(c.useState)(a[0].dayName),i=Object(d.a)(r,2),o=i[0],l=i[1];return Object(m.jsxs)("div",{children:[Object(m.jsx)(v,{hourData:t,activeDayTab:o,tempUnit:s}),Object(m.jsx)(g,{dailyMax:a,activeDayTab:o,setActiveTab:l,locationName:n})]})},N=a.p+"static/media/remove-button.8e71fc2e.svg",D=function(e){var t=e.removeLocation;return Object(m.jsx)("button",{className:"remove-button",onClick:t,children:Object(m.jsx)("img",{className:"remove-icon",src:N,alt:"remove icon"})})},k=function(e){var t=e.location,a=e.data,c=e.tempUnit,n=e.removeLocation,s=e.setTempUnit;return Object(m.jsxs)("div",{className:"d-flex-center fd-column p-relative width-100pct",children:[Object(m.jsx)(D,{removeLocation:function(){return n(t)}}),Object(m.jsxs)("div",{className:"location",children:[Object(m.jsx)(h,{headerData:a.headerData,tempUnit:c,setTempUnit:s}),Object(m.jsx)(y,{hourData:a.hourData,dayData:a.dayData,locationName:t,tempUnit:c})]})]})},w=a.p+"static/media/search-icon.8b597373.svg",C=function(e){var t=e.text;return Object(m.jsx)("p",{id:"status-info-paragraph",children:t})},T=function(e){var t=e.locations,a=e.searchStatus,c=e.setSearchStatus,n=e.getWeather;return Object(m.jsxs)("div",{className:"d-flex-center fd-column",children:[Object(m.jsxs)("div",{className:"search-bar d-flex",children:[Object(m.jsx)("input",{type:"text",placeholder:"Enter a location here",className:"search-input",maxLength:"40",onKeyUp:function(e){return function(e){13!==e.charCode&&13!==e.keyCode||document.getElementsByClassName("search-button")[0].click()}(e)}}),Object(m.jsx)("button",{className:"search-button",onClick:function(){var e=document.getElementsByClassName("search-input")[0],a=e.value.trim().toLowerCase();a.length<3?c("Please enter a valid location name"):t.includes(a)?c("Location already exists"):t.length>=3?c("Sorry, the app supports up to 3 locations only"):(c("Loading weather data for ".concat(a)),n(a),e.value="",e.focus())},children:Object(m.jsx)("img",{className:"search-icon",src:w,alt:"search icon"})})]}),Object(m.jsx)(C,{text:a})]})},S=function(e){return Math.round(9*e/5+32)},_=function(e){return Math.round(5*(e-32)/9)},E=function(e){return{name:e.city.name,icon:"/images/"+e.list[0].weather[0].icon+"@2x.png",temp:Math.round(e.list[0].main.temp),weather:e.list[0].weather[0].main}},U=function(e){var t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a="",c={},n=[],s=[];return e.list.forEach((function(e,r){(c={temp:Math.round(e.main.temp),feels_like:Math.round(e.main.feels_like),description:e.weather[0].description,icon:"/images/"+e.weather[0].icon+"@2x.png",cloudiness:e.clouds.all,wind_speed:e.wind.speed,date_string:e.dt_txt.split(" ")[0],time_string:e.dt_txt.split(" ")[1].slice(0,5)}).description=c.description.charAt(0).toUpperCase()+c.description.slice(1);var i=e.dt_txt.split(" ");if("06:00:00"!==i[1])n.push(c);else if("06:00:00"===i[1]){var o=new Date(i[0]).getDay();a=o-1<0?t[t.length-1]:t[o-1],n.length>0&&(s.push({weekDay:a,hourly_data:n}),n=[]),n.push(c)}})),s},L=function(e){var t=[];return e.forEach((function(e){var a=0,c="",n=e.weekDay;e.hourly_data.forEach((function(e){var t=e.temp;t>a&&(a=t,c=e.icon)})),t.push({dayName:n,maxTemp:a,maxTempIcon:c})})),t},F=function(){var e=Object(c.useState)([]),t=Object(d.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)("C"),i=Object(d.a)(s,2),h=i[0],p=i[1],j=Object(c.useState)([]),f=Object(d.a)(j,2),b=f[0],x=f[1],v=Object(c.useState)(""),O=Object(d.a)(v,2),g=O[0],y=O[1],N=Object(c.useState)(""),D=Object(d.a)(N,2),w=D[0],F=D[1];Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("weather-app-location-list"));e&&M(e)}),[]),Object(c.useEffect)((function(){if(b.length>0&&"F"===h){var e=b.map((function(e){return e.headerData.temp=S(e.headerData.temp),e.hourData.forEach((function(e){e.hourly_data.forEach((function(e){e.temp=S(e.temp),e.feels_like=S(e.feels_like)}))})),e.dayData.forEach((function(e){e.maxTemp=S(e.maxTemp)})),e}));x(e)}else if(b.length>0&&"C"===h){var t=function(e){return e.map((function(e){return e.headerData.temp=_(e.headerData.temp),e.hourData.forEach((function(e){e.hourly_data.forEach((function(e){e.temp=_(e.temp),e.feels_like=_(e.feels_like)}))})),e.dayData.forEach((function(e){e.maxTemp=_(e.maxTemp)})),e}))}(b);x(t)}}),[h]);var M=function(){var e=Object(u.a)(o.a.mark((function e(t){var a,c,s,r,i,u,d,m,p,j,f;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length>0)){e.next=39;break}a=I(),c=[],s={},e.prev=4,r=Object(l.a)(t),e.prev=6,r.s();case 8:if((i=r.n()).done){e.next=23;break}return u=i.value,e.next=12,fetch("/api?q=".concat(u,"&units=").concat(a));case 12:return d=e.sent,e.next=15,d.json();case 15:s=e.sent,m=E(s),p=U(s),j=L(p),f={locationName:u,tempUnit:h,headerData:m,hourData:p,dayData:j},c.push(f);case 21:e.next=8;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(6),r.e(e.t0);case 28:return e.prev=28,r.f(),e.finish(28);case 31:x(c),n(t),F("Last updated at ".concat(A())),e.next=39;break;case 36:e.prev=36,e.t1=e.catch(4),y("Error: ".concat(s.cod,", ").concat(s.message));case 39:case"end":return e.stop()}}),e,null,[[4,36],[6,25,28,31]])})));return function(t){return e.apply(this,arguments)}}(),I=function(){return"C"===h?"metric":"imperial"},B=function(){var e=Object(u.a)(o.a.mark((function e(t){var c,s,i,l,u,d,m;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=I(),s={},i=[t].concat(Object(r.a)(a)),e.prev=3,e.next=6,fetch("/api?q=".concat(t,"&units=").concat(c));case 6:return l=e.sent,e.next=9,l.json();case 9:s=e.sent,u=E(s),d=U(s),m=L(d),x([{locationName:t,tempUnit:h,headerData:u,hourData:d,dayData:m}].concat(Object(r.a)(b))),n(i),J(i),y(""),F("Last updated at ".concat(A())),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(3),y("Error: ".concat(s.cod,", ").concat(s.message));case 24:case"end":return e.stop()}}),e,null,[[3,21]])})));return function(t){return e.apply(this,arguments)}}(),J=function(e){localStorage.setItem("weather-app-location-list",JSON.stringify(e))},W=function(e){var t=a.filter((function(t){return t!==e})),c=b.filter((function(t){return t.locationName!==e}));n(t),x(c),J(t),y(""),0===c.length&&F("")},A=function(){return(new Date).toISOString().split("T")[1].slice(0,5)};return Object(m.jsxs)("div",{className:"d-flex-center fd-column",children:[Object(m.jsx)(T,{locations:a,getWeather:B,searchStatus:g,setSearchStatus:y}),Object(m.jsx)("div",{className:"container d-flex-center fd-column",children:b.map((function(e,t){return Object(m.jsx)(k,{location:e.locationName,data:e,tempUnit:h,setTempUnit:p,removeLocation:W},t)}))}),Object(m.jsx)(C,{text:w})]})};s.a.render(Object(m.jsx)(F,{}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.af197608.chunk.js.map