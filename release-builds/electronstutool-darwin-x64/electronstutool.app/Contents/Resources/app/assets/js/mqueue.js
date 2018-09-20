

class QElement{
    constructor(element, priority)
    {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue{

    constructor()
    {
        this.items = [];
    }

    enqueue(element,element2, priority)
    {
        var qElement = new QElement(element.id, priority);
        var qElement2 = new QElement(element2.id, priority);
        var contain = false;
        const tabul = document.querySelector('#tabs');
        const newdiv = document.querySelector('#rightside-row');

        for (var i = 0; i < this.items.length; i++) {
                if(this.items[i].priority > qElement.priority){
                    this.items.splice(i, 0, qElement);
                    this.items.splice(i, 0, qElement2);
                    contain = true;
                    console.log("Q:Enqueue Inside of for");
                    break;
                }
        }

        if(!contain){
            console.log("Q:Enqueue Inside of !contain");
            if(!true){
                console.log("Already has it");
            }else{
                tabul.appendChild(element);
                newdiv.appendChild(element2);
                this.items.push(qElement);
                this.items.push(qElement2);
                this.items.sort();
            }
        }
    }

    changePriority(element,element2)
    {
        var qElement = new QElement(element.id, 0);
        var qElement2 = new QElement(element2.id, 0);
        
        for(var i= 0; i < this.items.length; i++)
        {
            if(this.items[i].element == qElement.element)
            {
                var backup = this.items[0];
                var backup2 = this.items[1];
                this.items[0] = this.items[i];
                this.items[1] = this.items[i+1];
                this.items[i] = backup;
                this.items[i+1] = backup2;
                console.log("Q:Found same element! i = "+i);
            }
        }

    }

    dequeue()
    {
        if(this.isEmpty())
            return "underflow";
        var elemente = this.front();
        var number = elemente.element;
        number = number.substring(11,12);
        this.items.shift();
        const tabpages = document.querySelector("#test"+number);
        const a = document.querySelector("#rightsideli"+number);
        tabpages.parentNode.removeChild(tabpages);
        a.parentNode.removeChild(a);
        console.log("Q:Dequeue Success!");
        return this.items.shift();
    }

    front()
    {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    frontDiv()
    {
        if(this.isEmpty())
            return "No element in Queue";
        return this.items[1].element;
    }

    rear()
    {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length-1];
    }

    isEmpty()
    {
        return this.items.length == 0;
    }

    count()
    {
        return this.items.length;
    }

    printQueue()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++) {
            str += this.items[i].element + " ";
        }
        return str;
    }
}