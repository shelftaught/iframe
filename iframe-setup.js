function setupDynamicIframe() {
	[
	  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
	  'file:///C:/Users/Duncan/Desktop/iframeres.js'
	].forEach(function(src) {
	  var script = document.createElement('script');
	  script.src = src;
	  script.async = false;
	  document.head.appendChild(script);
	});
}