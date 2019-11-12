var budgetController = (function(){
    var x = 23;
    var add = function(a){
        return x + a;
    }
    return {
        publicTest: function(b){
            return add(b);
        }
    }
})();

var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputButton :'.add__btn'
    }
    return {
      getinput: function(){
          return{
          type : document.querySelector(DOMstrings.inputType).value,//either inc or exp
          description : document.querySelector(DOMstrings.inputDescription).value,
          value : document.querySelector(DOMstrings.inputValue).value
      }
     },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

var controller = (function(budgetCtrl, UICtrl){
    var DOM = UICtrl.getDOMstrings();
    var ctrlAddItem = function(){
        //1. Get field input data
        var input = UICtrl.getinput();
        console.log(input);
        //2. Add the item to the budget controller
        //3. Add the item to the UI
        //4. Calculate the budget
        //5. Display the budget 
     
    }
    
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress',function(event){
       if(event.keyCode===13 || event.which === 13){
        ctrlAddItem();
       }
    });
})(budgetController, UIController);