function setupDynamicIframe() {
	[
	  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
	  'https://cdn.jsdelivr.net/gh/duncangarde/shelftaught-iframe-js/iframe-load-actions.js.min'
	].forEach(function(src) {
	  var script = document.createElement('script');
	  script.src = src;
	  script.async = false;
	  document.head.appendChild(script);
	});
}


      
