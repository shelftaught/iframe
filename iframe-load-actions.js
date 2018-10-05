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