function setupDynamicIframe() {
	[
	  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
	  'https://cdn.jsdelivr.net/gh/duncangarde/shelftaught-iframe-js@2.0/iframe-load-actions.js',
	].forEach(function(src) {
	  var script = document.createElement('script');
	  script.src = src;
	  script.async = false;
	  document.head.appendChild(script);
	});
	[
	  'https://cdn.jsdelivr.net/gh/duncangarde/shelftaught-iframe-js@2.0/modal.css'
	].forEach(function(href) {
	  var link = document.createElement('link');
	  link.href = href;
	  link.rel = "stylesheet"
	  link.async = false;
	  document.head.appendChild(link);
	});
}


      
