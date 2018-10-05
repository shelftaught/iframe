function setupDynamicIframe() {
	[
	  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
	  'https://cdn.jsdelivr.net/gh/duncangarde/shelftaught-iframe-js@2.1/iframe-load-actions.js',
	].forEach(function(src) {
	  if (document.querySelectorAll('[src="' + src + '"]').length > 0) {
	  	if (typeof iFrameResize === 'function') {
	  		iFrameResize();
	  	};
	  	if (typeof stReceiveMessage === 'function') {
	  		window.addEventListener("message", stReceiveMessage);
	  	};
	  	if (typeof iFrameLazyLoad === 'function') {
	  		iFrameLazyLoad();
	  	};
	  }
	  else {
		  var script = document.createElement('script');
		  script.src = src;
		  script.async = false;
		  document.head.appendChild(script);
	  };
	});
	[
	  'https://cdn.jsdelivr.net/gh/duncangarde/shelftaught-iframe-js@2.1/modal.css'
	].forEach(function(href) {
	  if (document.querySelectorAll('[href="' + href +'"]').length > 0) {
	  }
	  else {
		  var link = document.createElement('link');
		  link.href = href;
		  link.rel = "stylesheet"
		  link.async = false;
		  document.head.appendChild(link);
	  };
	});
}