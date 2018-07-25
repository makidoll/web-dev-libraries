// make sure you set:
//	.container,
//	.container-full,
//	.gallery-item, (div with gallery)
//	.gallery-image, (div with image as bg)

var LightboxGallery = function(galleryEl, images) {
	this.images = images || [];
	this.currentImage = 0;

	// functions
	this.setStyles = function (element, styles) {
		Object.keys(styles).forEach(function(key,_) {
			element.style[key] = styles[key];
		});
	}

	this.openLightbox = function(index) {
		this.currentImage = index;
		this.image.src = this.images[this.currentImage];

		this.lightbox.style.opacity = 0;
		this.lightbox.style.display = "block"
		setTimeout(function() {
			this.lightbox.style.opacity = 1;
		}.bind(this), 100);
	}.bind(this);

	this.closeLightbox = function() {
		this.lightbox.style.opacity = 0;
			setTimeout(function() {
			this.lightbox.style.display = "none";
		}.bind(this), 200);
	}

	this.previousPicture = function() {
		this.currentImage = (this.currentImage<=0)?
			this.images.length-1: this.currentImage-1;
		this.image.src = this.images[this.currentImage];
	}

	this.nextPicture = function() {
		this.currentImage = (this.currentImage>=this.images.length-1)?
			0: this.currentImage+1;
		this.image.src = this.images[this.currentImage];
	}

	// create lightbox element
	this.lightbox = document.createElement("div");
	this.lightbox.className = "animated";
	this.setStyles(this.lightbox, {
		position: "fixed", margin: "auto",
		top: 0, left: 0, right: 0, bottom: 0,
		backgroundColor: "rgba(29,31,33,0.7)",
		zIndex: "999999999",
		display: "none"
	});
	this.lightbox.addEventListener("click", function(e){
		if (e.target == this.lightbox) {
			this.closeLightbox();
		}
	}.bind(this));

	// create image element
	this.imageDiv = document.createElement("div");
	this.imageDiv.className = "container container-full";
	this.setStyles(this.imageDiv, {
		position: "fixed", margin: "auto",
		top: 0, left: 0, right: 0, bottom: 0,
		display: "table",
	});

	this.image = document.createElement("img");
	this.image.src = this.images[this.currentImage];
	this.setStyles(this.image, {
		display: "table-cell", margin: "0 auto",
		width: "calc(100% - 100px)",
		verticalAlign: "middle"
	})

	this.imageDiv.append(this.image);
	this.lightbox.append(this.imageDiv);

	// create navigation buttons
	this.navigation = document.createElement("div");
	this.navigation.className = "container container-full";
	this.setStyles(this.navigation, {
		position: "fixed", margin: "auto",
		top: 0, left: 0, right: 0, bottom: 0,
		display: "table",
	});

	this.left = document.createElement("div");
	this.left.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#fff" viewBox="0 0 24 24"><path d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"/></svg>';
	this.setStyles(this.left, {
		display: "table-cell",
		verticalAlign: "middle",
		float: "left",
		cursor: "pointer"
	});
	this.left.addEventListener("click", function() {
		this.previousPicture();
	}.bind(this));

	this.right = document.createElement("div");
	this.right.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#fff" viewBox="0 0 24 24"><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98a1.25 1.25 0 0 0-1.77 0 1.25 1.25 0 0 0 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg>';
	this.setStyles(this.right, {
		display: "table-cell",
		verticalAlign: "middle",
		float: "right",
		cursor: "pointer"
	});

	this.right.addEventListener("click", function() {
		this.nextPicture();
	}.bind(this));

	this.navigation.append(this.left);
	this.navigation.append(this.right);
	this.lightbox.append(this.navigation);

	// create close button
	this.close = document.createElement("div");
	this.close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#fff" viewBox="0 0 24 24"><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>';
	this.setStyles(this.close, {
		position: "fixed", margin: "auto",
		top: "20px", left: "20px",
		cursor: "pointer"
	});
	this.close.addEventListener("click", function(){
		this.closeLightbox();
	}.bind(this));
	this.lightbox.append(this.close);

	// add keyboard control
	this.keydown = {};

	window.addEventListener("keyup", function(e) {
		this.keydown[e.code] = false;
	}.bind(this));

	window.addEventListener("keydown", function(e) {
		if (this.keydown[e.code] == true) return;
		this.keydown[e.code] = true;
		switch (e.code) {
			case "ArrowLeft": case "KeyA": this.previousPicture(); break;
			case "ArrowRight": case "KeyD": this.nextPicture(); break; 
			case "Escape": this.closeLightbox(); break;
		}
	}.bind(this));

	// spawn lightbox
	document.body.append(this.lightbox);

	// make gallary
	this.images.forEach(function(imageLink,imageIndex){
		let imageEl = document.createElement("a");
		imageEl.style.cursor = "pointer";
		imageEl.innerHTML = '<div class="gallery-item col-4"><div class="gallery-image" style="background-image: url('+imageLink+');"></div></div>';
		imageEl.addEventListener("click", function() {
			this.openLightbox(imageIndex);
		}.bind(this));
		galleryEl.append(imageEl);
	}.bind(this));
} 