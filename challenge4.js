var John={
    fullName: 'John Smith',
    mass: 139,
    height: 189,
    bmi : function(){
      this.bmi = this.mass/(this.height * this.height);
        return this.bmi;
    }
};

var Mike={
    fullName: 'Mike Smith',
    mass: 132,
    height: 192,
     bmi : function(){
      this.bmi = this.mass/(this.height * this.height);
      return this.bmi;
    }
}
John.bmi();
Mike.bmi();
if(Mike.bmi > John.bmi){
    console.log(Mike);
}else if(John.bmi > Mike.bmi){
    console.log(John);
}else{
    console.log('Drawn');
}
 