# JsClass

JS Class is a frame for using js to create a class which like Java

    Class Set extend Nobject{
        private List list=new ArrayList(),
        public Set(List list)
        {
            this.list=list;
        }
        public void push(Object o)
        {
            this.list.add(o);
        }
        public void print()
        {
            System.out.println(this.list);
        }
    }
    use==>
    Set s=new Set(new ArrayList());
    s.push("xxx");
    ....
    ....
   Use JsClass you can create this class like this:
   
    Class("Set",NObject,{
                list:[],
                Set:function(list)
                {
                    if(list!=null)
                        this.list=list;
                },
                push:function(d)
                {
                    this.list.push(d);
                },
                print:function()
                {
                    document.write(this.list.join(','));
                }
            });
    use==>
    var s=new Set([]);
    s.push("xxx");
    ....
    ....
    
    

# Demo

      /**
       create the instance for NObject
      */
        var obj=new NObject();
        console.log(obj);
        console.log(obj.windowId);  //
        console.log(window[obj.windowId]==obj);  //

        var obj1=new NObject();
        console.log(obj1);
        console.log(obj1.windowId);  //will print the global id of the obj1
        console.log(window[obj1.windowId]==obj1);  //true


        /**
         * Create Class inherit from NObject
         */
        Class("Set",NObject,{
            list:[],
            /**
             * if initialize is null ,the args of Set will use on it's parent Class.
             * there will use in NObject
             */
            Set:function(list)
            {
                if(list!=null)
                    this.list=list;
            },
            push:function(d)
            {
                this.list.push(d);
            },
            print:function()
            {
                document.write(this.list.join(','));
            }
        });


        /**
         * create the instance for Set
         */
        var s=new Set([-1,0,1,2,3,4]);

        /** invoking the print() method */
        console.log(s.print());  // -1,0,1,2,3,4
        /** invoking the push() method */
        console.log(s.windowId);  // the prop from NObject
        console.log(window[s.windowId]==s);  //
        console.log(s.constructor);  // Set

        console.log(s.constructor=='Set');  // Set
        console.log(s.push(10));  // -1,0,1,2,3,4,10

        /** use instanceof to find the Class or the subClass of the instance*/
        console.log(s instanceof Set);//true
        console.log(s instanceof NObject);//true
        console.log(s instanceof Object);//true