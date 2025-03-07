let scoreKey1 = "score1"
let scoreKey2 = "score2"
let Student = function(name,age,score1,score2){
   this.name=name;
   this.age = age;
   this.score = {
      [scoreKey1]:score1,
      [scoreKey2]:score2
   }
   this.getInfo= function(){
      return `ten : ${this.name} tuoi: ${age}, diem so 1: ${this.score[scoreKey1]}, diem so2 : ${this.score[scoreKey2]}`
   }
}
let student1 = new Student("Tung",16,2,2);
let student2 = new Student("Toan",17,3,4);
let student3 = new Student("Tuan",18,9,10);
let student4 = new Student("Tien",19,8,8);