function setupDynamicIframe() {
	[
	  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
	  'https://cdn.jsdelivr.net/gh/duncangarde/shelftaught-iframe-js@1.1/iframe-load-actions.js'
	].forEach(function(src) {
	  var script = document.createElement('script');
	  script.src = src;
	  script.async = false;
	  document.head.appendChild(script);
	});
}


      
