class JMBG{
/*

https://en.wikipedia.org/wiki/Unique_Master_Citizen_Number#Composition
*/
constructor(jmbg){
	if(jmbg.length < 12 || jmbg.length >13){
    	console.log("JMBG: length error 11<JMB<14")
    	return false;
	}
	if(!jmbg.match(/^\d+$/)){
	console.log("JMBG: only numbers!")
	return false;
	}
	this.jmbg = jmbg;
	
	//functions
	//create a array from string
	this.GetNumsAtray = function(jmbg){
		return jmbg.split("");
	}
	//get checksum
	this.validation = function(jmbg){
		let K = 11 -
		(7 * (Number(jmbg[0]) + Number(jmbg[6])) +
		6 * (Number(jmbg[1]) + Number(jmbg[7])) +
		5 * (Number(jmbg[2]) + Number(jmbg[8])) +
		4 * (Number(jmbg[3]) + Number(jmbg[9])) +
		3 * (Number(jmbg[4]) + Number(jmbg[10])) +
		2 * (Number(jmbg[5]) + Number(jmbg[11]))) %
		11;
		
		console.log(K)
		if(K>9){
			K = 0;
		}
		return K;
	}
	
	}
	//is checksum valid
	isValid(){
	
	try{
	if(this.jmbg.match(/^\d{13}$/)){
		
		let ar = this.GetNumsAtray(this.jmbg);
		let v = this.validation(ar);
		if(ar[12] == v){
			return true;
		}
		console.log("JMBG: not Valid");
		return false;
		
	}
	}catch(e){
	console.log("JMBG: only 13 numbers!")
	return false;
	}
/*		if(this.jmbg.match(/^\d{13}$/)){
			
			let ar = this.GetNumsAtray(this.jmbg);
			let v = this.validation(ar);
			if(ar[12] == v){
				return true;
			}
			console.log("JMBG: not Valid");
			return false;
			
		}else{
			console.log("JMBG: only 13 numbers!")
			return false;
		}*/
		
	}
	
