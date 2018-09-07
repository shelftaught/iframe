// resize iframe and send dimensions to iframe to send on to show dialogs
iFrameResize({
	resizedCallback: function ({iframe,height,width,type}) {
		iframe.contentWindow.postMessage({type: 'event_trigger', 
			event: 'set_book_review_iframe_dimensions', 
			iframe_height: height, 
			iframe_width: width},
			'*');
		}
	});
// send message to trigger lazy loading of covers in iframes
var iframes = document.querySelectorAll("iframe");
var i;
for (i = 0; i < iframes.length; i++) {
    iframes[i].contentWindow.postMessage({type: 'event_trigger', event: 'LazyLoadCovers'},'*')
}