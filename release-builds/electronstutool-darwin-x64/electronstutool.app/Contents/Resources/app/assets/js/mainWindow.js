    
    
    function liCreater(text){
            var a = document.createElement('a');
            a.id = "rightsideli"+incrementtabl;
            a.href = "javascript:tabClick('"+a.id+"')";
            const li = document.createElement('li');
            li.className = 'collection-item';
            const itemText = document.createTextNode(text);
            li.appendChild(itemText);
            const optionX = document.createElement('div');
            const x = document.createTextNode('x');
            optionX.appendChild(x);
            optionX.className = 'optionx';
            optionX.onclick = function(){
                closeTab();
            };
            const licontainer = document.createElement('div');
            licontainer.className = 'licontainer';
            licontainer.appendChild(li);
            licontainer.appendChild(optionX);
            a.appendChild(licontainer);
            return a;
    }

     function closeTab()
        {
                alert("X clicked");
                closedtabl++;
                priorityQueue.dequeue();
                priorityQueue.printQueue();
        }

        function divCreater(text,data){
                const div = document.createElement('div');
                div.className = 'tab-page';
                div.id        = text;
                const itemText = document.createTextNode(data);
                const textArea = document.createElement('textarea');
                textArea.className = 'textarea';
                textArea.appendChild(itemText);
                const bigdiv = document.createElement('div');
                bigdiv.className = 'ninety-percent-pad';
                // We need to implement textarea to bigdiv
                textareaLine();
                console.log(textArea);
                bigdiv.appendChild(textArea);
                div.appendChild(bigdiv);
            return div;
        }
        function tabInvisible(){
            const tabul = document.querySelector('#tabs');
            tabInitial(tabul);
            tabul.innerHTML = '';
        }

        function tabInitial(tabul){
            console.log(tabul);
            for(var i = 0; i < tabul.childElementCount+closedtabl; i++){
                var tabpages = document.querySelector("#test"+i);
                var tabli = document.querySelector("#rightsideli"+i);
                if( (tabpages==null) || (tabli==null) )
                    continue;
                tabpages.className = 'tab-page';
                tabli.children[0].className = 'licontainer';
                tabli.children[0].children[0].id = '';
            }
        }

        function tabClick(event){
            var number = event.substring(11,12);
            const tab = document.querySelector('#'+event);
            const tabul = document.querySelector('#tabs');
            tabInitial(tabul);
            if(tab!=null){
                tab.children[0].className += " active";
                tab.children[0].children[0].id = "active collection";    
                const tabpage = document.querySelector("#test"+number);
                tabpage.className += ' active-page';
                priorityQueue.changePriority(tab,tabpage);
                console.log(priorityQueue.printQueue());
            }
        };