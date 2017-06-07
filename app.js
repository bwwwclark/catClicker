
// var cats = $(".cat");
// var buttons = $("button");

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

	updateCurrentCatInfo: function(newName,newImage,newCount){
		model.currentCat.name = newName;
		model.currentCat.image = newImage;
		model.currentCat.count = newCount;
		console.log(model.currentCat.name);
		catView.render();
		adminView.render();

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
		this.submitButton = document.getElementById('submitButton');
		this.formName=document.getElementById('nameField').value;

		//console.log(this.adminSection);
		this.adminSection.style.display = 'none';
		


		var showAdminDiv = function(){
			var x = document.getElementById('admin-form');
			if (x.style.display==='none'){
				x.style.display = 'block';
			} else {
				x.style.display = 'none';
			}

		};
		this.adminButton.addEventListener('click',showAdminDiv);
		 //this.submitButton.addEventListener('submit',console.log(this.nameField));
		this.render();
	},
 
	render: function(){
		var currentCat = octopus.getCurrentCat();
		//this.adminButton.addEventListener;
		this.nameField.value = currentCat.name;
		this.clickCount.value = currentCat.count;
		this.imageURL.value = currentCat.image;
		this.form = document.getElementById('form');
		this.submitButton.onclick = "octopus.updateCurrentCatInfo(this.nameField.value,this.clickCount.value,this.currentCat.image)";
		//this.submitButton.addEventListener("submit", octopus.updateCurrentCatInfo(this.nameField.value, this.imageURL.value, this.clickCount.value));
		//this.submitButton.addEventListener('submit',console.log(this.nameField));

	}

	// submit: function(){
	// 	//this.formAction = document.getElementById('formAction');
	// 	this.form = document.getElementById('formAction');
	// 	this.submitButton = document.getElementById('submitButton');
	// 	var formName=document.getElementById('nameField').value;
	// 	var formCount=document.getElementById('countField').value;
	// 	var formImage=document.getElementById('imageField').value;
	// 	var formSubmit=document.getElementById('formAction')
	// 	// this.newName = document.getElementById('username').value;
	// 	// this.newCount = this.clickCount.value;
	// 	// this.imageURL = this.imageURL.value;
	// 	//this.form.addEventListener('submit',console.log(formName));


	// }


};
	
octopus.init();



	// show: function(){
	// 	 var x = document.getElementById('admin-form');
 //    if (x.style.display === 'none') {
 //        x.style.display = 'block';
 //    } else {
 //        x.style.display = 'none';
 //    }
	// },

	// click: function(){
	// 	var y = document.getElementById('adminButton');
	// 	y.addEventListener('click', (function(){
	// 			return function(){
	// 				adminView.show();
	// 				console.log("something something");
	// 			};
	// 		}));

	// }
// function showCat(cat){
// 	$("#button"+cat).click(function){
// 		$("#cat"+cat)
// 	}
// }

// function hideAllCats(){
// 	for (var i=0; i<cats.length; i++){
// 		$(cats[i]).hide();
// 	}
// }

// function bindButtonToCat(idNumber){
// 	$("#button"+idNumber).click(function(){
// 		hideAllCats();
// 		$("#cat"+idNumber).show();
// 	})
// }

// function bindCounterToCat(idNumber){
// 	var cat = "#cat"+idNumber
// 	$(cat).click(function(){
// 		var count = $(cat+" > .counter").text();
// 		count = parseInt(count) + 1;
// 		$(cat+" > .counter").text(count);
// 	})
// }

// for (var i=1; i<=buttons.length; i++){
// 	bindButtonToCat(i);
// }

// for (var i=1; i<=cats.length; i++){
// 	bindCounterToCat(i);
// }

// hideAllCats();
// $("#cat1").show();