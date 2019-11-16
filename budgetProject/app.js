var budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value / totalIncome) *100);
        }else{
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };   

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum+=current.value;
        });
        data.totals[type] = sum;
    };
    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals:{
            exp: 0,
            inc: 0
        },
        budget:0,
        percentage:-1
    };
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            //create a new ID, 
            var length = data.allItems[type].length;
            //create new item based on inc or exp
            if(length>0){
                ID = data.allItems[type][length-1].id +1;
            }
            else{
                ID = 0;
            }
            if(type=== 'exp'){

                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        }, 
        deleteItem: function(type, id){
            var index, ids;
            // ids is an array that store the id, since there is no such an array before, we just have object array
            ids = data.allItems[type].map(function(current){
                //map return a new array
                return current.id;
            });
            index = ids.indexOf(id);
            if(index!==-1){
                //remove it.
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentage of income that we spent
            if(data.totals.inc >0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
            }else{
                data.percentage = -1;
            }
        },

        calculatePercentage: function(){
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });

        },

        getPercentages: function(){
            var allPercentages = data.allItems.exp.map(function(current){
                return current.getPercentage();
            })
            return allPercentages;
        },

        getBudget:function(){
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
        },
        test:function(){
            console.log(data);
        }
    };
})();

var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputButton :'.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    var formatNumber = function(num, type){
        var numSplit,int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int  = numSplit[0];

        if(int.length>3){
            int = int.substr(0,int.length - 3)+','+int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];

        return  (type==='exp'? '-': '+') + ' ' + int + '.'+ dec;
    };
    
    var nodeListForEach = function(list, callback){
        for(var i=0;i< list.length; i++){
            callback(list[i], i);
        }
    };
    
    return {
        getinput: function(){
            return{
                type : document.querySelector(DOMstrings.inputType).value,//either inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        deleteList: function(selectorID){

            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        addList: function(object, type){
            var html, newHtml, element;
            //create HTML string with placeholder text
            if(type==='inc'){
                element = DOMstrings.incomeContainer;
                html= '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else{
                element = DOMstrings.expenseContainer;
                html= '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            //replace the placeholder text with some actual data
            newHtml = html.replace('%id%', object.id);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', formatNumber(object.value, type));
            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function(){
            var fields, fieldsArr;
            fields =  document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue); 
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            })
            fieldsArr[0].focus();
        },
        displayBudget: function(obj){
            obj.budget > 0 ? type = 'inc': type='exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome,'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExpenses,'exp');
            if(obj.percentage >0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }  
        },
        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index]>0){
                    current.textContent = percentages[index]+'%';
                }else{
                    current.textContent = '---';
                }

            });
        },

        displayMonth: function(){
            var now, year, month;
            now = new Date();   
            year = now.getFullYear();
            months = ['January', 'Feburary', 'March','April','May','June','July','August','September','October','November','December'];
            month = now.getMonth();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month]+' '+year;
        },

        changeType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ','+
                DOMstrings.inputDescription+','+
                DOMstrings.inputValue
            );
            nodeListForEach(fields, function(current){
                current.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

var controller = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.keyCode===13 || event.which === 13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType );
    };
    var updateBudget= function(){
        //calculate budget
        budgetCtrl.calculateBudget();
        //return it
        var budget = budgetCtrl.getBudget();
        //display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    var updatePercentage = function(){
        //calculate percentage
        budgetCtrl.calculatePercentage();
        //read from budget controller
        var percentages = budgetCtrl.getPercentages();
        //update UI
        UICtrl.displayPercentages(percentages);
    };
    var ctrlAddItem = function(){
        var input, newItem;
        //1. Get field input data
        input = UICtrl.getinput();
        if(input.type!=="" &&input.description!=="" && !isNaN(input.value)&&input.value > 0){
            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3. Add the item to the UI

            UICtrl.addList(newItem, input.type);
            //3.1 clear the fields
            UICtrl.clearFields();
            //Caclulate it
            updateBudget();
            //Calculate and update percentage
            updatePercentage();
        }
    };
    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id ;
        if(itemID){
            //income-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            //delete it from data structure
            budgetCtrl.deleteItem(type, ID);
            //delete it from UI
            UICtrl.deleteList(itemID);
            //update and show new budget
            updateBudget();
            updatePercentage();
        }
    };
    return {
        init: function(){
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: -1
            });
            setupEventListeners();

        }
    }
})(budgetController, UIController);

controller.init();