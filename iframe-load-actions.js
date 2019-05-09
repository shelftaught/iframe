// send message to trigger lazy loading of covers in iframes
function iFrameLazyLoad () {
	var iframes = document.querySelectorAll('[data-class="st-iframe"]');
	var i;
	for (i = 0; i < iframes.length; i++) {
	    iframes[i].contentWindow.postMessage({type: 'event_trigger', event: 'LazyLoadCovers'},'*')
	};
};
// functions for modal in site browser not in iframe
// fade in element (modal)
function appearElement (element) {
	element.classList.add('open');
	setTimeout(function() {
    	element.classList.add('in');
  	});
};
// close and delete the modal and parent
function closeDeleteModal () {
	var modal = document.getElementById('st-modal')
	modal.classList.remove('in');
	setTimeout(function() {
    	modal.classList.remove('open');
  	});	
  	modal.parentElement.remove();
  	document.body.classList.remove('st-modal-open')
}
// text resizer function
(function(root,factory){"use strict";if(typeof define==="function"&&define.amd){define([],factory)}else if(typeof exports==="object"){module.exports=factory()}else{root.textFit=factory()}})(typeof global==="object"?global:this,function(){"use strict";var defaultSettings={alignVert:false,alignHoriz:false,multiLine:false,detectMultiLine:true,minFontSize:6,maxFontSize:80,reProcess:true,widthOnly:false,alignVertWithFlexbox:false};return function textFit(els,options){if(!options)options={};var settings={};for(var key in defaultSettings){if(options.hasOwnProperty(key)){settings[key]=options[key]}else{settings[key]=defaultSettings[key]}}if(typeof els.toArray==="function"){els=els.toArray()}var elType=Object.prototype.toString.call(els);if(elType!=="[object Array]"&&elType!=="[object NodeList]"&&elType!=="[object HTMLCollection]"){els=[els]}for(var i=0;i<els.length;i++){processItem(els[i],settings)}};function processItem(el,settings){if(!isElement(el)||!settings.reProcess&&el.getAttribute("textFitted")){return false}if(!settings.reProcess){el.setAttribute("textFitted",1)}var innerSpan,originalHeight,originalHTML,originalWidth;var low,mid,high;originalHTML=el.innerHTML;originalWidth=innerWidth(el);originalHeight=innerHeight(el);if(!originalWidth||!settings.widthOnly&&!originalHeight){if(!settings.widthOnly)throw new Error("Set a static height and width on the target element "+el.outerHTML+" before using textFit!");else throw new Error("Set a static width on the target element "+el.outerHTML+" before using textFit!")}if(originalHTML.indexOf("textFitted")===-1){innerSpan=document.createElement("span");innerSpan.className="textFitted";innerSpan.style["display"]="inline-block";innerSpan.innerHTML=originalHTML;el.innerHTML="";el.appendChild(innerSpan)}else{innerSpan=el.querySelector("span.textFitted");if(hasClass(innerSpan,"textFitAlignVert")){innerSpan.className=innerSpan.className.replace("textFitAlignVert","");innerSpan.style["height"]="";el.className.replace("textFitAlignVertFlex","")}}if(settings.alignHoriz){el.style["text-align"]="center";innerSpan.style["text-align"]="center"}var multiLine=settings.multiLine;if(settings.detectMultiLine&&!multiLine&&innerSpan.scrollHeight>=parseInt(window.getComputedStyle(innerSpan)["font-size"],10)*2){multiLine=true}if(!multiLine){el.style["white-space"]="nowrap"}low=settings.minFontSize+1;high=settings.maxFontSize+1;while(low<=high){mid=parseInt((low+high)/2,10);innerSpan.style.fontSize=mid+"px";if(innerSpan.scrollWidth<=originalWidth&&(settings.widthOnly||innerSpan.scrollHeight<=originalHeight)){low=mid+1}else{high=mid-1}}innerSpan.style.fontSize=mid-1+"px";if(settings.alignVert){addStyleSheet();var height=innerSpan.scrollHeight;if(window.getComputedStyle(el)["position"]==="static"){el.style["position"]="relative"}if(!hasClass(innerSpan,"textFitAlignVert")){innerSpan.className=innerSpan.className+" textFitAlignVert"}innerSpan.style["height"]=height+"px";if(settings.alignVertWithFlexbox&&!hasClass(el,"textFitAlignVertFlex")){el.className=el.className+" textFitAlignVertFlex"}}}function innerHeight(el){var style=window.getComputedStyle(el,null);return el.clientHeight-parseInt(style.getPropertyValue("padding-top"),10)-parseInt(style.getPropertyValue("padding-bottom"),10)}function innerWidth(el){var style=window.getComputedStyle(el,null);return el.clientWidth-parseInt(style.getPropertyValue("padding-left"),10)-parseInt(style.getPropertyValue("padding-right"),10)}function isElement(o){return typeof HTMLElement==="object"?o instanceof HTMLElement:o&&typeof o==="object"&&o!==null&&o.nodeType===1&&typeof o.nodeName==="string"}function hasClass(element,cls){return(" "+element.className+" ").indexOf(" "+cls+" ")>-1}function addStyleSheet(){if(document.getElementById("textFitStyleSheet"))return;var style=[".textFitAlignVert{","position: absolute;","top: 0; right: 0; bottom: 0; left: 0;","margin: auto;","display: flex;","justify-content: center;","flex-direction: column;","}",".textFitAlignVertFlex{","display: flex;","}",".textFitAlignVertFlex .textFitAlignVert{","position: static;","}"].join("");var css=document.createElement("style");css.type="text/css";css.id="textFitStyleSheet";css.innerHTML=style;document.body.appendChild(css)}});
// receive html from shelftaught through iframe postmessage
function stReceiveMessage(event) {
	if (event.origin === "https://shelftaught.com") {
		if (event.data.search('modal') !== -1) {
			var parser = new DOMParser;
			var dom = parser.parseFromString('<!doctype html><body>' + event.data,'text/html');
			var modal_string = dom.body.textContent;
			var modal_container = document.createElement('div');
			modal_container.innerHTML = modal_string;
			var body = document.body;
			body.appendChild(modal_container);
			var modal = document.getElementById('st-modal');
			appearElement(modal);
			body.classList.add('st-modal-open')
			document.querySelectorAll("[data-dismiss='modal']").forEach(function(elem) {
				elem.addEventListener("click", closeDeleteModal);
			});
			document.querySelectorAll("[data-trigger='resize_text']").forEach(function(elem) {
				var parent = elem.parentElement;
				var set_width = parent.offsetWidth;
				var set_height = parent.offsetHeight;
				elem.style.width = set_width;
				elem.style.height = set_height;
				elem.style.display = 'inline-block';
				textFit(elem, {multiLine: true, alignHoriz: true, minFontSize:10, maxFontSize: 30});
			});
		}
	}
};

// resize iframe and send dimensions to iframe to send on to show dialogs
iFrameResize();
//add site event listener for html from shelftaught through iframe
window.addEventListener("message", stReceiveMessage);
//lazyload covers through iframe message.
iFrameLazyLoad();
// iFrameResize({
// 	resizedCallback: function ({iframe,height,width,type}) {
// 		iframe.contentWindow.postMessage({type: 'event_trigger', 
// 			event: 'set_book_review_iframe_dimensions', 
// 			iframe_height: height, 
// 			iframe_width: width},
// 			'*');
// 		}
// 	});