
var model = {
	currentCat: null,
	cats : [
		{
			name: "Fluffy",
			image: "cat_picture1.jpg",
			count: 0
		},
		{
			name: "Thomas",
			image: "cat_picture2.jpeg",
			count: 0
		},
		{
			name: "Tiny Tim",
			image: "cat_picture3.jpeg",
			count: 0
		},
		{
			name: "Triton",
			image: "cat_picture4.jpeg",
			count: 0
		}
	]
			
};


var octopus = {
	init: function(){
		model.currentCat = model.cats[0];
		//console.log(model.cats[0]);
		catListView.init();
		catView.init();
		adminView.init();
	},

	getCurrentCat: function(){
		return model.currentCat;

	},

	 getCats: function() {
        return model.cats;
    },

	setCurrentCat: function(cat) {
		model.currentCat = cat;
		catView.render();
		adminView.render();
	},

	incrementCounter: function(){
		model.currentCat.count++;
		catView.render();
		adminView.render();
	},

	updateCurrentCatInfo: function(cat){
		model.currentCat.name = cat.name;
		model.currentCat.image = cat.image;
		model.currentCat.count = cat.count;
		catView.render();
		adminView.render();
		catListView.render();

	}

};


var catView = {
	init: function(){
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();


		});

		this.render();
		},

	render: function() {
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.count;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.image;

	}

};

var catListView = {

	init: function(){
		this.catListElem = document.getElementById('cat-list');
		//console.log(this.catListElem);
		this.render();

	},

	render: function(){
		var cat, elem, i;

		var cats = octopus.getCats();

		this.catListElem.innerHTML = '';

		for (i=0; i <cats.length; i++){
			cat = cats[i];

			elem = document.createElement('button');
			elem.textContent = cat.name;

			elem.addEventListener('click', (function(catCopy){
				return function(){
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			this.catListElem.append(elem);
		}
	}
};

var adminView = {
	init: function(){
		this.adminButton = document.getElementById('adminButton');
		this.adminSection = document.getElementById('admin-form');
		this.nameField = document.getElementById('nameField');
		this.clickCount = document.getElementById('countField');
		this.imageURL = document.getElementById('imageField');
		this.saveButton = document.getElementById('saveButton');
		this.cancelButton = document.getElementById('cancelButton');
		this.adminSection.style.display = 'none';
		


		var showAdminDiv = function(){
			var x = document.getElementById('admin-form');
			if (x.style.display==='none'){
				x.style.display = 'block';
			} else {
				x.style.display = 'none';
			}

		};

		var updateCat = function(){
			var newCat = octopus.getCurrentCat();
			console.log(document.getElementById('nameField').value);
			this.count = document.getElementById('countField')
			this.image = document.getElementById('imageField');
			newCat.name = document.getElementById('nameField').value;
			newCat.count = document.getElementById('countField').value;
			newCat.image = this.image.value;
			octopus.updateCurrentCatInfo(newCat);
			console.log(newCat.name);
			console.log(newCat);

		}

		var cancelUpdates = function(){
			var currentCat = octopus.getCurrentCat();

			this.nameField.value = currentCat.name;
			document.getElementById('countField').value = currentCat.count;
			document.getElementById('imageField').value = currentCat.image;
			showAdminDiv();
			
		}

		this.adminButton.addEventListener('click',showAdminDiv);
		this.render();
		this.saveButton.addEventListener('click',function(){updateCat();});
		this.cancelButton.addEventListener('click',function(){cancelUpdates();});
	},
 
	render: function(){
		var currentCat = octopus.getCurrentCat();

		this.nameField.value = currentCat.name;
		this.clickCount.value = currentCat.count;
		this.imageURL.value = currentCat.image;
	}
};
	
octopus.init();

