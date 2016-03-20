/**
 * Class.js
 * Create By:huang.jl
 * Date: 2014-10-28T16:19Z
 */
(function(global) {
	Class=function() {
		var len = arguments.length;
		var c_name=arguments[0];
		var P = arguments[1];
		var F = arguments[len - 1];

		var C = typeof F[c_name] == "function" ?
			F[c_name] :
			function () {
				if(typeof P.prototype.constructor !="function")
					P.prototype.constructor=function(){};
				/**
				 * if F.initialize is null ,the arguments of F will use on it's parent Class P.
				 * there will use in P
				 */
				P.prototype.constructor.apply(this, arguments);
			};
		if (len > 2) {
			var newArgs = [C, P].concat(Array.prototype.slice.call(arguments).slice(2, len-1), F);
			inherit.apply(null, newArgs);
		} else {
			/**
			 * the initialize method as the main method ,the others as prototype;***********
			 */
			C.prototype = F;
		}
		eval(c_name+"=C");
		C.prototype.constructor=c_name;
		//eval(c_name+".prototype.constructor="+c_name);
		//return C;
	}
	/**
	 * Function: inherit
	 *
	 * Parameters:
	 * C - {Object} the class that inherits
	 * P - {Object} the superclass to inherit from
	 *
	 * In addition to the mandatory C and P parameters, an arbitrary number of
	 * objects can be passed, which will extend C.
	 */
	function inherit (C, P) {
		var F = function() {};

		F.prototype = P.prototype;
		C.prototype = new F;
		var i, l, o;
		for(i=2, l=arguments.length; i<l; i++) {
			o = arguments[i];
			if(typeof o === "function") {
				o = o.prototype;
			}
			extend(C.prototype, o);
		}
	};
	/**
	 * APIFunction: extend
	 * Copy all properties of a source object to a destination object.  Modifies
	 *     the passed in destination object.  Any properties on the source object
	 *     that are set to undefined will not be (re)set on the destination object.
	 *
	 * Parameters:
	 * destination - {Object} The object that will be modified
	 * source - {Object} The object with properties to be set on the destination
	 *
	 * Returns:
	 * {Object} The destination object.
	 */
	function extend (destination, source) {
		destination = destination || {};
		if (source) {
			for (var property in source) {
				var value = source[property];
				if (value !== undefined) {
					destination[property] = value;
				}
			}

			/**
			 * IE doesn't include the toString property when iterating over an object's
			 * properties with the for(property in object) syntax.  Explicitly check if
			 * the source has its own toString property.
			 */

			/*
			 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
			 * prototype object" when calling hawOwnProperty if the source object
			 * is an instance of window.Event.
			 */

			var sourceIsEvt = typeof window.Event == "function"
				&& source instanceof window.Event;

			if (!sourceIsEvt
				&& source.hasOwnProperty && source.hasOwnProperty("toString")) {
				destination.toString = source.toString;
			}
		}
		return destination;
	};
})(window);

Class("NObject",{
	/**
	 *
	 */
	NObject:function(){
	},

	__nid:null,
	__data:null,
	NData:function(key,data){
		if(this.__data==null)
		{
			this.__data={};
		}
		if(data==null)
		{
			return this.__data();
		}
		return this.__data;
	},
	/**
	 * get the  global unique object id.
	 *any instance which inherit from NObject have the unique id.
	 * @returns {number}
	 */
	get nid(){
		if(this.__nid==null)
			this.__nid=this._nid.index++;
		return this.__nid; 
	},
	/**
	 * get the  global unique object id，can use in window as global variable.
	 * any instance which inherit from NObject have the unique id.
	 * @returns {string}
	 * @eg window[xx.getWindowId()].clone();
	 */
	get windowId(){
		window["NObject_"+"nid_"+this.nid]=this;
		return "NObject_"+"nid_"+this.nid; 
	},
	_nid:{index:0},
	clone:function() {
		var obj=this;
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj)
			return obj;

		// Handle Date
		if (obj instanceof Date) {
			var copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
			var copy = [];
			for (var i = 0, len = obj.length; i < len; ++i) {
				copy[i] = this.clone(obj[i]);
			}
			return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr))
					copy[attr] = this.clone(obj[attr]);
			}
			return copy;
		}
		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
});



/**create the instance for NObject*/
var obj=new NObject();
console.log(obj);
console.log(obj.windowId);  //

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
console.log(s);  // Set
console.log(s.constructor);  // Set

console.log(s.constructor=='Set');  // Set
console.log(s.push(10));  // -1,0,1,2,3,4,10

/** use instanceof to find the Class or the subClass of the instance*/
console.log(s instanceof Set);//true
console.log(s instanceof NObject);//true
console.log(s instanceof Object);//true

