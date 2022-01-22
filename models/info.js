const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'info.json');

module.exports = class Info {
    constructor(firstName, lastName, age, residence, imageUrl, 
        userHighschool, lastGymnasium, userUniversity,
        userProgramming, lastBackend, userFrontend, userVersion,
        userTime, lastCreative, userTeamwork
        ){
        // Personal Inf
        this.userFirst = firstName;
        this.lastName = lastName;
        this.userAge = age;
        this.userResidance = residence;
        this.imageUrl = imageUrl;
        // Education
        this.userHighschool = userHighschool;
        this.lastGymnasium = lastGymnasium;
        this.userUniversity = userUniversity;
        //Technical
        this.userProgramming = userProgramming;
        this.lastBackend = lastBackend;
        this.userFrontend = userFrontend;
        this.userVersion = userVersion;
        //Softskills
        this.userTime = userTime;
        this.lastCreative = lastCreative;
        this.userTeamwork = userTeamwork;
    }

    saveInfo(){
        //read file content first
        fs.readFile(filePath, (error, fileContent) => {
            let infos = [];

            if(!error){
                infos = JSON.parse(fileContent);
            }
            else {
                console.log(error);
            }

            infos.push(this); //newWish.saveWish();

            fs.writeFile(filePath, JSON.stringify(infos), (error) =>{
                if(!error){
                    console.log('info saved.');
                }
            });

        });
    }


    static fetchInfos(callBack){
        fs.readFile(filePath, (error, fileContent) => {
            if(error) {
                callBack([]);
            }

            callBack(JSON.parse(fileContent));
        });
    }    

    static deleteInfo(infoToDelete){
        fs.readFile(filePath, (error, fileContent) => {
            let infos = [];
            if(!error){
                infos = JSON.parse(fileContent);
            }

            for(let i = 0; i < infos.length; i++) {
                if(infos[i].description === infoToDelete){
                    infos.splice(i, 1);
                    break;
                }
            }

            fs.writeFile(filePath, JSON.stringify(infos), (error) => {
                if(!error){
                    console.log('Item successfully deleted.');
                }
            });

        });
    }
    
}