	/*
	Parse data
	
	langs = {
	        	1: English
	        	2: Crnogorski
	        	3: Українська
	        	4: Русский
	        }
	
	options = {
			       ignoreValidation: false,
			       getGender: true,
			       getYO:true,
			       getUTime: true,
			       getRegion: true,
			       lang: 1
			       
	
	          }
	*/
	parse(options){
	
	const igVld = (options.ignoreValidation) ? options.ignoreValidation:false;
	const gGndr = (options.getGender) ? options.getGender:true;
	const gYOld = (options.getYO) ? options.getYO:true;
	const gUTim = (options.getUTime) ? options.getUTime:true;
	const gRegn = (options.getRegion) ? options.getRegion:true;
	const  Lang = (options.lang) ? 1/*options.lang*/:1;
	let jmbgA = {
	jmbg: this.jmbg,
	birth_date: []
}
	
	let Vald = this.isValid();
	let pjmbg = this.GetNumsAtray(this.jmbg);
	
	
	//validation
	if(igVld){
		jmbgA.valid =  Vald;
	}else{
		if(!Vald){
		return false;
		}else{
		jmbgA.valid = Vald;
		}
	}
	
	//gender
	if(gGndr){
		let g = parseInt(pjmbg[9]+pjmbg[10]+pjmbg[11]);
		if(g<500){
		jmbgA.gender = "M"
		}else{
		jmbgA.gender = "W"
		}
	}
	//Date of birth
	let day   = parseInt(pjmbg[0]+pjmbg[1]);
	let mouth = parseInt(pjmbg[2]+pjmbg[3]);
	let year  = parseInt(pjmbg[4]+pjmbg[5]+pjmbg[6]);
	if(day>31){
	return false;
	}else{
	jmbgA.birth_date[0] = day;
	}
	if(mouth>12){
	return false;
	}else{
	jmbgA.birth_date[1] = mouth;
	}
	if(parseInt(pjmbg[4]) == 9){
	jmbgA.birth_date[2] = 1000+year
	}else{
	jmbgA.birth_date[2] = 2000+year
	}
	
	//get Years old
	if(gYOld){
	jmbgA.age = new Date().getFullYear()-jmbgA.birth_date[2];
	}

    //Unix timestamp
	if(gUTim){
	jmbgA.timestamp = (new Date(jmbgA.birth_date[2]+"-"+jmbgA.birth_date[1]+"-"+jmbgA.birth_date[0]).getTime()) / 1000
	}
	
	//get country
	let countr = parseInt(pjmbg[7]+pjmbg[8])
	
	let langArray = {}
	switch(Lang){
	case 1:
	//English
	langArray["c"+0]=("Foreign citizens")
		langArray[""+0]=("null or Croatia")
		langArray[""+1]=("foreigners in Bosnia and Herzegovina")
		langArray[""+2]=("foreigners in Montenegro")
		langArray[""+3]=("foreigners in Croatia")
		langArray[""+4]=("foreigners in Macedonia")
		langArray[""+5]=("foreigners in Slovenia")
		langArray[""+6]=("foreigners in Central Serbia")
		langArray[""+7]=("foreigners in Vojvodina")
		langArray[""+8]=("foreigners in Kosovo")
		langArray[""+9]=("null")
	langArray["c"+10]=("Bosnia and Herzegovina")
		langArray[""+10]=("Banja Luka")
		langArray[""+11]=("Bihać")
		langArray[""+12]=("Doboj")
		langArray[""+13]=("Goražde")
		langArray[""+14]=("Livno")
		langArray[""+15]=("Mostar")
		langArray[""+16]=("Prijedor")
		langArray[""+17]=("Sarajevo")
		langArray[""+18]=("Tuzla")
		langArray[""+19]=("Zenica")
	langArray["c"+20]=("Montenegro")
		langArray[""+20]=("null")
		langArray[""+21]=("Podgorica, Danilovgrad, Kolašin")
		langArray[""+22]=("Bar, Ulcinj")
		langArray[""+23]=("Budva, Kotor, Tivat")
		langArray[""+24]=("Herceg-Novi")
		langArray[""+25]=("Cetinje")
		langArray[""+26]=("Nikšić, Plužine, Šavnik")
		langArray[""+27]=("Berane, Rožaje, Plav, Andrijevica")
		langArray[""+28]=("Bijelo Polje, Mojkovac")
		langArray[""+29]=("Pljevlja, Žabljak")
	langArray["c"+30]=("Croatia")
		langArray[""+30]=("Osijek, Slavonia region")
		langArray[""+31]=("Bjelovar, Virovitica, Koprivnica, Pakrac, Podravina region")
		langArray[""+32]=("Varaždin, Međimurje region")
		langArray[""+33]=("Zagreb")
		langArray[""+34]=("Karlovac, Kordun region")
		langArray[""+35]=("Gospić, Lika region")
		langArray[""+36]=("Rijeka, Pula, Gorski kotar, Istria and Croatian Littoral regions")
		langArray[""+37]=("Sisak, Banovina region")
		langArray[""+38]=("Split, Zadar, Šibenik, Dubrovnik, Dalmatia region")
		langArray[""+39]=("Hrvatsko Zagorje and mixed")
	langArray["c"+40]=("Macedonia")
	    langArray[""+41]=("Bitola")
	    langArray[""+42]=("Kumanovo")
	    langArray[""+43]=("Ohrid")
	    langArray[""+44]=("Prilep")
	    langArray[""+45]=("Skopje")
	    langArray[""+46]=("Strumica")
	    langArray[""+47]=("Tetovo")
	    langArray[""+48]=("Veles")
	    langArray[""+49]=("Štip")
	langArray["c"+50]=("Slovenia")
		langArray[""+50]=("all")
	langArray["c"+60]=("Citizens with temporary residence")
	langArray["c"+70]=("Central Serbia")
		langArray[""+70]=("Serbian diplomatic/consular")
		langArray[""+71]=("Belgrade region")
		langArray[""+72]=("Šumadija and Pomoravlje regions (Šumadija District and Pomoravlje District)")
		langArray[""+73]=("Niš region (Nišava District, Pirot District and Toplica District)")
		langArray[""+74]=("Southern Morava region (Jablanica District and Pčinja District)")
		langArray[""+75]=("Zaječar region (Zaječar District and Bor District)")
		langArray[""+76]=("Podunavlje region (Podunavlje District and Braničevo District)")
		langArray[""+77]=("Podrinje and Kolubara regions (Mačva District and Kolubara District)")
		langArray[""+78]=("Kraljevo region (Raška District, Moravica District and Rasina District)")
		langArray[""+79]=("Užice region (Zlatibor District)")
	langArray["c"+80]=("Srbija Vojvodina")
		langArray[""+80]=("Novi Sad region (South Bačka District)")
		langArray[""+81]=("Sombor region (West Bačka District)")
		langArray[""+82]=("Subotica region (North Bačka District)")
		langArray[""+83]=("null")
		langArray[""+84]=("Kikinda region (North Banat District)")
		langArray[""+85]=("Zrenjanin region (Central Banat District)")
		langArray[""+86]=("Pančevo region (South Banat District)")
		langArray[""+87]=("Vršac region (South Banat District)")
		langArray[""+88]=("Ruma region (part of Syrmia District)")
		langArray[""+89]=("Sremska Mitrovica region (part of Syrmia District)")
	langArray["c"+90]=("Kosovo")
		langArray[""+90]=("null")
		langArray[""+91]=("Priština region (Kosovo District)")
		langArray[""+92]=("Kosovska Mitrovica region (Kosovska Mitrovica District)")
		langArray[""+93]=("Peć region (part of Peć District)")
		langArray[""+94]=("Đakovica region (part of Peć District)")
		langArray[""+95]=("Prizren region (Prizren District)")
		langArray[""+96]=("Gnjilane region (Kosovo-Pomoravlje District)")

	
	
	
	break;
	case 2:
	//Crnogorski
	break;
	case 3:
	//Українська
	break;
	case 4:
	//Русский
	break;
	}
	
	//parse sity
	if(countr < 10){
	//foreign citizens
		jmbgA.country = langArray["c0"]
	}else if(countr > 9 && countr < 20){
	//BiH
		jmbgA.country = langArray["c10"]
	}else if(countr > 19 && countr < 30){
	//CG
        jmbgA.country = langArray["c20"]
	}else if(countr > 19 && countr < 30){
	//Hrvatska
	    jmbgA.country = langArray["c30"]
	}else if(countr == 40){
	//Makedonija 40 false
		return false;
	}else if(countr > 40 && countr < 50){
	//Makedonija 
	jmbgA.country = langArray["c40"]
	}else if(countr == 50){
	//Slovenija samo 50 
		jmbgA.country = langArray["c50"]
	}else if(countr > 50 && countr < 60){
	//Slovenija >50 false
		return false;
	}else if(countr > 59 && countr < 70){
	//Privremeni boravak
		jmbgA.country = langArray["c60"]
	}else if(countr > 69 && countr < 80){
	//Srbija
		jmbgA.country = langArray["c70"]
	}else if(countr > 79 && countr < 90){
	//Vojvodina
		jmbgA.country = langArray["c80"]
	}else if(countr > 89 && countr < 100){
	//Kosovo
		jmbgA.country = langArray["c90"]
	}

	if(gRegn){
	jmbgA.region = langArray[""+countr]
	}

	
	
	return jmbgA
    }
}